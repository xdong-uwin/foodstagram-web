import * as React from "react"
import type {Recipe} from "@/types/recipe";
import RecipeContent from "@/components/recipe-content";
import {RecipeDetailModal} from "@/components/modal/recipe-detail-modal";


export default function Recipe(
    props: { recipe: Recipe }
) {
    const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false)

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <RecipeContent recipe={props.recipe} setIsDetailModalOpen={setIsDetailModalOpen} />
            <RecipeDetailModal
                recipe={props.recipe}
                open={isDetailModalOpen}
                onOpenChange={setIsDetailModalOpen}
            />
        </div>
    )
}