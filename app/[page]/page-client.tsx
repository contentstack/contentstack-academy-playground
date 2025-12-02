'use client';

import RenderComponents from '@/components/render-components';
import { onEntryChange } from '@/contentstack-sdk/live-preview';
import { Page as PageProp } from '@/typescript/pages';
import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

export default function PageClient({ initialEntry }: { initialEntry: PageProp }) {
    const [getEntry, setEntry] = useState<PageProp>(initialEntry);

    useEffect(() => {
        onEntryChange(() => {
            window.location.reload();
        });
    }, []);

    return getEntry?.page_components ? (
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
