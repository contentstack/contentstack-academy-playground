import { getPageRes, getBlogListRes, metaData } from '../../helper';
import { PostPage } from "../../typescript/pages";
import BlogClient from './blog-client';

export default async function Blog() {
    const entryUrl = '/blog';

    let bannerData;
    let posts;
    let archivePosts;

    try {
        bannerData = await getPageRes(entryUrl);
        if (!bannerData) throw new Error('Status code 404');

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

        archivePosts = archivePostRes;
        posts = postsRes;
    } catch (error) {
        console.error(error);
        return <div>Error loading blog</div>;
    }

    return (
        <>
            {bannerData?.seo && bannerData.seo.enable_search_indexing && metaData(bannerData.seo)}
            <BlogClient 
                initialBanner={bannerData} 
                initialPosts={posts} 
                initialArchivePosts={archivePosts} 
            />
        </>
    );
}
