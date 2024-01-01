import style from './home.module.css'
import Tab from "@/app/(aterLogin)/home/_component/Tab";
import TabProvider from "@/app/(aterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(aterLogin)/home/_component/PostForm";
import Post from "@/app/(aterLogin)/_component/Post";

export default function Home():JSX.Element{
    return (
        <main className={style.main}>
            <TabProvider>
                <Tab/>
                <PostForm/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </TabProvider>
        </main>
    )
}