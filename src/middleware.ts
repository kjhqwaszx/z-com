
import {NextResponse} from "next/server";
import {auth} from "./auth";

export async function middleware() {
  //  config 에 정의되어 있는 주소에 접근 할 때 아래의 코드가 실행된다.
  const session = await auth()
  if (!session) {
    return NextResponse.redirect('http://localhost:3000/i/flow/login');
  }
}
export const config = {
  // middleware 를 적용할 Route 들. (로그인을 해야 접근 할 수 있는 화면들)
  matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search']
}
