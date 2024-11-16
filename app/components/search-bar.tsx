import {Input} from "@/components/common/input";
import {Button} from "@/components/common/button";

export default function SearchBar() {
    return (
        <div className="flex gap-3 mb-6 max-w-xl">
            <Input
                type="search"
                placeholder="Recipe, Ingredient, or Cuisine"
                className="rounded-full"
            />
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full">
                Search
            </Button>
        </div>
    )
}