import style from './home.module.css'
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import {Suspense} from "react";
import TabDeciderSuspense from "@/app/(afterLogin)/home/_component/TabDeciderSuspense";
import Loading from "@/app/(afterLogin)/home/loading";
import {auth} from "@/auth";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: '홈 / Z',
    description: '홈',
}
export default async function Home(){
    const session = await auth()

    // <Tab/> 과 <PostForm/> 은 로딩 없이 바로 렌더링되고 아래 게시물 영역만 데이터 패칭 시 Loading 화면이 보여진다.
    return (
        <main className={style.main}>
            <TabProvider>
                <Tab/>
                <PostForm userInfo={session}/>
                <Suspense fallback={<Loading/>}>
                    <TabDeciderSuspense/>
                </Suspense>
            </TabProvider>
        </main>
    )
}