type Props ={
    pageParam?: number
}
export async function getPostRecommend({pageParam}: Props) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/postRecommends?cursor=${pageParam}`,{
        next:{
            tags: ['posts', 'recommends']
        },
    })

    if(!res.ok){
        throw new Error('failed to fetch data')
    }

    return res.json()
}