import {Recipe} from "@/components/recipe";
import React from "react";
import {RecipeDetailModal} from "@/components/modal/recipe-detail-modal";
import {Recipe as RecipeDto} from "@/types/recipe";
import RecipeContent from "@/components/recipe-content";

export default function Recipes(props: { recipes: RecipeDto[] }) {
    const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {props.recipes.map((recipe, index) => (
                <Recipe key={index}>
                    <RecipeContent recipe={recipe} setIsDetailModalOpen={setIsDetailModalOpen} />
                    <RecipeDetailModal
                        recipe={recipe}
                        open={isDetailModalOpen}
                        onOpenChange={setIsDetailModalOpen}
                    />
                </Recipe>

            ))}
        </div>
    )
}