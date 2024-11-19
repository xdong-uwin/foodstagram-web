import {Button} from "@/components/common/button";

export default function Categories(props: { value: string[], handleSearch: (keyword: string) => void } ) {
    return (
        <div className="flex gap-2 flex-wrap">
            {props.value.map((recipeTag) => (
                <Button
                    key={recipeTag}
                    variant="outline"
                    className="rounded-full"
                    onClick={() => props.handleSearch(recipeTag)}
                >
                    {recipeTag}
                </Button>
            ))}
        </div>
    )
}