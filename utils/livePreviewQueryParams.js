import { Stack } from "@/contentstack-sdk"

export const setLivePreviewQueryParams = (queryParams) => {
    if (queryParams?.live_preview) {
        Stack.livePreviewQuery(queryParams)
    }
}