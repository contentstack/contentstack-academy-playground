'use client';

import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { usePathname } from 'next/navigation';
import { getComposableHeroSingleRes, metaData } from '@/helper';
import { SuperHeroPosts } from '@/typescript/pages';
import { onEntryChange } from '@/contentstack-sdk';

export default function SuperHerosPost() {
    const entryUrl = usePathname();

    const [getPost, setPost] = useState<SuperHeroPosts>();
    async function fetchData() {
        try {
            const entryRes = await getComposableHeroSingleRes(entryUrl);
            if (!entryRes) throw new Error('Status: ' + 404);
            setPost(entryRes);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        onEntryChange(() => fetchData());
    }, []);

    const postData = getPost
    return (
        <>
            {getPost?.seo && getPost.seo.enable_search_indexing && metaData(getPost.seo)}
            <div className='container superHero-detail-container'>
                <div className='row'>
                    <div className='col-md-12 col-lg-8'>
                        {
                            postData?.image?.url ?
                                <img
                                    className='img-fluid'
                                    src={postData?.image?.url + '?height=800'}
                                    alt={postData?.image?.filename}
                                    {...postData?.image.$?.url as {}}
                                />
                                : ''
                        }
                    </div>
                    <div className='col-md-12 col-lg-4 mt-5 ps-md-5'>
                        <div className='row'>
                            <div className='col-12'>
                                {postData?.title ? <h2 className='mb-3' {...postData.$?.title as {}}>{postData?.title}</h2> : ''}
                                {postData?.description ? <p {...postData.$?.description as {}}>{parse(postData?.description)}</p> : ''}
                            </div>
                            <div className='col-12'>
                                {
                                    postData?.home_world?.map((homeWorld: {
                                        title: string | undefined;
                                        image: { url: string | undefined; $: { url: {}; }; filename: string; };
                                    },
                                        indx: {}) => (
                                        <div key={indx.toString()} className="mb-3">
                                            {homeWorld?.title ? <p><strong>{homeWorld?.title}</strong></p> : ''}
                                            {homeWorld?.image?.url ?
                                                <img
                                                    className='superHero-logo-img img-fluid mb-3'
                                                    src={homeWorld?.image?.url}
                                                    alt={homeWorld?.image?.filename}
                                                    {...homeWorld?.image.$?.url as {}}
                                                />
                                                : ''}
                                            <hr />
                                        </div>
                                    ))
                                }
                                {postData?.contact_info?.email ? <p {...postData?.contact_info.$?.email}><strong>Email :</strong> {postData?.contact_info?.email}</p> : ''}
                                {postData?.contact_info?.phone ? <p {...postData?.contact_info.$?.phone}><strong>Phone :</strong> {postData?.contact_info?.phone}</p> : ''}
                                {postData?.powers ? <p {...postData.$?.powers as {}}><strong>Power :</strong> {postData?.powers}</p> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}