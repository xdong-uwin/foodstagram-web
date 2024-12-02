'use client'

import { Button } from "@/components/common/button"
import { useLanguage } from "./language-context"

export default function LanguageSwitch() {
    const { language, setLanguage } = useLanguage()

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'fr' : 'en')
    }

    return (
        <Button
            onClick={toggleLanguage}
            variant="outline"
            className="fixed top-4 right-4 z-50"
        >
            {language === 'en' ? 'FR' : 'EN'}
        </Button>
    )
}