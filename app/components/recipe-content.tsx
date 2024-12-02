import {merge} from "@/lib/utils";
import Image from "next/image";
import {Button} from "@/components/common/button";
import {Heart} from "lucide-react";
import React from "react";
import {Recipe} from "@/types/recipe";
import {useLanguage} from "@/language/language-context";
import translations from "@/language/translations";

export default function RecipeContent(
    props: { recipe: Recipe, setIsDetailModalOpen: (value: boolean) => void },
    ref: React.Ref<HTMLDivElement>
) {
    const [isLikedByCurrentMember, setIsLikedByCurrentMember] = React.useState(
        !!(localStorage.getItem('memberId') && props.recipe.likedBy.includes(Number(localStorage.getItem('memberId'))))
    );
    const { language } = useLanguage()
    const translationText = translations[language]

    const handleLike = async () => {
        if (localStorage.getItem('memberId')) {
            if (isLikedByCurrentMember) {
                try {
                    await fetch(`http://localhost:8080/v1/recipes/${props.recipe.id}/unlike?memberId=${Number(localStorage.getItem('memberId'))}`,
                        {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }
                    );
                    console.log('unlike');
                    setIsLikedByCurrentMember(false);
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                try {
                    await fetch(`http://localhost:8080/v1/recipes/${props.recipe.id}/like?memberId=${Number(localStorage.getItem('memberId'))}`,
                        {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }
                    );
                    console.log('like');
                    setIsLikedByCurrentMember(true);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        } else {
            alert('Please sign in to like a recipe');
        }
    }

    return (
        <div ref={ref} className={merge("pt-0 p-3")} {...props} >
            <div className="aspect-square relative mb-3">
                <Image
                    src={props.recipe.imageUrl}
                    alt="Food post"
                    fill
                    className="object-cover rounded-lg"
                    onClick={() => props.setIsDetailModalOpen(true)}
                />
            </div>
            <p className="text-lg mb-2 font-extrabold">{props.recipe.title}</p>
            <p className="text-sm mb-2 line-clamp-2">{props.recipe.description}</p>
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{props.recipe.author}</span>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-lime-500 hover:text-lime-600 hover:bg-lime-50"
                    onClick={handleLike}
                >
                    {isLikedByCurrentMember ?
                        <Heart className="w-4 h-4" fill="#84cc16"/> :
                        <Heart className="w-4 h-4"/>}
                    <span className="ml-1">{translationText.like}</span>
                </Button>
            </div>
        </div>
    );

}
