import { getComposableHeroGallery } from '@/helper';
import GalleryClient from './gallery-client';

export default async function SuperHerosGallery() {
    const entryUrl = '/gallery';
    
    let galleryData;
    try {
        galleryData = await getComposableHeroGallery(entryUrl);
        if (!galleryData) {
            throw new Error('Status code 404');
        }
    } catch (error) {
        console.error(error);
        return <div>Error loading gallery</div>;
    }

    return <GalleryClient initialGallery={galleryData} />;
}
