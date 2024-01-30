import Main from "@/app/(beforeLogin)/_component/Main";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import RedirectToSignup from "@/app/(beforeLogin)/signup/_component/RedirectToSignup";

export default async function Login() {
    const session = await auth();

    if (session?.user) {
        redirect('/home');
        return null;
    }
    return (
        <>
            <RedirectToSignup />
            <Main/>
        </>
    );
}
