'use client';

import ContentstackLivePreview from '@contentstack/live-preview-utils';

ContentstackLivePreview.init({
  stackDetails: {
    apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
    environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
    branch: process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH,
  },
  clientUrlParams: {
    host: process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST,
  },
  enable: true,
  ssr: false,
});

export const { onEntryChange } = ContentstackLivePreview;

