import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/api-client'


const apiClient = new APIClient<RecipeResponse[]>('/recipes')

interface AnalyzedInstruction {
    number: number;
    step: string,

}
interface RecipeResponse {
    dishTypes: [string],
    readyInMinutes: number,
    servings: number,
    extendedIngredients: [ExtendedIngredients],
    instructions: string,
    analyzedInstructions: [{ name: string, steps: AnalyzedInstruction[] }]
    title: string,
    image: string,
    id: number;
}
interface ExtendedIngredients {
    name: string;
    original: string;
}


const useRecipesBulk = (ids: number[]) => useQuery({
    queryKey: ['ids', ids],
    queryFn: () => apiClient.getBulk({
        params: {
            ids: ids.join(',')
        }
    })
})

export default useRecipesBulk;