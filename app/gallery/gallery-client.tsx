'use client';

import GalleryReact from '@/components/gallery';
import HeroBanner from '@/components/hero-banner';
import { onEntryChange } from '@/contentstack-sdk/live-preview';
import { Banner } from '@/typescript/component';
import React, { useEffect, useState } from 'react';

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

export default function GalleryClient({ initialGallery }: { initialGallery: any }) {
    const [gallery, setGallery] = useState(initialGallery);

    useEffect(() => {
        onEntryChange(() => {
            window.location.reload();
        });
    }, []);

    return (
        <div>
            {
                gallery?.modular_blocks
                    ?.map((ele: any, index: any) => renderTemplateSection(Object.keys(ele), ele, index))
            }
        </div>
    );
}
