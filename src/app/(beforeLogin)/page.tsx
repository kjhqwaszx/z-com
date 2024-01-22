import Main from "@/app/(beforeLogin)/_component/Main";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

export default async function Home(){
  // Client Component 에서 사용하는 useSession 으로 생각해도 된다.
  const session = await auth()

  if(session?.user){
    redirect('/home')
    return null;
  }

  return (
      <Main />
  )
}
