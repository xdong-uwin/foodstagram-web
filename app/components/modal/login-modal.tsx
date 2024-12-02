'use client'

import {Button} from "@/components/common/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/common/dialog"
import {Input} from "@/components/common/input"
import {Label} from "@/components/common/label"
import React, {useEffect, useState} from "react";
import { Alert, AlertDescription } from "@/components/common/alert";
import {LoginResponse} from "@/types/LoginResponse";
import {useLanguage} from "@/language/language-context";
import translations from "@/language/translations";

export default function LoginModal(props: {
    isLoginOpen: boolean,
    setIsLoginOpen: (arg: boolean) => void,
    setIsRegisterOpen: (arg: boolean) => void,
}) {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const { language } = useLanguage()
    const translationText = translations[language]

    useEffect(() => {
        if (props.isLoginOpen) {
            setErrorMessage(null)
        }
    }, [props.isLoginOpen])

    const postLoginData = async (data: { email: string; password: string }): Promise<LoginResponse> => {
        const response = await fetch('http://localhost:8080/v1/members/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            const errorData = await response.json()
            console.log(errorData)
            throw new Error(errorData.error || 'Login failed')
        }
        return response.json()
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setErrorMessage(null)
        const form = event.currentTarget
        const formData = new FormData(form)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            const loginResponse = await postLoginData({email, password})
            localStorage.setItem('memberId', String(loginResponse.memberId))
            props.setIsLoginOpen(false)

        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage('An unexpected error occurred')
            }
            // Display error message to user?
        } finally {
            setIsLoading(false)
            // props.setIsLoginOpen(false);
        }
    }

    const handleSignOnClick = () => {
        props.setIsLoginOpen(false)
        props.setIsRegisterOpen(true)
    }

    return (
        <Dialog open={props.isLoginOpen} onOpenChange={props.setIsLoginOpen}>
            <DialogTrigger asChild>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white justify-center">
                    {translationText.signIn}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Welcome back</DialogTitle>
                    <DialogDescription>
                        Sign in to your Foodstagram account to continue
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleLogin} className="grid gap-4 py-2">
                    {errorMessage && (
                        <Alert variant="destructive">
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="Enter your email" className="border-gray-200"
                               required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" placeholder="Enter your password"
                               className="border-gray-200" required/>
                    </div>
                    <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white justify-center"
                            disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <button type="button" onClick={handleSignOnClick} className="text-red-500 hover:underline">
                            Sign up
                        </button>
                    </p>
                </form>

            </DialogContent>
        </Dialog>
    )
}
