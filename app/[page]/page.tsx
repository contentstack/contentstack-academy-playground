import RenderComponents from '@/components/render-components';
import { getPageRes } from '@/helper';
import { Page as PageProp } from '@/typescript/pages';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import Skeleton from 'react-loading-skeleton';
import { setMetaData } from '@/utils/metaData';
import { setLivePreviewQueryParams } from "@/utils/livePreviewQueryParams";

export const metadata: Metadata = {}

export default async function Page({ searchParams }: { searchParams: URLSearchParams }) {
    setLivePreviewQueryParams(searchParams);
    const headerList = headers();
    const pathname = headerList.get("x-current-path");
    const entry: PageProp = await getPageRes(pathname);

    setMetaData(metadata, entry);

    return entry?.page_components ? (
        <>
            <RenderComponents
                pageComponents={entry.page_components}
                contentTypeUid='page'
                entryUid={entry.uid}
                locale={entry.locale}
            />
        </>
    ) : (
        <Skeleton count={3} height={300} />
    );
}