import { getComposableHeroSingleRes, metaData } from '@/helper';
import HeroPostClient from './hero-post-client';

export default async function SuperHerosPost({ params }: { params: { post: string } }) {
    const entryUrl = `/composable-heroes/${params.post}`;

    let postData;
    try {
        postData = await getComposableHeroSingleRes(entryUrl);
        if (!postData) throw new Error('Status: 404');
    } catch (error) {
        console.error(error);
        return <div>Error loading hero post</div>;
    }

    return (
        <>
            {postData?.seo && postData.seo.enable_search_indexing && metaData(postData.seo)}
            <HeroPostClient initialPost={postData} />
        </>
    );
}
