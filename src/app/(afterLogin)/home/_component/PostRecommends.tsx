"use client"

import {InfiniteData, useInfiniteQuery, useSuspenseInfiniteQuery} from "@tanstack/react-query";
import {getPostRecommend} from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import {Post as IPost} from '@/model/Post'
import React, {Fragment, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import styles from "@/app/(afterLogin)/home/home.module.css";

export default function PostRecommends(){
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching, // 데이터를 가지고 오면서 True 로 변함
        isPending, // 데이터를 가지고 오기 전부터 True
        isLoading, // isFetching && isPending
        isError
    } = useSuspenseInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>,[_1:string, _2: string], number>({
        queryKey:['posts', 'recommends'],
        queryFn: getPostRecommend,
        initialPageParam:0, // 처음 가져올 시작점 Try1:[[1,2,3,4,5]], Try2:[[1,2,3,4,5], [6,7,8,9,10]] ** 2차원 배열
        getNextPageParam:(lastPage) => lastPage.at(-1)?.postId, // Try1: 5, Try2: 10
        staleTime: 60*1000, //fresh -> stale (1분)
        gcTime: 300 * 1000
    })

    const {ref, inView} = useInView({
        threshold: 0, // 0 인 경우 해당 ref 가 보이자마자 실행된다.
        delay: 0 // detected 이후 이벤트가 실행되기 까지의 delay
    });

    useEffect(()=>{
        // ref 가 화면에 나타나면 inView 가 True 로 바뀐다.
        if(inView){
            // 로딩 중일때는 호출하지 않기위해 !isFeting 을 넣어준다.
            !isFetching && hasNextPage && fetchNextPage()

        }

    },[inView, isFetching, hasNextPage, fetchNextPage])

    // 클라이언트 컴포넌트에서의 에러 처리는 직접 해야한다. ( error.tsx 실행 x)
    if(isError){
        return(
            <div>
                <h2>Something went wrong!</h2>
                <button>
                    Try again
                </button>
            </div>
            )
    }

    return(
        <>
            {data?.pages.map((page, i) => (
                <Fragment key={i}>
                    {page.map((post) => <Post key={post.postId} post={post}/>)}
                </Fragment>))}
            <div ref={ref} style={{height: 50}}/>
        </>
    )
}