import Link from "next/link";
import {ReactNode} from "react";
import {Button} from "@/components/button";
import LoginModal from "@/components/login-modal";

function SidebarItem(props: { value: ReactNode }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">
                {props.value}
            </h2>
        </div>
    )
}

export default function Sidebar() {
    return (
        <aside className="w-64 p-6 bg-white border-r min-h-screen">
            <Link href="/" className="inline-block mb-8">
                <div className="bg-red-500 text-white px-11 py-2 rounded-full text-lg font-semibold">
                    Foodstagram
                </div>
            </Link>

            <nav className="space-y-7">
                <SidebarItem value="Find" />
                <SidebarItem value="Post" />
                <SidebarItem value="Notification" />

                <LoginModal/>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                    Become a member
                </Button>
            </nav>
        </aside>
    )
}