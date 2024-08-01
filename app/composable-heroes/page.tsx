'use client';

import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../../contentstack-sdk';
import { getAllComposableHeros, getComposableHeroHomeWorld, metaData } from '../../helper';
import { Page, PostPage } from "../../typescript/pages";
import GalleryReact from '../../components/gallery'
import { usePathname } from 'next/navigation';

export default function ComposableHeroes() {
    const entryUrl = usePathname();

    const [getBanner, setBanner] = useState<Page>();
    const [archivePost, setArchivePost] = useState<PostPage>();
    const [posts, setPosts] = useState<PostPage>();
    async function fetchData() {

        try {
            const bannerRes = await getAllComposableHeros(entryUrl);
            if (!bannerRes) throw new Error('Status code 404');
            setBanner(bannerRes);
            const archivePostRes = [] as any;
            const postsRes = [] as any;

            bannerRes?.characters?.forEach((superHero: { is_archived: any; }) => {
                if (superHero.is_archived) {
                    archivePostRes.push(superHero);
                } else {
                    postsRes.push(superHero);
                }
            });

            setArchivePost(archivePostRes);
            setPosts(postsRes);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        onEntryChange(() => fetchData());
    }, []);

    return (
        <>
            {getBanner?.seo && getBanner.seo.enable_search_indexing && metaData(getBanner.seo)}
            <GalleryReact
                data={posts}
                heading={getBanner?.heading}
                description={getBanner?.description}
                showFilter={false}
                showDescription
            />
        </>
    );
}