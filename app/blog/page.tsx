import BlogList from '../../components/blog-list';
import RenderComponents from '../../components/render-components';
import { getPageRes, getBlogListRes } from '../../helper';

import ArchiveRelative from '../../components/archive-relative';
import Skeleton from 'react-loading-skeleton';
import { Page, PostPage } from "../../typescript/pages";
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { setMetaData } from '@/utils/metaData';
import { setLivePreviewQueryParams } from "@/utils/livePreviewQueryParams";

export const metadata: Metadata = {}

export default async function Blog({ searchParams }: { searchParams: URLSearchParams }) {
    setLivePreviewQueryParams(searchParams);
    const headerList = headers();
    const pathname = headerList.get("x-current-path");
    const banner: Page = await getPageRes(pathname);
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

    const archivePost: PostPage = archivePostRes;
    const posts: PostPage = postsRes;

    setMetaData(metadata, banner);
    
    return (
        <>
            {banner?.page_components ? (
                <RenderComponents
                    pageComponents={banner.page_components}
                    blogPost
                    contentTypeUid='page'
                    entryUid={banner.uid}
                    locale={banner.locale}
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
                    {banner && banner.page_components[1].widget && (
                        <h2>{banner.page_components[1].widget.title_h2}</h2>
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