'use client';

import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../../contentstack-sdk/live-preview';
import { Page, PostPage } from "../../typescript/pages";
import GalleryReact from '../../components/gallery';

export default function HeroesClient({ 
    initialBanner, 
    initialPosts 
}: { 
    initialBanner: Page;
    initialPosts: PostPage;
}) {
    const [getBanner, setBanner] = useState<Page>(initialBanner);
    const [posts, setPosts] = useState<PostPage>(initialPosts);

    useEffect(() => {
        onEntryChange(() => {
            window.location.reload();
        });
    }, []);

    return (
        <GalleryReact
            data={posts}
            heading={getBanner?.heading}
            description={getBanner?.description}
            showFilter={false}
            showDescription
        />
    );
}
