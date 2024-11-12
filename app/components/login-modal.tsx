'use client'

import {Button} from "@/components/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/dialog"
import {Input} from "@/components/input"
import {Label} from "@/components/label"

export default function LoginModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                    Sign in
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Welcome back</DialogTitle>
                    <DialogDescription>
                        Sign in to your Foodstagram account to continue
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" className="border-gray-200"/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Enter your password"
                               className="border-gray-200"/>
                    </div>
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                        Sign in
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <a href="#" className="text-red-500 hover:underline">
                            Sign up
                        </a>

                    </p>
                </div>

            </DialogContent>
        </Dialog>
    )
}