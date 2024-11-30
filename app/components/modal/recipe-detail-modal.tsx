import * as React from "react"
import Image from "next/image"
import {Badge} from "@/components/common/badge"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/common/dialog"
import {ScrollArea} from "@/components/common/scroll-area"
import {Separator} from "@/components/common/separator"
import type {Recipe} from "@/types/recipe"

interface RecipeModalProps {
    recipe: Recipe
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function RecipeDetailModal({recipe, open, onOpenChange}: RecipeModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{recipe.title}</DialogTitle>
                    <p className="text-muted-foreground">{recipe.description}</p>
                </DialogHeader>
                <ScrollArea className="max-h-[80vh]">
                    <div className="space-y-6">
                        <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
                            <Image
                                src={recipe.imageUrl}
                                alt={recipe.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">Ingredients</h3>
                            <Separator className="my-2"/>
                            <ul className="list-inside list-disc space-y-2">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>
                                        {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">Instructions</h3>
                            <Separator className="my-2"/>
                            <ol className="list-inside list-decimal space-y-4">
                                {recipe.steps.map((step) => (
                                    <li key={step.order} className="pl-2">
                                        {step.description}
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div>
                            {recipe.tags == null || recipe.tags.length == 0 ? null : (
                                <>
                                    <h3 className="text-lg font-semibold">Tags</h3>
                                    <Separator className="my-2"/>
                                    <div className="flex flex-wrap gap-2">
                                        {recipe.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                <strong className="text-lg font-semibold">Created by</strong> <span className="font-medium">{recipe.author}</span>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

