import {Button} from "@/components/common/button";

export default function Categories(props: { value: string[] }) {
    return (
        <div className="flex gap-2 flex-wrap">
            {props.value.map((category) => (
                <Button
                    key={category}
                    variant="outline"
                    className="rounded-full"
                >
                    {category}
                </Button>
            ))}
        </div>
    )
}