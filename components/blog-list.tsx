import React from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import Link from 'next/link';
import { Image } from "../typescript/action";

type AdditionalParam = {
  banner_title:string;
  banner_description: string;
  title: {};
  title_h2: string;
  body: string;
  date: string;
}

type Author = {
  title: string;
  $: AdditionalParam;
}


type BloglistProps = {
  body: string;
  url: string;
  featured_image: Image; 
  title: string;
  date: string;
  author: [Author];
  $: AdditionalParam;
}

function BlogList({ bloglist }: { bloglist: BloglistProps }) {

  let body: string = bloglist.body && bloglist.body.substr(0, 300);
  const stringLength = body?.lastIndexOf(' ');
  body = `${body?.substr(0, Math.min(body.length, stringLength))}...`;
  return (
    <div className='blog-list'>
      {bloglist.featured_image && (
        <Link legacyBehavior href={bloglist.url}>
          <a>
            <img
              className='blog-list-img'
              src={bloglist.featured_image.url}
              alt='blog img'
              {...bloglist.featured_image.$?.url as {}}
            />
          </a>
        </Link>
      )}
      <div className='blog-content'>
        {bloglist.title && (
          <Link legacyBehavior href={bloglist.url}>
            <a>
              <h3 {...bloglist.$?.title}>{bloglist.title}</h3>
            </a>
          </Link>
        )}
        <p>
          <strong {...bloglist.$?.date as {}}>
            {moment(bloglist.date).format('ddd, MMM D YYYY')}
          </strong>
          ,{" "}
          <strong {...bloglist.author[0].$?.title}>
            {bloglist.author[0].title}
          </strong>
        </p>
        <div {...bloglist.$?.body as {}}>{parse(body)}</div>
        {bloglist.url ? (
          <Link legacyBehavior href={bloglist.url}>
            <a>
              <span>{'Read more -->'}</span>
            </a>
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default BlogList;