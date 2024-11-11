"use client"

import Sidebar from "@/components/sidebar";
import SearchBar from "@/components/search-bar";
import Categories from "@/components/categories";
import Recipes from "@/components/recipes";

export default function FoodstagramIndex() {
    const categories = ["Low-fat", "High-protein", "Low-sugar", "Vitamin C", "Heart-friendly", "High-fiber"]

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <Sidebar/>
                <main className="flex-1 p-6">
                    <div className="mb-8">
                        <SearchBar/>
                        <Categories value={categories}/>
                    </div>
                    <Recipes/>
                </main>
            </div>
        </div>
    )
}