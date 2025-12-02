import { getAllComposableHeros, metaData } from '../../helper';
import HeroesClient from './heroes-client';

export default async function ComposableHeroes() {
    const entryUrl = '/composable-heroes';

    let bannerData;
    let posts;

    try {
        bannerData = await getAllComposableHeros(entryUrl);
        if (!bannerData) throw new Error('Status code 404');

        const postsRes = [] as any;

        bannerData?.characters?.forEach((superHero: { is_archived: any; }) => {
            if (!superHero.is_archived) {
                postsRes.push(superHero);
            }
        });

        posts = postsRes;
    } catch (error) {
        console.error(error);
        return <div>Error loading heroes</div>;
    }

    return (
        <>
            {bannerData?.seo && bannerData.seo.enable_search_indexing && metaData(bannerData.seo)}
            <HeroesClient initialBanner={bannerData} initialPosts={posts} />
        </>
    );
}
