'use client'

import React, { useState } from "react"
import { Plus, X, Upload } from 'lucide-react'
import { Button } from "@/components/common/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/common/dialog"
import { Input } from "@/components/common/input"
import { Label } from "@/components/common/label"
import { Textarea } from "@/components/common/textarea"
import { Badge } from "@/components/common/badge"
import Image from "next/image";

interface Ingredient {
    name: string
    quantity: string
    unit: string
}

interface Step {
    order: number
    description: string
}

export default function UploadRecipeModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', quantity: '', unit: 'g' }])
    const [steps, setSteps] = useState<Step[]>([{ order: 1, description: '' }])
    const [tags, setTags] = useState<string[]>([])
    const [newTag, setNewTag] = useState('')

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '', unit: 'g' }])
    }

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index))
    }

    const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
        const newIngredients = [...ingredients]
        newIngredients[index] = { ...newIngredients[index], [field]: value }
        setIngredients(newIngredients)
    }

    const addStep = () => {
        setSteps([...steps, { order: steps.length + 1, description: '' }])
    }

    const removeStep = (index: number) => {
        setSteps(steps.filter((_, i) => i !== index))
    }

    const updateStep = (index: number, description: string) => {
        const newSteps = [...steps]
        newSteps[index] = { ...newSteps[index], description }
        setSteps(newSteps)
    }

    const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTag.trim() && !tags.includes(newTag.trim())) {
            e.preventDefault()
            setTags([...tags, newTag.trim()])
            setNewTag('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        formData.append('ingredients', JSON.stringify(ingredients))
        formData.append('steps', JSON.stringify(steps))
        formData.append('tags', JSON.stringify(tags))

        try {
            const response = await fetch('/api/recipes', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to upload recipe')
            }

            setIsOpen(false)
            // Reset form or show success message
        } catch (error) {
            console.error('Error uploading recipe:', error)
            // Show error message
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-full text-left justify-left">
                    <h2 className="text-xl font-semibold mb-2">
                        Post
                    </h2>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white border border-gray-200">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Upload New Recipe</DialogTitle>
                    <DialogDescription>
                        Share your delicious recipe with the Foodstagram community
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Recipe Title</Label>
                        <Input id="title" name="title" placeholder="Enter recipe title" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Describe your recipe"
                            className="min-h-[100px]"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Recipe Image</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => document.getElementById('image')?.click()}
                                className="w-full"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Image
                            </Button>
                        </div>
                        {imagePreview && (
                            <div className="relative mt-2">
                                <Image
                                    src={imagePreview}
                                    alt="Recipe preview"
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2"
                                    onClick={() => setImagePreview(null)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Tags</Label>
                        <div className="flex flex-wrap gap-2">
                            {tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="px-2 py-1">
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-2 hover:text-destructive"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </Badge>
                            ))}
                            <Input
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={addTag}
                                placeholder="Add tag and press Enter"
                                className="flex-1 min-w-[200px]"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label>Ingredients</Label>
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    value={ingredient.name}
                                    onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                                    placeholder="Ingredient name"
                                    className="flex-1"
                                />
                                <Input
                                    type="number"
                                    min="1"
                                    value={ingredient.quantity}
                                    onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                                    placeholder="Quantity"
                                    className="w-24"
                                />
                                <span className="text-sm text-muted-foreground self-center">Gram</span>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => removeIngredient(index)}
                                >
                                    <X className="w-4 h-4"/>
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addIngredient} className="w-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Ingredient
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <Label>Steps</Label>
                        {steps.map((step, index) => (
                            <div key={index} className="flex gap-2">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full text-black flex items-center justify-center">
                                    {step.order}
                                </div>
                                <div className="flex-1">
                                    <Textarea
                                        value={step.description}
                                        onChange={(e) => updateStep(index, e.target.value)}
                                        placeholder={`Describe step ${step.order}`}
                                        className="min-h-[80px]"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => removeStep(index)}
                                >
                                    <X className="w-4 h-4 self-center" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addStep} className="w-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Step
                        </Button>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-[#F05454] hover:bg-[#E04444] text-white">
                            Upload Recipe
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}