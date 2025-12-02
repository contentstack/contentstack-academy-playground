'use client';

import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../../contentstack-sdk/live-preview';
import BlogList from '../../components/blog-list';
import RenderComponents from '../../components/render-components';
import ArchiveRelative from '../../components/archive-relative';
import Skeleton from 'react-loading-skeleton';
import { Page, PostPage } from "../../typescript/pages";

export default function BlogClient({ 
    initialBanner, 
    initialPosts, 
    initialArchivePosts 
}: { 
    initialBanner: Page;
    initialPosts: PostPage;
    initialArchivePosts: PostPage;
}) {
    const [getBanner, setBanner] = useState<Page>(initialBanner);
    const [archivePost, setArchivePost] = useState<PostPage>(initialArchivePosts);
    const [posts, setPosts] = useState<PostPage>(initialPosts);

    useEffect(() => {
        onEntryChange(() => {
            window.location.reload();
        });
    }, []);

    return (
        <>
            {getBanner?.page_components ? (
                <RenderComponents
                    pageComponents={getBanner.page_components}
                    blogPost
                    contentTypeUid='page'
                    entryUid={getBanner.uid}
                    locale={getBanner.locale}
                />
            ) : (
                <Skeleton height={400} />
            )}
            <div className='blog-container'>
                <div className='blog-column-left'>
                    {posts ? (
                        posts.map((blogList, index) => (
                            <BlogList bloglist={blogList} key={index} />
                        ))
                    ) : (
                        <Skeleton height={400} width={400} count={3} />
                    )}
                </div>
                <div className='blog-column-right'>
                    {getBanner && getBanner.page_components[1].widget && (
                        <h2>{getBanner.page_components[1].widget.title_h2}</h2>
                    )}
                    {archivePost ? (
                        <ArchiveRelative blogs={archivePost} />
                    ) : (
                        <Skeleton height={600} width={300} />
                    )}
                </div>
            </div>
        </>
    );
}
