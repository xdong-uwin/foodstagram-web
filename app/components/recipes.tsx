import {Button} from "@/components/button";
import { Heart } from "lucide-react"
import {Recipe, RecipeContent} from "@/components/recipe";
import Image from "next/image"
import useSWR from "swr";

type Recipe = {
    imageUrl: string
    title: string
    description: string
    authorId: string
}

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<Recipe[]> =>
    fetch(...args).then((res) => res.json());

export default function Recipes() {
    const { data } = useSWR('http://localhost:8080/v1/recipes', fetcher);

    const recipes = data ? data.map(recipe => ({
        "image": recipe.imageUrl,
        "title": recipe.title,
        "description": recipe.description,
        "authorId": recipe.authorId,
    })) : [];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {recipes.map((recipe, index) => (
                <Recipe key={index}>
                    <RecipeContent className="p-3">
                        <div className="aspect-square relative mb-3">
                            <Image
                                src={recipe.image}
                                alt="Food post"
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                        <p className="text-lg mb-2 font-extrabold">{recipe.title}</p>
                        <p className="text-sm mb-2 line-clamp-2">{recipe.description}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{recipe.authorId}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                                <Heart className="w-4 h-4"/>
                                <span className="ml-1">Like</span>
                            </Button>
                        </div>
                    </RecipeContent>
                </Recipe>
            ))}
        </div>
    )
}