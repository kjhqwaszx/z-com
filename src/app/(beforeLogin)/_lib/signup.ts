"use server"

import {redirect} from "next/navigation";
import {signIn} from "@/auth";

export default async (prevState: any, formData: FormData) =>{
  // Server Action
  // 서버에서 실행되므로 브라우저에 노출되지 않는다.
  // 아래의 주소로 request 를 날리면 http.tsx 가 인터셉팅하여 handlers.tsx의 /api/users 가 실행된다.
  if(!formData.get('id') || !(formData.get('id') as string)?.trim()){
    return {message: 'no_id'}
  }
  if(!formData.get('name') || !(formData.get('name') as string)?.trim()){
    return {message: 'no_name'}
  }
  if(!formData.get('password') || !(formData.get('password') as string)?.trim()){
    return {message: 'no_password'}
  }
  if(!formData.get('image') ){
    return {message: 'no_image'}
  }

  formData.set('nickname', formData.get('name') as string)
  let shouldRedirect = false;

  try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,{
      method: 'post',
      body: formData,
      credentials: 'include'
    })

    if(response.status === 403){
      return {message: 'user_exists'}
    }

    shouldRedirect=true
    console.log('$$$$ signUp success: ', response)
    // 회원가입 후 로그인 처리
    // Server Action 이므로 @/auth 의 signIn 을 사용한다 ( /next-auth/react x)
    await signIn("credentials", {
      username: formData.get('id'),
      password: formData.get('password'),
      redirect: false,
    })

    console.log('$$$$ signIn success: ', response)

  }catch (e) {
    console.error(e)
  }

  if(shouldRedirect){
    // redirect 는 try&catch 문에서는 사용이 불가능하기 때문
    redirect('/home')
  }
}