import style from './home.module.css'
import Tab from "@/app/(aterLogin)/home/_component/Tab";
import TabProvider from "@/app/(aterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(aterLogin)/home/_component/PostForm";

export default function Home():JSX.Element{
    return (
        <main className={style.main}>
            <TabProvider>
                <Tab/>
                <PostForm/>
            </TabProvider>
        </main>
    )
}