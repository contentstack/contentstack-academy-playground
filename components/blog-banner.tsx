import React from 'react';

type AdditionalParam = {
  banner_title:string;
  banner_description: string;
  title: {};
  title_h2: string;
  body: string;
  date: string;
}

type BannerProps = {
  banner_title:string;
  banner_description: string;
  bg_color: string;
  $: AdditionalParam;
}

export default function BlogBanner({ blogBanner }: {blogBanner : BannerProps}) {
  return (
    <div
      className='blog-page-banner'
      style={{
        background: `${blogBanner.bg_color ? blogBanner.bg_color : ''}`,
      }}
    >
      <div className='blog-page-content'>
        {blogBanner.banner_title && (
          <h1 className='hero-title' {...blogBanner.$?.banner_title as {}}>
            {blogBanner.banner_title}
          </h1>
        )}

        {blogBanner.banner_description && (
          <p className='hero-description' {...blogBanner.$?.banner_description as {}}>
            {blogBanner.banner_description}
          </p>
        )}
      </div>
    </div>
  );
}
