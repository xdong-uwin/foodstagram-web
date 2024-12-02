import Link from "next/link";
import React, {useState} from "react";
import LoginModal from "@/components/modal/login-modal";
import RegisterModal from "@/components/modal/resigter-modal";
import {Button} from "@/components/common/button";
import CreateRecipeModal from "@/components/modal/create-recipe-modal";
import {isUndefined} from "swr/_internal";
import {useLanguage} from "@/language/language-context";
import translations from "@/language/translations";
import NotificationsModal from "@/components/modal/notification-modal";

export default function Sidebar(props: { handleClickFavourite: (memberId: string) => void }) {
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [isRegisterOpen, setIsRegisterOpen] = useState(false)
    const { language } = useLanguage()
    const translationText = translations[language]

    const handleLogoutClick = () => {
        localStorage.removeItem('memberId')
        window.location.reload()
    }

    return (
        <aside className="w-64 p-6 bg-white border-r min-h-screen">
            <Link href="/" className="inline-block mb-8">
                <div className="bg-red-500 text-white px-11 py-2 rounded-full text-lg font-semibold">
                    Foodstagram
                </div>
            </Link>

            <nav className="space-y-7">
                <div>
                    <Button className="w-full text-left justify-left" onClick={() => {
                        const memberId = localStorage.getItem('memberId');
                        if (memberId) {
                            props.handleClickFavourite(memberId);
                        } else {
                            alert("Please sign in to view your favourite recipes");
                        }
                    }}>
                        <h2 className="text-xl font-semibold mb-2">
                            {translationText.favourite}
                        </h2>
                    </Button>
                </div>
                <CreateRecipeModal/>
                <NotificationsModal/>

                {isUndefined(localStorage) || localStorage.getItem('memberId') ? (
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white justify-center"
                            onClick={handleLogoutClick}>
                        {translationText.logout}
                    </Button>
                ) : (
                    <>
                        <LoginModal isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen}
                                    setIsRegisterOpen={setIsRegisterOpen}/>
                        <RegisterModal isRegisterOpen={isRegisterOpen} setIsRegisterOpen={setIsRegisterOpen}
                                       setIsLoginOpen={setIsLoginOpen}/>
                    </>
                )}

            </nav>
        </aside>
    )
}