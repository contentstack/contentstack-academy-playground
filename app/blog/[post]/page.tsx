import { getBlogPostRes, getPageRes, metaData } from '@/helper';
import BlogPostClient from './blog-post-client';

export default async function BlogPost({ params }: { params: { post: string } }) {
    const entryUrl = `/blog/${params.post}`;

    let postData;
    let bannerData;
    
    try {
        postData = await getBlogPostRes(entryUrl);
        bannerData = await getPageRes('/blog');
        if (!postData || !bannerData) throw new Error('Status: 404');
    } catch (error) {
        console.error(error);
        return <div>Error loading blog post</div>;
    }

    return (
        <>
            {postData?.seo && postData.seo.enable_search_indexing && metaData(postData.seo)}
            <BlogPostClient initialPost={postData} initialBanner={bannerData} />
        </>
    );
}
