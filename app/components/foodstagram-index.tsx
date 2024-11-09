"use client"

import Sidebar from "@/components/sidebar";
import SearchBar from "@/components/search-bar";

export default function FoodstagramIndex() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <Sidebar/>
                <main className="flex-1 p-6">
                    <div className="mb-8">
                        <SearchBar/>
                    </div>
                </main>
            </div>
        </div>
    )
}