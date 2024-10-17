import { getAllComposableHeros } from '../../helper';
import { Page, PostPage } from "../../typescript/pages";
import GalleryReact from '../../components/gallery'
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { setMetaData } from '@/utils/metaData';
import { setLivePreviewQueryParams } from "@/utils/livePreviewQueryParams";

export const metadata: Metadata = {}

export default async function ComposableHeroes({ searchParams }: { searchParams: URLSearchParams }) {
    setLivePreviewQueryParams(searchParams);
    const headerList = headers();
    const pathname = headerList.get("x-current-path");
    const banner: Page = await getAllComposableHeros(pathname);
    const archivePostRes = [] as any;
    const postsRes = [] as any;
    banner?.characters?.forEach((superHero: { is_archived: any; }) => {
        if (superHero.is_archived) {
            archivePostRes.push(superHero);
        } else {
            postsRes.push(superHero);
        }
    });

    const archivePost: PostPage = archivePostRes;
    const posts: PostPage = postsRes;

    setMetaData(metadata, banner);

    return (
        <>
            <GalleryReact
                data={posts}
                heading={banner?.heading}
                description={banner?.description}
                showFilter={false}
                showDescription
            />
        </>
    );
}