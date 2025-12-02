'use client';

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import Skeleton from 'react-loading-skeleton';
import { BlogPosts, Page } from '@/typescript/pages';
import { onEntryChange } from '@/contentstack-sdk/live-preview';
import RenderComponents from '@/components/render-components';
import ArchiveRelative from '@/components/archive-relative';

export default function BlogPostClient({ 
    initialPost, 
    initialBanner 
}: { 
    initialPost: BlogPosts;
    initialBanner: Page;
}) {
    const [blogPost, setBlogPost] = useState<BlogPosts>(initialPost);
    const [page, setPage] = useState<Page>(initialBanner);

    useEffect(() => {
        onEntryChange(() => {
            window.location.reload();
        });
    }, []);

    return (
        <>
            {page ? (
                <RenderComponents
                    pageComponents={page.page_components}
                    blogPost
                    contentTypeUid='blog_post'
                    entryUid={page?.uid}
                    locale={page?.locale}
                />
            ) : (
                <Skeleton height={400} />
            )}
            <div className='blog-container'>
                <article className='blog-detail'>
                    {blogPost && blogPost.title ? (
                        <h2 {...blogPost.$?.title as {}}>{blogPost.title}</h2>
                    ) : (
                        <h2>
                            <Skeleton />
                        </h2>
                    )}
                    {blogPost && blogPost.date ? (
                        <p {...blogPost.$?.date as {}}>
                            {moment(blogPost.date).format('ddd, MMM D YYYY')},{' '}
                            <strong {...blogPost.author[0].$?.title as {}}>
                                {blogPost.author[0].title}
                            </strong>
                        </p>
                    ) : (
                        <p>
                            <Skeleton width={300} />
                        </p>
                    )}
                    {blogPost && blogPost.body ? (
                        <div {...blogPost.$?.body as {}}>{parse(blogPost.body)}</div>
                    ) : (
                        <Skeleton height={800} width={600} />
                    )}
                </article>
                <div className='blog-column-right'>
                    <div className='related-post'>
                        {page && page?.page_components[2].widget ? (
                            <h2 {...page?.page_components[2].widget.$?.title_h2 as {}}>
                                {page?.page_components[2].widget.title_h2}
                            </h2>
                        ) : (
                            <h2>
                                <Skeleton />
                            </h2>
                        )}
                        {blogPost && blogPost.related_post ? (
                            <ArchiveRelative
                                {...blogPost.$?.related_post}
                                blogs={blogPost.related_post}
                            />
                        ) : (
                            <Skeleton width={300} height={500} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
