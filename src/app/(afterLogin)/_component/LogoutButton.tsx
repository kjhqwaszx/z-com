"use client"

import style from "./logoutButton.module.css";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Session} from "@auth/core/types"

type Props = {
    userInfo:Session | null
}
export default function LogoutButton({userInfo}:Props) {
    const router = useRouter()

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
                <img src={userInfo?.user?.image as string} alt={userInfo?.user?.email as string}/>
            </div>
            <div className={style.logOutUserName}>
                <div>{userInfo?.user?.name}</div>
                <div>@{userInfo?.user?.email}</div>
            </div>
        </button>
    )
}