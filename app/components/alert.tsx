import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"

import {merge} from "@/lib/utils"
import {OctagonX} from "lucide-react";

const alertVariants = cva(
    "relative w-full",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                destructive:
                    "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const Alert = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({className, variant, ...props}, ref) => (
    <div className="flex items-center justify-between">
        <OctagonX color="#F87171"/>
        &nbsp;&nbsp;
        <div
            ref={ref}
            role="alert"
            className={merge(alertVariants({variant}), className)}
            {...props}
        />
    </div>
))
Alert.displayName = "Alert"

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={merge("text-sm font-extrabold [&_p]:leading-relaxed text-red-400", className)}
        {...props}
    />
))
AlertDescription.displayName = "AlertDescription"

export {Alert, AlertDescription}