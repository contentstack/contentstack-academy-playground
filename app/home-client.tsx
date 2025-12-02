'use client';

import RenderComponents from "@/components/render-components";
import { onEntryChange } from "@/contentstack-sdk/live-preview";
import { Page } from "@/typescript/pages";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function HomeClient({ initialEntry }: { initialEntry: Page }) {
  const [getEntry, setEntry] = useState<Page>(initialEntry);

  useEffect(() => {
    onEntryChange(() => {
      window.location.reload();
    });
  }, []);

  return getEntry ? (
    <RenderComponents
      pageComponents={getEntry.page_components}
      contentTypeUid='page'
      entryUid={getEntry.uid}
      locale={getEntry.locale}
    />
  ) : (
    <Skeleton count={3} height={300} />
  );
}
