import style from './home.module.css'
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getPostRecommend} from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import PostRecommends from "@/app/(afterLogin)/home/_component/PostRecommends";


export default async function Home(){
    //  서버에서 불러온 데이터 (dehydratedState)를 HydrationBoundary 를 통해 클라이언트가 받는다 (hydrate)
    const queryClient = new QueryClient
    await queryClient.prefetchQuery({queryKey:['posts', 'recommends'], queryFn: getPostRecommend})
    const dehydratedState = dehydrate(queryClient)

    return (
        <main className={style.main}>
            {/**/}
            <HydrationBoundary state={dehydratedState}>
                <TabProvider>
                    <Tab/>
                    <PostForm/>
                    <PostRecommends/>
                </TabProvider>
            </HydrationBoundary>
        </main>
    )
}