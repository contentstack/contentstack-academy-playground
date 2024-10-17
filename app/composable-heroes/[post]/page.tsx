/* eslint-disable @next/next/no-img-element */
import { getComposableHeroSingleRes } from '@/helper';
import { SuperHeroPosts } from '@/typescript/pages';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { PostDescription } from '@/components/parsed-html-post-descitption';
import { setMetaData } from '@/utils/metaData';
import { setLivePreviewQueryParams } from "@/utils/livePreviewQueryParams";

export const metadata: Metadata = {}

export default async function SuperHerosPost({searchParams}: {searchParams: URLSearchParams}) {
    setLivePreviewQueryParams(searchParams);
    const headerList = headers();
    const pathname = headerList.get("x-current-path");
    const post: SuperHeroPosts = await getComposableHeroSingleRes(pathname);

    setMetaData(metadata, post);


    return (
        <>
            <div className='container superHero-detail-container'>
                <div className='row'>
                    <div className='col-md-12 col-lg-8'>
                        {
                            post?.image?.url ?
                                <img
                                    className='img-fluid'
                                    src={post?.image?.url + '?height=800'}
                                    alt={post?.image?.filename}
                                    {...post?.image.$?.url as {}}
                                />
                                : ''
                        }
                    </div>
                    <div className='col-md-12 col-lg-4 mt-5 ps-md-5'>
                        <div className='row'>
                            <div className='col-12'>
                                {post?.title ? <h2 className='mb-3' {...post.$?.title as {}}>{post?.title}</h2> : ''}
                                <PostDescription post={post} />
                            </div>
                            <div className='col-12'>
                                {
                                    post?.home_world?.map((homeWorld: {
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
                                {post?.contact_info?.email ? <p {...post?.contact_info.$?.email}><strong>Email :</strong> {post?.contact_info?.email}</p> : ''}
                                {post?.contact_info?.phone ? <p {...post?.contact_info.$?.phone}><strong>Phone :</strong> {post?.contact_info?.phone}</p> : ''}
                                {post?.powers ? <p {...post.$?.powers as {}}><strong>Power :</strong> {post?.powers}</p> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}