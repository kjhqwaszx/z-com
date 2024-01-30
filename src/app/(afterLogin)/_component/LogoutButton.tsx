"use client"

import style from "./logoutButton.module.css";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Session} from "@auth/core/types"
import {useQueryClient} from "@tanstack/react-query";

type Props = {
    userInfo:Session | null
}
export default function LogoutButton({userInfo}:Props) {
    const router = useRouter()
    const queryClient = useQueryClient()

    if(!userInfo?.user){
        return null
    }

    const onLogout = () => {
        // 캐싱된 데이터를 없애기 위해 invalidate 시킨다.
        queryClient.invalidateQueries( {
            queryKey:["posts"]
        })
        queryClient.invalidateQueries({
            queryKey:["users"]
        })

        signOut({redirect: false})
            .then(()=>{
                // 브라우저 쿠키에서 백앤드 토큰 제거
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`,{
                    method:'post',
                    credentials: 'include'
                })
                router.replace('/')
            })
    };

    return (
        <button className={style.logOutButton} onClick={onLogout}>
            <div className={style.logOutUserImage}>
                <img src={userInfo?.user?.image as string} alt={userInfo?.user?.email as string}/>
            </div>
            <div className={style.logOutUserName}>
                <div>{userInfo?.user?.name}</div>
                <div>@{userInfo?.user?.email}</div>
            </div>
        </button>
    )
}