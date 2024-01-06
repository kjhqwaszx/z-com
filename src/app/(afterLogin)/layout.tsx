
import {ReactNode} from "react";
import style from '@/app/(afterLogin)/layout.module.css'
import Link from "next/link";
import Image from "next/image";
import zLogo from '../../../public/zlogo.png'
import NavMenu from "@/app/(afterLogin)/_component/NavMenu";
import LogoutButton from "@/app/(afterLogin)/_component/LogoutButton";
import TrendSection from "@/app/(afterLogin)/_component/TrendSection";
import FollowRecommend from "@/app/(afterLogin)/_component/FollowRecommend";
import RightSearchZone from "@/app/(afterLogin)/_component/RightSearchZone";

type Props = {children: ReactNode, modal: ReactNode}

export default function AfterLoginLayout({children, modal}:Props){
    return (
        <div className={style.container}>
            {/*좌측 메뉴*/}
            <header className={style.leftSectionWrapper}>
                <section className={style.leftSection}>
                    <div className={style.leftSectionFixed}>
                        <Link className={style.logo} href="/home">
                            <div className={style.logoPill}>
                                <Image src={zLogo} alt="z.com 로고" width={40} height={40}/>
                            </div>
                        </Link>
                        <nav>
                            <ul>
                                <NavMenu/>
                                <Link href="/compose/tweet" className={style.postButton}>게시하기</Link>
                            </ul>
                        </nav>
                        <LogoutButton/>
                    </div>
                </section>
            </header>
            <div className={style.rightSectionWrapper}>
                <div className={style.rightSectionInner}>
                    {/*중앙 메인*/}
                    <main className={style.main}>{children}</main>
                    {/*우측 영역*/}
                    <section className={style.rightSection}>
                        {/*검색 창*/}
                        <RightSearchZone/>
                        {/*트렌드*/}
                        <TrendSection/>
                        <div className={style.followRecommend}>
                            <h3>팔로우 추천</h3>
                            <FollowRecommend/>
                            <FollowRecommend/>
                            <FollowRecommend/>
                        </div>
                    </section>
                </div>
            </div>
            {modal}
        </div>
    )
}