import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        // handlers 의 /api/login 호출
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