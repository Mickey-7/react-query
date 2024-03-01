// added for custom query hook
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { request } from "../utils/axios-utils"


const fetchSuperheroes = () => {
    // commented out for axios interceptor
    // return axios
    //     .get('http://localhost:4000/superheroes')
    //added for handling error
    // .get('http://localhost:4000/superheroesdafda')
    // added for axios interceptor
    return request({ url: '/superheroes' })
}



export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery('super-heroes', fetchSuperheroes,
        {
            // // added for query cache
            // cacheTime: 7000,
            // // added for query cache
            // staleTime: 5000,
            // //  added for refetch defaults
            // refetchOnMount: true,
            // refetchOnWindowFocus: 'always',
            // // added for polling
            // refetchInterval: 2000,
            // refetchIntervalInBackground: true,
            // // added for useQuery on click
            // enabled: false,
            // // added for success and error callbacks
            onSuccess: onSuccess,
            onError: onError,
            // added for query by id
            // added for data transformation
            // select: (data) => {
            //     const superHeroNames = data.data.map((hero) => hero.name)
            //     return superHeroNames
            // }
        }
    )
}

// added for mutations
const addSuperHero = (hero) => {
    // commented out for axios interceptor
    // return axios.post('http://localhost:4000/superheroes', hero)
    // added for axios interceptor
    return request({ url: '/superheroes', method: 'post', data: hero })
}


export const useAddSuperHeroData = () => {
    // added for query invalidation
    const queryClient = useQueryClient()
    return useMutation(addSuperHero
        // added for query invalidation
        , {
            // commented out for optimistic updates
            // onSuccess: (
            //     // added for handling mutation response
            //     data
            // ) => {
            //     // commented out for handling mutation response
            //     // added for query invalidation
            //     // queryClient.invalidateQueries('super-heroes')
            //     // added for handling mutation response
            //     queryClient.setQueryData('super-heroes', (oldQueryData) => {
            //         return {
            //             ...oldQueryData,
            //             data: [...oldQueryData.data, data.data]
            //         }
            //     })
            // }
            onMutate: async (newHero) => {
                await queryClient.cancelQueries('super-heroes')
                const previousHeroData = queryClient.getQueryData('super-heroes')
                queryClient.setQueriesData('super-heroes', (oldQueryData) => {
                    return {
                        ...oldQueryData,
                        data: [...oldQueryData.data,
                        { id: oldQueryData?.data?.length + 1, ...newHero }
                        ]
                    }
                })
                return {
                    previousHeroData,
                }
            },
            onError: (_error, _hero, context) => {
                queryClient.setQueryData('super-heroes', context.previousHeroData)
            },
            onSettled: () => {
                queryClient.invalidateQueries('super-heroes')
            }
        }
    )
}