"use client"

import {useQuery} from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import {Post as IPost} from '@/model/Post'
import React from "react";
import {getFollowingPosts} from "@/app/(afterLogin)/home/_lib/getFollowingPosts";

export default function FollowingPosts(){
    const {data} = useQuery<IPost[]>({
        queryKey:['posts', 'followings'],
        queryFn: getFollowingPosts,
        staleTime: 60*1000, //fresh -> stale (1분)
        gcTime: 300 * 1000

    })

    return  data?.map((post) => (
        <Post key={post.postId} post={post}/>
    ))
}