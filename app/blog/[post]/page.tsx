'use client';

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import Skeleton from 'react-loading-skeleton';
import { usePathname } from 'next/navigation';
import { getBlogPostRes, getPageRes, metaData } from '@/helper';
import { BlogPosts, Page } from '@/typescript/pages';
import { onEntryChange } from '@/contentstack-sdk';
import RenderComponents from '@/components/render-components';
import ArchiveRelative from '@/components/archive-relative';


export default function BlogPost() {
    const entryUrl = usePathname();

    const [blogPost, setBlogPost] = useState<BlogPosts>();
    const [page, setPage] = useState<Page>();
    const [getPost, setPost] = useState({ banner: page, post: blogPost });
    async function fetchData() {
        try {
            const entryRes = await getBlogPostRes(entryUrl);
            const bannerRes = await getPageRes('/blog');
            if (!entryRes || !bannerRes) throw new Error('Status: ' + 404);
            setBlogPost(entryRes);
            setPage(bannerRes);
            setPost({ banner: bannerRes, post: entryRes });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        onEntryChange(() => fetchData());
    }, []);

    const { post, banner } = getPost;
    return (
        <>
            {blogPost?.seo && blogPost.seo.enable_search_indexing && metaData(blogPost.seo)}
            {banner ? (
                <RenderComponents
                    pageComponents={banner.page_components}
                    blogPost
                    contentTypeUid='blog_post'
                    entryUid={banner?.uid}
                    locale={banner?.locale}
                />
            ) : (
                <Skeleton height={400} />
            )}
            <div className='blog-container'>
                <article className='blog-detail'>
                    {post && post.title ? (
                        <h2 {...post.$?.title as {}}>{post.title}</h2>
                    ) : (
                        <h2>
                            <Skeleton />
                        </h2>
                    )}
                    {post && post.date ? (
                        <p {...post.$?.date as {}}>
                            {moment(post.date).format('ddd, MMM D YYYY')},{' '}
                            <strong {...post.author[0].$?.title as {}}>
                                {post.author[0].title}
                            </strong>
                        </p>
                    ) : (
                        <p>
                            <Skeleton width={300} />
                        </p>
                    )}
                    {post && post.body ? (
                        <div {...post.$?.body as {}}>{parse(post.body)}</div>
                    ) : (
                        <Skeleton height={800} width={600} />
                    )}
                </article>
                <div className='blog-column-right'>
                    <div className='related-post'>
                        {banner && banner?.page_components[2].widget ? (
                            <h2 {...banner?.page_components[2].widget.$?.title_h2 as {}}>
                                {banner?.page_components[2].widget.title_h2}
                            </h2>
                        ) : (
                            <h2>
                                <Skeleton />
                            </h2>
                        )}
                        {post && post.related_post ? (
                            <ArchiveRelative
                                {...post.$?.related_post}
                                blogs={post.related_post}
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