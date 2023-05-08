const axios = require("axios");

import Stack from "../contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

const liveEdit = envConfig.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const getHeaderRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "header",
    referenceFieldPath: ["navigation_menu.page_reference"],
    jsonRtePath: ["notification_bar.announcement_text"],
  });

  liveEdit && addEditableTags(response[0][0], "header", true);
  return response[0][0];
};

export const getFooterRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "footer",
    referenceFieldPath: undefined,
    jsonRtePath: ["copyright"],
  });
  liveEdit && addEditableTags(response[0][0], "footer", true);
  return response[0][0];
};

export const getAllEntries = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "page",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  });
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "page", true));
  return response[0];
};

export const getPageRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: "page",
    entryUrl,
    referenceFieldPath: ["page_components.from_blog.featured_blogs","page_components.superheroes.character"],
    jsonRtePath: [
      "page_components.from_blog.featured_blogs.body",
      "page_components.section_with_buckets.buckets.description",
      "page_components.section_with_html_code.description",
    ],
  });
  liveEdit && addEditableTags(response[0], "page", true);
  return response[0];
};

export const getBlogListRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "blog_post",
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body"],
  });
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "blog_post", true));
  return response[0];
};

export const getBlogPostRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: "blog_post",
    entryUrl,
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body", "related_post.body"],
  });
  liveEdit && addEditableTags(response[0], "blog_post", true);
  return response[0];
};

export const getAllComposableHeros = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: "superhero_gallery_page",
    entryUrl,
    referenceFieldPath: ["characters"],
    jsonRtePath: ["characters.description"],
  });

  liveEdit && addEditableTags(response, "superhero_gallery_page", true);
  return response[0];
};

export const getComposableHeroHomeWorld = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "character",
    // referenceFieldPath: ["home_world"],
    jsonRtePath: ["description"],
  });
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "character", true));
  return response;
};

export const getComposableHeroSingleRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: "character",
    entryUrl,
    referenceFieldPath: ["home_world"],
    jsonRtePath: ["description"],
  });

  liveEdit && addEditableTags(response[0], "character", true);
  return response[0];
};

export const getComposableHeroGallery = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: "superhero_landing_page",
    entryUrl,
    referenceFieldPath: ["modular_blocks.super_heroes_gallery.heroes"],
    jsonRtePath: [
      "page_components.from_blog.featured_blogs.body",
      "page_components.section_with_buckets.buckets.description",
      "page_components.section_with_html_code.description",
    ],
  });

  liveEdit && addEditableTags(response[0], "page", true);
  return response[0];
};

export const getSuperheroGalleryRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "character",
    jsonRtePath: ["description"],
  });

  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "character", true));
  return response;
};