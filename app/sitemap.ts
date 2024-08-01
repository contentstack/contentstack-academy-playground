import { getAllEntries, getBlogListRes } from '@/helper';
import { Pages, PostPage } from '@/typescript/pages';
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const baseUrl = process.env.NEXT_PUBLIC_HOSTED_URL || 'http://localhost:3000';

    let pages: Pages = await getAllEntries();
    let posts: PostPage = await getBlogListRes();

    const allPages = pages.map((page) => `${baseUrl}${page.url}`);
    const allPosts = posts.map((post) => `${baseUrl}${post.url}`);
    const siteMapList = [...allPages, ...allPosts].sort();

    return siteMapList.map((url) => {
        return {
            url: url,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 1.0,
        };
    }
    );
};
