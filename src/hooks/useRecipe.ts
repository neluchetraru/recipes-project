import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/api-client'


const apiClient = new APIClient<RecipeResponse>('/recipes')

interface AnalyzedInstruction {
    number: number;
    step: string,
}

interface RecipeResponse {
    dishTypes: [string];
    readyInMinutes: number;
    servings: number;
    extendedIngredients: [ExtendedIngredients];
    instructions: string;
    analyzedInstructions: [{ name: string, steps: AnalyzedInstruction[] }]
}

interface ExtendedIngredients {
    name: string;
    original: string;
}

const useRecipe = (id: number) => useQuery({
    queryKey: ['recipe', id],
    queryFn: () => apiClient.get(id)
})

export default useRecipe;