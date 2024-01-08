"use client"

import style from "./logoutButton.module.css";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function LogoutButton() {
    const router = useRouter()
    // client Component 에서만 사용
    const {data: userInfo} = useSession()

    if(!userInfo?.user){
        return null
    }

    const onLogout = () => {
        signOut({redirect: false})
            .then(()=>{
                router.replace('/')
            })
    };

    return (
        <button className={style.logOutButton} onClick={onLogout}>
            <div className={style.logOutUserImage}>
                <img src={userInfo?.user?.image as string} alt={userInfo?.user?.id}/>
            </div>
            <div className={style.logOutUserName}>
                <div>{userInfo?.user?.name}</div>
                <div>@{userInfo?.user?.id}</div>
            </div>
        </button>
    )
}