export interface Ingredient {
    name: string
    quantity: number
    unit: string
}

export interface Step {
    order: number
    description: string
}

export interface Recipe {
    id: string
    title: string
    description: string
    ingredients: Ingredient[]
    steps: Step[]
    tags: string[]
    author: string
    imageUrl: string
    likedBy: number[]
}