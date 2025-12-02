import { getPageRes, metaData } from "@/helper";
import HomeClient from "./home-client";

export default async function Home() {
  const entryUrl = '/';

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
      <HomeClient initialEntry={entryData} />
    </>
  );
}
