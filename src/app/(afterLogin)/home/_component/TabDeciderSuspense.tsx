import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getPostRecommend} from "@/app/(afterLogin)/home/_lib/getPostRecommends";

export default async function TabDeciderSuspense(){
    const queryClient = new QueryClient
    await queryClient.prefetchInfiniteQuery({
        queryKey:['posts', 'recommends'],
        queryFn: getPostRecommend,
        initialPageParam: 0,
    })
    const dehydratedState = dehydrate(queryClient)

    return(
        // 서버 컴포넌트 이므로 서버 데이터(dehydratedState) 를 클라이언트로 Hydration 해주는 과정)
        <HydrationBoundary state={dehydratedState}>
            <TabDecider/>
        </HydrationBoundary>
    )
}