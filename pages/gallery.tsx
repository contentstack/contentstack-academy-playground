import React from 'react';
import { getComposableHeroGallery, getSuperheroGalleryRes } from '../helper';
import { PostPage, Context } from "../typescript/pages";
import { Posts } from '../typescript/layout';
import { getDynamicComposableHeroGallery } from '../helper';
import Gallery from '../components/gallery'
import HeroBanner from '../components/hero-banner';
import { Banner } from '../typescript/component';

const renderTemplateSection = (switchData: any[], modules: {
    hero_banner: Banner;
    super_heroes_gallery: { heroes: [], heading: string | undefined };

}, index: any) => {
    const {
        super_heroes_gallery: superHeroGallery
    } = modules

    switch (switchData[0]) {
        case 'hero_banner':
            return (
                <HeroBanner banner={modules.hero_banner} key={`herobanner${index.toString()}`} />
            )
        case 'super_heroes_gallery':
            return (
                <Gallery data={superHeroGallery?.heroes}
                    heading={superHeroGallery?.heading}
                    showFilter showDescription={false}
                    key={`gallery${index.toString()}`}
                />
            )

        default: return null
    }
}

export default function SuperHerosGallery({ gallery, superHerogallery }: { gallery: Posts, superHerogallery: Posts }) {
    let selectedBySuperPower: any[] = []

    return (
        <div>
            {
                gallery?.modular_blocks
                    ?.map((ele: any, index: any) => renderTemplateSection(Object.keys(ele), ele, index))
            }
            <div className='container'>

                {selectedBySuperPower.length > 0 && (
                    <Gallery data={selectedBySuperPower} heading="" showFilter={false} showDescription={false} />
                )}
            </div>
        </div>
    );
}

export async function getServerSideProps(context: { resolvedUrl: any; }) {
    try {
        const superHeroAPI = await getDynamicComposableHeroGallery();
        const superHerogallery = superHeroAPI[0]
        const gallery = await getComposableHeroGallery(context.resolvedUrl);
        const result: PostPage = await getSuperheroGalleryRes();
        const archivePost = [] as any;
        const posts = [] as any;

        result.forEach((SuperHerosGallery: { is_archived: any; }) => {
            if (SuperHerosGallery.is_archived) {
                archivePost.push(SuperHerosGallery);
            } else {
                posts.push(SuperHerosGallery);
            }
        });
        return {
            props: {
                pageUrl: context.resolvedUrl,
                gallery,
                posts,
                superHerogallery,
            },
        };
    } catch (error) {
        console.error(error);
        return { notFound: true };
    }
}