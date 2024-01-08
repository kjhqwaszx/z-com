import style from "./singlePost.module.css"
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
export default function singlePost(){
    return(
        <div className={style.main}>
            <div className={style.header}>
                <BackButton/>
                <h3 className={style.headerTitle}>게시하기</h3>
            </div>
            <Post />
            <CommentForm />
            <div>
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    )
}