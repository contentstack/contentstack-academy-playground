import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../../contentstack-sdk';
import { getAllComposableHeros, getComposableHeroHomeWorld } from '../../helper';
import { Page, PostPage, PageUrl, Context } from "../../typescript/pages";
import GalleryReact from '../../components/gallery'

export default function ComposableHeroes({ page, posts, archivePost, pageUrl }: { page: Page, posts: PostPage, archivePost: PostPage, pageUrl: PageUrl }) {
  const [getBanner, setBanner] = useState(page);
  async function fetchData() {
    
    try {
      const bannerRes = await getAllComposableHeros(pageUrl);
      if (!bannerRes) throw new Error('Status code 404');
      setBanner(bannerRes);
      const archivePost = [] as any;
      const posts = [] as any;

      getBanner?.characters?.forEach((superHero: { is_archived: any; }) => {
        if (superHero.is_archived) {
          archivePost.push(superHero);
        } else {
          posts.push(superHero);
        }
      });

    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    onEntryChange(() => fetchData());
  }, []);


  return (
    <>
      <GalleryReact
        data={posts}
        heading={getBanner?.heading}
        description={getBanner?.description}
        showFilter={false}
        showDescription
      />
    </>
  );
}

export async function getServerSideProps(context: Context) {
  try {
    const page = await getAllComposableHeros(context.resolvedUrl);
    const archivePost = [] as any;
    const posts = [] as any;

    page?.characters?.forEach((superHero: { is_archived: any; }) => {
      if (superHero.is_archived) {
        archivePost.push(superHero);
      } else {
        posts.push(superHero);
      }
    });

    return {
      props: {
        pageUrl: context.resolvedUrl,
        page,
        posts,
        archivePost,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}