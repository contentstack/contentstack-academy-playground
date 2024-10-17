export const setMetaData = (metadata, entry) => {
    metadata.title = entry?.seo?.meta_title ?? '';
    metadata.description = entry?.seo?.meta_description ?? '';
    metadata.keywords = entry?.seo?.keywords ?? '';
};