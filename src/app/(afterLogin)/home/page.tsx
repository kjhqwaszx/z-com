import style from './home.module.css'
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getPostRecommend} from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";


export default async function Home(){
    const queryClient = new QueryClient
    await queryClient.prefetchQuery({queryKey:['posts', 'recommends'], queryFn: getPostRecommend})
    const dehydratedState = dehydrate(queryClient)

    return (
        <main className={style.main}>
            {/*서버 컴포넌트 이므로 서버 데이터(dehydratedState) 를 클라이언트로 Hydration 해주는 과정) */}
            <HydrationBoundary state={dehydratedState}>
                <TabProvider>
                    <Tab/>
                    <PostForm/>
                    <TabDecider/>
                </TabProvider>
            </HydrationBoundary>
        </main>
    )
}