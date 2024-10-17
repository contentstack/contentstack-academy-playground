'use client';

import ContentstackLivePreview from "@contentstack/live-preview-utils";

ContentstackLivePreview.init({
    stackDetails: {
      apiKey: process.env.CONTENTSTACK_API_KEY,
      environment: process.env.CONTENTSTACK_ENVIRONMENT,
      branch: process.env.CONTENTSTACK_BRANCH,
  },
     
    clientUrlParams: {
      host: process.env.CONTENTSTACK_APP_HOST,
    },
    
    enable: true,
    ssr: true,
  });

export default function InitializeLivePreviewComponent() {
    return (
      <>
      </>
    );
  }