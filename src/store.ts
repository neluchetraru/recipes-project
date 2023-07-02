import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { UserRecipe } from './entities';

interface UserQuery {
    userRecipes: UserRecipe[];
    userFavorites: number[];
    colorMode: "dark" | "light";
}


interface UserQueryStore {
    userQuery: UserQuery;
    addUserRecipe: (userRecipe: UserRecipe) => void;
    addUserFavorite: (userFavorite: number) => void;
    setColorMode: (colorMode: "dark" | "light") => void;
    deleteUserRecipe: (id: number) => void;
    deleteUserFavorite: (id: number) => void;
}


const useUserQueryStore = create(
    persist<UserQueryStore>(
        (set) => ({
            userQuery: {
                userRecipes: [] as UserRecipe[],
                userFavorites: [] as number[],
                colorMode: 'dark',

            } as UserQuery,
            addUserRecipe: (userRecipe) => set((store) => {
                console.log(userRecipe)
                return ({
                    userQuery: {
                        ...store.userQuery,
                        userRecipes: [...store.userQuery.userRecipes, userRecipe]
                    }
                })
            }),
            addUserFavorite: (userFavorite) => set((store) => ({
                userQuery: {
                    ...store.userQuery,
                    userFavorites: [...store.userQuery.userFavorites, userFavorite]
                }
            })),
            setColorMode: (colorMode) => set((store) => ({
                userQuery: {
                    ...store.userQuery,
                    colorMode: colorMode
                }
            })),
            deleteUserRecipe: (id: number) => set((store) => ({
                userQuery: {
                    ...store.userQuery,
                    userRecipes: store.userQuery.userRecipes.filter(userRecipe => userRecipe.id !== id)
                }
            })),
            deleteUserFavorite: (id: number) => set((store) => ({
                userQuery: {
                    ...store.userQuery,
                    userFavorites: store.userQuery.userFavorites.filter(userFavorite => userFavorite !== id)
                }
            }))
        }), {

        name: "userStorage",
        storage: createJSONStorage(() => sessionStorage)
    }
    )
)

export default useUserQueryStore;