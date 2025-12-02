import { getPageRes, metaData } from '@/helper';
import PageClient from './page-client';

export default async function Page({ params }: { params: { page: string } }) {
    const entryUrl = `/${params.page}`;

    let entryData;
    try {
        entryData = await getPageRes(entryUrl);
        if (!entryData) throw new Error('Status code 404');
    } catch (error) {
        console.error(error);
        return <div>Error loading page</div>;
    }

    return (
        <>
            {entryData.seo && entryData.seo.enable_search_indexing && metaData(entryData.seo)}
            <PageClient initialEntry={entryData} />
        </>
    );
}
