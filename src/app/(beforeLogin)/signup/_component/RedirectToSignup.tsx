"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
export default function RedirectToSignup() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/i/flow/signup');
    }, []);

    return null;
}