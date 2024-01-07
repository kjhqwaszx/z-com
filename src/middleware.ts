export {auth as middleware} from "./auth"
export const config = {
  // middleware 를 적용할 Route 들. (로그인을 해야 접근 할 수 있는 화면들)
  matcher: ['/compose/tweet', '/home', '/explore', '/message', '/search']
}
