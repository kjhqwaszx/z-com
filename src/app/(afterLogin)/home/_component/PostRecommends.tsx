"use client"

import {useQuery} from "@tanstack/react-query";
import {getPostRecommend} from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import {Post as IPost} from '@/model/Post'
import React from "react";

export default function PostRecommends(){
    const {data} = useQuery<IPost[]>({
        queryKey:['posts', 'recommends'],
        queryFn: getPostRecommend,
        staleTime: 60*1000, //fresh -> stale (1분)
        gcTime: 300 * 1000
    })

    return  data?.map((post) => (
        <Post key={post.postId} post={post}/>
    ))
}