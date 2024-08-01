'use client';

import RenderComponents from '@/components/render-components';
import { onEntryChange } from '@/contentstack-sdk';
import { getPageRes, metaData } from '@/helper';
import { Page as PageProp } from '@/typescript/pages';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

export default function Page() {
    const entryUrl = usePathname();

    const [getEntry, setEntry] = useState<PageProp>();

    async function fetchData() {
        try {
            const entryRes = await getPageRes(entryUrl);
            if (!entryRes) throw new Error('Status code 404');
            setEntry(entryRes);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        onEntryChange(() => fetchData());
    }, []);


    return getEntry?.page_components ? (
        <>
            {getEntry.seo && getEntry.seo.enable_search_indexing && metaData(getEntry.seo)}
            <RenderComponents
                pageComponents={getEntry.page_components}
                contentTypeUid='page'
                entryUid={getEntry.uid}
                locale={getEntry.locale}
            />
        </>
    ) : (
        <Skeleton count={3} height={300} />
    );
}