import {ReactNode} from "react";

export default async function HomeLayout({children}:{children: ReactNode}):Promise<JSX.Element>{
    return (
        <div>
            {children}
        </div>
    );
}