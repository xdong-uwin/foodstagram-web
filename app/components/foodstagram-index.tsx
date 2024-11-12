"use client"
import useSWR from 'swr'

import Sidebar from "@/components/sidebar";
import SearchBar from "@/components/search-bar";
import Categories from "@/components/categories";
import Recipes from "@/components/recipes";

type RecipeTag = {
    name: string;
};

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<RecipeTag[]> =>
    fetch(...args).then((res) => res.json());

export default function FoodstagramIndex() {
    const { data } = useSWR('http://localhost:8080/v1/configurations/recipe-tags', fetcher)

    const categories = data ? data.map(recipeTag => recipeTag.name) : [];

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