'use client'

import React, { useState } from "react"
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
import translations from "@/language/translations";
import {useLanguage} from "@/language/language-context";

export default function RegisterModal(props: {
    isRegisterOpen: boolean,
    setIsRegisterOpen: (arg: boolean) => void,
    setIsLoginOpen: (arg: boolean) => void
}) {
    const [isLoading, setIsLoading] = useState(false)
    const { language } = useLanguage()
    const translationText = translations[language]

    const postRegisterData = async (data: { name: string; email: string; password: string }) => {
        const response = await fetch('http://localhost:8080/v1/members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error('Registration failed')
        }
        return response.json()
    }

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        const form = event.currentTarget
        const formData = new FormData(form)
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            await postRegisterData({ name, email, password })
            props.setIsRegisterOpen(false)
            // Show a success message?
        } catch (error) {
            console.error('Registration error:', error)
            // Display error message to user?
        } finally {
            setIsLoading(false)
            props.setIsRegisterOpen(false);
        }
    }

    const handleLoginClick = () => {
        props.setIsRegisterOpen(false)
        props.setIsLoginOpen(true)
    }

    return (
        <>
            <Dialog open={props.isRegisterOpen} onOpenChange={props.setIsRegisterOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full bg-lime-500 hover:bg-lime-600 text-white justify-center">
                        {translationText.becomeAMember}
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Create an account</DialogTitle>
                        <DialogDescription>
                            Join Foodstagram to share and discover amazing recipes
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleRegister} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">First Name</Label>
                            <Input id="name" name="name" type="text" placeholder="Enter your first name"
                                   className="border-gray-200 bg-white/50" required/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Last Name</Label>
                            <Input id="name" name="name" type="text" placeholder="Enter your last name"
                                   className="border-gray-200 bg-white/50" required/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="Enter your email"
                                   className="border-gray-200 bg-white/50" required/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="Create a password"
                                   className="border-gray-200 bg-white/50" required/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password" name="confirm-password" type="password"
                                   placeholder="Confirm your password" className="border-gray-200 bg-white/50"
                                   required/>
                        </div>
                        <Button type="submit" className="w-full bg-lime-500 hover:bg-lime-600 text-white justify-center"
                                disabled={isLoading}>
                            {isLoading ? 'Signing up...' : 'Sign up'}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <button type="button" onClick={handleLoginClick} className="text-lime-500 hover:underline">
                                Sign in
                            </button>
                        </p>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}