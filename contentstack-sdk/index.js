import * as contentstack from 'contentstack';
import * as Utils from '@contentstack/utils';

import ContentstackLivePreview from '@contentstack/live-preview-utils';

const Stack = contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY
    ? process.env.CONTENTSTACK_API_KEY
    : process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT,
  region: process.env.CONTENTSTACK_REGION ? process.env.CONTENTSTACK_REGION : 'us',
  live_preview: {
    enable: true,
    host: process.env.CONTENTSTACK_PREVIEW_HOST,
    preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN
  },
});

if (process.env.CONTENTSTACK_API_HOST) {
  Stack.setHost(process.env.CONTENTSTACK_API_HOST);
}

ContentstackLivePreview.init({
  stackSdk: Stack,
  stackDetails: {
    apiKey: process.env.CONTENTSTACK_API_KEY,
    environment: process.env.CONTENTSTACK_ENVIRONMENT,
    branch: process.env.CONTENTSTACK_BRANCH,
},
   
  clientUrlParams: {
    host: process.env.CONTENTSTACK_APP_HOST,
  },
  enable: true,
  ssr: false,
});

export const { onEntryChange } = ContentstackLivePreview;

const renderOption = {
  span: (node, next) => next(node.children),
};

export default {
  /**
   *
   * fetches all the entries from specific content-type
   * @param {* content-type uid} contentTypeUid
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   *
   */
  getEntry({ contentTypeUid, referenceFieldPath, jsonRtePath }) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
      query
        .includeOwner()
        .toJSON()
        .find()
        .then(
          (result) => {
            jsonRtePath
              && Utils.jsonToHTML({
                entry: result,
                paths: jsonRtePath,
                renderOption,
              });
            resolve(result);
          },
          (error) => {
            reject(error);
          },
        );
    });
  },

  /**
   *fetches specific entry from a content-type
   *
   * @param {* content-type uid} contentTypeUid
   * @param {* url for entry to be fetched} entryUrl
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   * @returns
   */
  getEntryByUrl({
    contentTypeUid, entryUrl, referenceFieldPath, jsonRtePath,
  }) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
      blogQuery.includeOwner().toJSON();
      const data = blogQuery.where('url', `${entryUrl}`).find();
      data.then(
        (result) => {
          jsonRtePath
          && Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption,
          });
          resolve(result[0]);
        },
        (error) => {
          console.error(error);
          reject(error);
        },
      );
    });
  },
};
