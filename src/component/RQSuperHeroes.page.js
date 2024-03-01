import axios from "axios"
import { useState } from "react"
import { useQuery } from "react-query"
import { useAddSuperHeroData, useSuperHeroesData } from "../hooks/useSuperHeroesData"
import { Link } from "react-router-dom"

// added for custom query hook
// will be move to hooks/useSuperHeroesData.js
// const fetchSuperheroes = () => {
//     return axios
//         .get('http://localhost:4000/superheroes')
//     //added for handling error
//     // .get('http://localhost:4000/superheroesdafda')
// }

export const RQSuperHeroes = () => {
    // added for mutations
    const [name, setName] = useState('')
    const [alterEgo, setAlterEgo] = useState('')
    const { mutate: addHero } = useAddSuperHeroData()

    const handleAddHeroClick = () => {
        console.log({ name, alterEgo })
        const hero = { name, alterEgo }
        addHero(hero)
    }

    // added for success and error callbacks
    const onSuccess = (data) => {
        console.log("Perform side effect after data fetching", data)
    }
    const onError = (error) => {
        console.log("Perform side effect after encountering error", error)
    }

    const { isLoading, data,
        //added for handling error on useQuery
        isError, error,
        // added for query cache
        isFetching,
        // added for useQuery on click
        refetch
    } =
        // added for custom query hook
        // will be move to hooks/useSuperHeroesData.js
        // useQuery('super-heroes', fetchSuperheroes,
        //     {
        //         // added for query cache
        //         cacheTime: 7000,
        //         // added for query cache
        //         staleTime: 5000,
        //         //  added for refetch defaults
        //         refetchOnMount: true,
        //         refetchOnWindowFocus: 'always',
        //         // added for polling
        //         refetchInterval: 2000,
        //         refetchIntervalInBackground: true,
        //         // added for useQuery on click
        //         enabled: false,
        //         // added for success and error callbacks
        //         onSuccess: onSuccess,
        //         onError: onError,
        //         // added for data transformation
        //         select: (data) => {
        //             const superHeroNames = data.data.map((hero) => hero.name)
        //             console.log(`coming homw`, data)
        //             return superHeroNames
        //         }
        //     }
        // )

        // added for custom query hook
        useSuperHeroesData(onSuccess, onError)
    console.log({ isLoading, isFetching })

    if (isLoading
        // added for useQuery on click
        || isFetching
    ) {
        return <h2>Loading...</h2>
    }

    //added for handling error
    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
            <h2>RQSuperHeroes Page</h2>
            {/* added for mutations */}
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="text"
                    value={alterEgo}
                    onChange={e => setAlterEgo(e.target.value)}
                />
                <button onClick={handleAddHeroClick}>Add Hero</button>
            </div>
            {/* added for useQuery on click */}
            <button onClick={refetch}>Fetch heroes</button>
            {/*  commented back for query by id*/}
            {/*  commented for data transformation */}
            {
                data?.data.map((hero) => {
                    return <div key={hero.id}>
                        <Link to={`/rq-super-heroes/${hero.id}`}>
                            {hero.name}
                        </Link>
                    </div>
                })
            }
            {/*  commented for query by id */}
            {/* {
                data.map((heroName) => {
                    return <div key={heroName}>{heroName}</div>
                })
            } */}
        </>
    )
}