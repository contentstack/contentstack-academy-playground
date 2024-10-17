import moment from 'moment';
import parse from 'html-react-parser';
import Skeleton from 'react-loading-skeleton';
import { getBlogPostRes, getPageRes } from '@/helper';
import { BlogPosts, Page } from '@/typescript/pages';
import RenderComponents from '@/components/render-components';
import ArchiveRelative from '@/components/archive-relative';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { setMetaData } from '@/utils/metaData';
import { setLivePreviewQueryParams } from "@/utils/livePreviewQueryParams";

export const metadata: Metadata = {}

export default async function BlogPost({ searchParams }: { searchParams: URLSearchParams }) {
    setLivePreviewQueryParams(searchParams);
    const headerList = headers();
    const pathname = headerList.get("x-current-path");
    const post: BlogPosts = await getBlogPostRes(pathname);
    const banner: Page = await getPageRes('/blog');

    setMetaData(metadata, post);
    return (
        <>
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