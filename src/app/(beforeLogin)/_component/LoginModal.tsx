"use client";

import style from '@/app/(beforeLogin)/_component/login.module.css';
import {ChangeEventHandler, FormEventHandler, useState} from "react";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";

export default function LoginModal() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const onSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setMessage('');
        // Client Component 에서는 next-auth 의 signIn을 사용하면된다.
        // id/pw 로그인이기 때문에 credentials 를 입력하고 카카오나 구글 로그인을 추가하려면
        // "kakao", "google" 을 넣어주고 @/auth.ts 에 provider 배열에 kakao, google 을 추가해주면 된다.
        try{
            const response = await signIn("credentials", {
                username: id,
                password,
                redirect: false,
            })
            console.log('$$ response: ', response)

            if (!response?.ok) {
                setMessage('아이디와 비밀번호가 일치하지 않습니다.');
            } else {
                console.log('$$ router replace')
                router.replace('/home');
            }

        }catch (e) {
            console.error(e)
            setMessage('아이디와 비밀번호가 일치하지 않습니다.')
        }
    };

    const onClickClose = () => {
        router.back();
    };

    const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
        setId(e.target.value)
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value)
    };

    return (
        <div className={style.modalBackground}>
            <div className={style.modal}>
                <div className={style.modalHeader}>
                    <button className={style.closeButton} onClick={onClickClose}>
                        <svg width={24} viewBox="0 0 24 24" aria-hidden="true"
                             className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
                            <g>
                                <path
                                    d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                            </g>
                        </svg>
                    </button>
                    <div>로그인하세요.</div>
                </div>
                <form onSubmit={onSubmit}>
                    <div className={style.modalBody}>
                        <div className={style.inputDiv}>
                            <label className={style.inputLabel} htmlFor="id">아이디</label>
                            <input id="id" className={style.input} value={id} onChange={onChangeId} type="text" placeholder="" autoComplete='off'/>
                        </div>
                        <div className={style.inputDiv}>
                            <label className={style.inputLabel} htmlFor="password">비밀번호</label>
                            <input id="password" className={style.input} value={password} onChange={onChangePassword} type="password" placeholder="" autoComplete='off'/>
                        </div>
                    </div>
                    <div className={style.message}>{message}</div>
                    <div className={style.modalFooter}>
                        <button className={style.actionButton} disabled={!id && !password}>로그인하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}