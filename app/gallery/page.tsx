import GalleryReact from '@/components/gallery';
import HeroBanner from '@/components/hero-banner';
import { getComposableHeroGallery } from '@/helper';
import { Banner } from '@/typescript/component';
import { Posts } from '@/typescript/layout';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { setMetaData } from '@/utils/metaData';
import { setLivePreviewQueryParams } from "@/utils/livePreviewQueryParams";

const renderTemplateSection = (switchData: any[], modules: {
    hero_banner: Banner;
    super_heroes_gallery: {
        description: any; heroes: [], heading: string | undefined
    };

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
                <GalleryReact data={superHeroGallery?.heroes}
                    heading={superHeroGallery?.heading}
                    description={superHeroGallery?.description}
                    showFilter showDescription={false}
                    key={`gallery${index.toString()}`}
                />
            )

        default: return null
    }
}

export const metadata: Metadata = {}

export default async function SuperHerosGallery({searchParams}: {searchParams: URLSearchParams}) {
    setLivePreviewQueryParams(searchParams);
    const headerList = headers();
    const pathname = headerList.get("x-current-path");
    const gallery: Posts | undefined = await getComposableHeroGallery(pathname);

    setMetaData(metadata, gallery);

    return (
        <>
            <div>
                {
                    gallery?.modular_blocks
                        ?.map((ele: any, index: any) => renderTemplateSection(Object.keys(ele), ele, index))
                }
            </div>
        </>
    );
}