'use client';

import { SuperHeroPosts } from "@/typescript/pages";
import React from "react";
import parse from 'html-react-parser';

export const PostDescription = ({post} : {post : SuperHeroPosts}) => {

    const [parsedHtml, setParsedHtml] = React.useState< JSX.Element | null>(null);
    React.useEffect(() => {
        setParsedHtml(post?.description ? <p {...post.$?.description as {}} >{parse(post?.description)}</p> : null);
    }, [post]);
    
    return parsedHtml;
}