import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';

type AdditionalParam = {
  title: string;
  body: string;
}

type Blog = {
  url: string;
  body: string;
  title: string;
  $: AdditionalParam;
}

type BlogListProps = {
  blogs: [Blog];
}

export default function ArchiveRelative({ blogs }: BlogListProps) {
  return (
    <>
      {blogs?.map((blog, idx) => (
        <Link href={blog.url} key={idx}>
          <a>
            <div>
              <h4 {...blog.$?.title as {}}>{blog.title}</h4>
              {typeof blog.body === 'string' && (
                <div {...blog.$?.body as {}}>{parse(blog.body.slice(0, 80))}</div>
              )}
            </div>
          </a>
        </Link>
      ))}
    </>
  );
}
