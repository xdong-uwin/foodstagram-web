import Recipe from "@/components/recipe";
import React from "react";
import {Recipe as RecipeDto} from "@/types/recipe";

export default function Recipes(props: { recipes: RecipeDto[] }) {


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {props.recipes.map((recipe, index) => (
                <Recipe recipe={recipe} key={index} />
            ))}
        </div>
    )
}