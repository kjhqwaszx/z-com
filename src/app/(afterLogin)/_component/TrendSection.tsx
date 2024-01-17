"use client"
import style from './trendSection.module.css'
import Trend from "@/app/(afterLogin)/_component/Trend";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {getTrends} from "@/app/(afterLogin)/_lib/getTrends";
import {Hashtag} from "@/model/Hashtag";
export default function TrendSection(){
    const {data: session} = useSession()

    const {data} = useQuery<Hashtag[]>({
        queryKey:['trends'],
        queryFn: getTrends,
        staleTime: 60*1000, //fresh -> stale (1분)
        gcTime: 300 * 1000,
        enabled:!!session?.user // 로그인 했을 경우에만 호출

    })
    const pathName = usePathname()

    // 검색 메뉴에서는 미노출
    if (pathName === '/explore') return null;
    if( session?.user){
        return(
            <div className={style.trendBg}>
                <div className={style.trend}>
                    <h3>나를 위한 트렌드</h3>
                    {
                        data?.map((trend)=>
                            <Trend trend={trend} key={trend.title} />
                        )
                    }
                </div>
            </div>
        )
    }else{
        return(
            <div className={style.trendBg}>
                <div className={style.noTrend}>
                    트렌드를 가져올 수 없습니다.
                </div>
            </div>
        )
    }

}