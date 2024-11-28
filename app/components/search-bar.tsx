import {Input} from "@/components/common/input";
import {Button} from "@/components/common/button";

export default function SearchBar(props: { handleSearch: () => void , handleInput: (input: string) => void , isLoading: boolean, display: string }) {
    return (
        <div className="flex gap-3 mb-6 max-w-xl">
            <Input
                value={props.display}
                type="search"
                placeholder="Recipe, Ingredient, or Cuisine"
                className="rounded-full"
                onChange={(e) => props.handleInput(e.target.value)}
            />
            <Button
                className="bg-red-500 hover:bg-red-600 text-white rounded-full"
                disabled={props.isLoading}
                onClick={props.handleSearch}
            >
                {props.isLoading ? 'Searching...' : 'Search'}
            </Button>
        </div>
    )
}