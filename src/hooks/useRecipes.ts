import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import APIClient from '../services/api-client'
import { RecipeSimple } from '../entities';


export interface RecipesResponse {
    results: RecipeSimple[];
    offset: number;
    number: number;
    totalResults: number;
}
const apiClient = new APIClient<RecipesResponse>('/recipes')

const useRecipes = (query: string) => useInfiniteQuery({
    queryKey: ['recipes', query],
    queryFn: ({ pageParam = 0 }) => apiClient.getAll({
        params: {
            query: query,
            offset: pageParam + 10
        }
    }),
    getNextPageParam: (lastPage, allPages) => lastPage.number + allPages.length
})

export default useRecipes;