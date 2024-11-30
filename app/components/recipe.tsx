import * as React from "react"
import {merge} from "@/lib/utils"

const Recipe = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={merge("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
        {...props}
    />
))
Recipe.displayName = "Recipe"

const RecipeHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={merge("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
RecipeHeader.displayName = "RecipeHeader"

const RecipeTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({className, ...props}, ref) => (
    <h3
        ref={ref}
        className={merge("text-2xl font-semibold leading-none tracking-tight", className)}
        {...props}
    />
))
RecipeTitle.displayName = "RecipeTitle"

const RecipeDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({className, ...props}, ref) => (
    <p
        ref={ref}
        className={merge("text-sm text-muted-foreground", className)}
        {...props}
    />
))
RecipeDescription.displayName = "RecipeDescription"

const RecipeFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={merge("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
RecipeFooter.displayName = "RecipeFooter"

export {Recipe, RecipeHeader, RecipeFooter, RecipeTitle, RecipeDescription}