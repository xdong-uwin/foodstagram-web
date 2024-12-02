import {Input} from "@/components/common/input";
import {Button} from "@/components/common/button";
import {useLanguage} from "@/language/language-context";
import translations from "@/language/translations";

export default function SearchBar(props: { handleSearch: () => void , handleInput: (input: string) => void , isLoading: boolean, display: string }) {
    const { language } = useLanguage()
    const translationText = translations[language]

    return (
        <div className="flex gap-3 mb-6 max-w-xl">
            <Input
                value={props.display}
                type="search"
                placeholder={translationText.searchPlaceholder}
                className="rounded-full"
                onChange={(e) => props.handleInput(e.target.value)}
            />
            <Button
                className="bg-lime-500 hover:bg-lime-600 text-white rounded-full"
                disabled={props.isLoading}
                onClick={props.handleSearch}
            >
                {props.isLoading ? translationText.searching : translationText.search}
            </Button>
        </div>
    )
}