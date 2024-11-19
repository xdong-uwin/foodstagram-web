"use client"
import useSWR from 'swr'

import Sidebar from "@/components/sidebar";
import SearchBar from "@/components/search-bar";
import Categories from "@/components/categories";
import Recipes from "@/components/recipes";
import {useState} from "react";

type RecipeTag = {
    name: string;
};

type Recipe = {
    imageUrl: string
    title: string
    description: string
    author: string
}

const fetchRecipes = async (query: string): Promise<Recipe[]> => {
    try {
        const response = await fetch(`http://localhost:8080/v1/recipes?keyword=${encodeURIComponent(query)}`)
        if (!response.ok) {
            throw new Error('Failed to fetch recipes')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching recipes:', error)
        return []
    }
}

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<RecipeTag[]> =>
    fetch(...args).then((res) => res.json());

export default function FoodstagramIndex() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleInput = (input: string) => {
        setSearchQuery(input);
    }

    const handleSearch = async () => {
        setIsLoading(true)
        try {
            console.log(`Searching for ${searchQuery}`)
            const results = await fetchRecipes(searchQuery)
            console.log(results)
            setRecipes(results)
        } catch (error) {
            console.error('Error during search:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const { data: recipeTagsResponse } = useSWR('http://localhost:8080/v1/configurations/recipe-tags', fetcher)
    const recipeTags = recipeTagsResponse ? recipeTagsResponse.map(recipeTag => recipeTag.name) : [];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <Sidebar/>
                <main className="flex-1 p-6">
                    <div className="mb-8">
                        <SearchBar handleInput={handleInput} handleSearch={handleSearch} isLoading={isLoading}/>
                        <Categories value={recipeTags} handleSearch={handleSearch} />
                    </div>
                    <Recipes recipes={recipes} />
                    {recipes.length === 0 && !isLoading && (
                        <p className="text-center text-gray-500 mt-6">No recipes found. Try a different search term.</p>
                    )}
                </main>
            </div>
        </div>
    )
}