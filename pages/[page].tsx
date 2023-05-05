import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../contentstack-sdk';
import RenderComponents from '../components/render-components';
import { getPageRes } from '../helper';
import Skeleton from 'react-loading-skeleton';
import { Props } from "../typescript/pages";

export default function Page(props: Props) {
  const { page, entryUrl } = props;
  const [getEntry, setEntry] = useState(page);

  async function fetchData() {
    try {
      const entryRes = await getPageRes(entryUrl);
      if (!entryRes) throw new Error('Status code 404');
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, [page]);

  return getEntry.page_components ? (
    <RenderComponents
      pageComponents={getEntry.page_components}
      contentTypeUid='page'
      entryUid={getEntry.uid}
      locale={getEntry.locale}
    />
  ) : (
    <Skeleton count={3} height={300} />
  );
}

export async function getServerSideProps({params}: any) {
  try {
      const entryUrl = params.page.includes('/') ? params.page:`/${params.page}`
      const entryRes = await getPageRes(entryUrl);
      if (!entryRes) throw new Error('404');
      return {
        props: {
          entryUrl: entryUrl,
          page: entryRes,
        },
      };

  } catch (error) {
    return { notFound: true };
  }
}
