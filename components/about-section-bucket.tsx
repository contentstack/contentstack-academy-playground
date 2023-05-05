import React from 'react';
import parse from 'html-react-parser';
import { Action,Image } from '../typescript/action';

type AdditionalParam = {
  title_h2?: string;
  title_h3?: string;
  description?: string;
}

type Bucket = {
  title_h3: string;
  description: string;
  icon: Image;
  $: AdditionalParam;
  url: string;
}

type BucketsList = {
  title_h3: string;
  description: string;
  url: string;
  call_to_action: Action;
  icon: Image;
  $: AdditionalParam;
}

type BucketProps = {
  title_h2: string;
  buckets:[BucketsList];
  $: AdditionalParam;
}

export default function AboutSectionBucket({ sectionWithBuckets }: {sectionWithBuckets:BucketProps}) {
  function bucketContent(bucket: Bucket, index: number) {
    return (
      <div className='mission-content-section' key={index}>
        {bucket.icon && (
          <img
            className='mission-icon'
            {...bucket.icon.$?.url as {}}
            src={bucket.icon.url}
            alt='art work'
          />
        )}

        <div className='mission-section-content'>
          {bucket.title_h3 && (
            <h3 {...bucket.$?.title_h3 as {}}>{bucket.title_h3}</h3>
          )}
          {typeof bucket.description === 'string' && (
            <div {...bucket.$?.description as {}}> {parse(bucket.description)}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='member-main-section'>
      <div className='member-head'>
        {sectionWithBuckets.title_h2 && (
          <h2 {...sectionWithBuckets.$?.title_h2 as {}}>
            {sectionWithBuckets.title_h2}
          </h2>
        )}
      </div>
      <div className='mission-section'>
        <div className='mission-content-top'>
          {sectionWithBuckets?.buckets.map(
            (bucket, index) => index < 2 && bucketContent(bucket, index)
          )}
        </div>
        <div className='mission-content-bottom'>
          {sectionWithBuckets.buckets.map(
            (bucket, index) => index >= 2 && bucketContent(bucket, index)
          )}
        </div>
      </div>
    </div>
  );
}
