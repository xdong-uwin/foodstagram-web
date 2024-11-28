import Link from "next/link";
import React, {ReactNode, useState} from "react";
import LoginModal from "@/components/modal/login-modal";
import RegisterModal from "@/components/modal/resigter-modal";
import {Button} from "@/components/common/button";

function SidebarItem(props: { value: ReactNode }) {
    return (
        <div>
            <Button className="w-full text-left justify-left">
                <h2 className="text-xl font-semibold mb-2">
                    {props.value}
                </h2>
            </Button>
        </div>
    )
}

export default function Sidebar() {
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [isRegisterOpen, setIsRegisterOpen] = useState(false)
    const [isLogged, setIsLogged] = useState(false)

    const handleLogoutClick = () => {
        setIsLogged(false)
    }

    return (
        <aside className="w-64 p-6 bg-white border-r min-h-screen">
            <Link href="/" className="inline-block mb-8">
                <div className="bg-red-500 text-white px-11 py-2 rounded-full text-lg font-semibold">
                    Foodstagram
                </div>
            </Link>

            <nav className="space-y-7">
                <SidebarItem value="Favourite"/>
                <SidebarItem value="Post"/>
                <SidebarItem value="Notification"/>

                {isLogged ? (
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white"
                            onClick={handleLogoutClick}>
                        Log out
                    </Button>
                ) : (
                    <>
                        <LoginModal isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen}
                                    setIsRegisterOpen={setIsRegisterOpen} setIsLogged={setIsLogged}/>
                        <RegisterModal isRegisterOpen={isRegisterOpen} setIsRegisterOpen={setIsRegisterOpen}
                                       setIsLoginOpen={setIsLoginOpen}/>
                    </>
                )}

            </nav>
        </aside>
    )
}