import Home from "@/app/(afterLogin)/home/page";

type Props = {
  params: { username: string, id: string, photoId: string }
}
export default function Page({ params }: Props) {
  //parmas 에는 [username]/status/[id]/photo/[photoId] 값을 받을 수 있다.
  params.username // elonmusk
  params.id // 1
  params.photoId // 1
  return (
    <Home />
  )
}