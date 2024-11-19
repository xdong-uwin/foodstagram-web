import {Button} from "@/components/common/button";
import { Heart } from "lucide-react"
import {Recipe, RecipeContent} from "@/components/recipe";
import Image from "next/image"

type Recipe = {
    imageUrl: string
    title: string
    description: string
    author: string
}

export default function Recipes(props: { recipes: Recipe[] }) {
    const recipes = props.recipes.map(recipe => ({
        "image": recipe.imageUrl,
        "title": recipe.title,
        "description": recipe.description,
        "author": recipe.author,
    }));

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
                            <span className="text-sm text-gray-500">{recipe.author}</span>
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