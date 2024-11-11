import {Button} from "@/components/button";
import { Heart } from "lucide-react"
import {Recipe, RecipeContent} from "@/components/recipe";
import Image from "next/image"

export default function Recipes() {
    const posts = Array(10).fill({
        image: "/placeholder.jpeg?height=400&width=400",
        title: "Welcome to foodstagram! Find your specialized food.",
        poster: "Poster"
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {posts.map((post, index) => (
                <Recipe key={index}>
                    <RecipeContent className="p-3">
                        <div className="aspect-square relative mb-5">
                            <Image
                                src={post.image}
                                alt="Food post"
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                        <p className="text-sm mb-2">{post.title}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{post.poster}</span>
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