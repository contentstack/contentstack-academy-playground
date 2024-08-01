'use client';

import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../../contentstack-sdk';
import BlogList from '../../components/blog-list';
import RenderComponents from '../../components/render-components';
import { getPageRes, getBlogListRes, metaData } from '../../helper';

import ArchiveRelative from '../../components/archive-relative';
import Skeleton from 'react-loading-skeleton';
import { Page, PostPage, PageUrl, Context } from "../../typescript/pages";
import { usePathname } from 'next/navigation';


export default function Blog() {
    const entryUrl = usePathname();

    const [getBanner, setBanner] = useState<Page>();
    const [archivePost, setArchivePost] = useState<PostPage>();
    const [posts, setPosts] = useState<PostPage>();
    async function fetchData() {
        try {
            const bannerRes = await getPageRes(entryUrl);
            if (!bannerRes) throw new Error('Status code 404');
            setBanner(bannerRes);

            const result: PostPage = await getBlogListRes();
            const archivePostRes = [] as any;
            const postsRes = [] as any;

            result.forEach((blogs) => {
                if (blogs.is_archived) {
                    archivePostRes.push(blogs);
                } else {
                    postsRes.push(blogs);
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