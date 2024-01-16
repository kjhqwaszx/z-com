import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {cookies} from "next/headers";
import cookie from 'cookie';

export const {
  handlers:{GET, POST}, // api route
  auth, // 로그인 했는지 여부
  signIn // 로그인 하는 용
} = NextAuth({
  pages:{
    // login 페이지 등록
    signIn: '/i/flow/login',
    newUser: '/i/flor/signup'
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
        })


        // 프론트 서버에서 백엔드 서버의 토큰을 받아오는 과정
        let setCookie = authResponse.headers.get('Set-Cookie')
        console.log('$$$$ Set-Cookie: ', setCookie)
        if(setCookie){
          // 브라우저에 쿠키를 심어주는 과정
          const parsed = cookie.parse(setCookie);
          cookies().set('connect.sid', parsed['connect.sid'], parsed)
        }

        if (!authResponse.ok) {
          // 로그인이 실패한 경우
          return null
        }

        const user = await authResponse.json()
        console.log('user', user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        }
      },
    }),
  ]
})