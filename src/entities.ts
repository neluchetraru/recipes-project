

export interface RecipeSimple {
    image: string;
    id: number;
    title: string;
}


export interface UserRecipe {
    id: number;
    title: string;
    method: string;
    ingredients: string[];
    image: string;
}