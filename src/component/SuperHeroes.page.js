import axios from "axios"
import { useEffect, useState } from "react"

export const SuperHeroes = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    //added for handling error
    const [error, setError] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:4000/superheroes')
            //added for handling error
            // .get('http://localhost:4000/superheroesdafda')
            .then((response) => {
                setData(response.data)
                setIsLoading(false)
            })
            //added for handling error
            .catch((error) => {
                setError(error.message)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    //added for handling error
    if (error) {
        return <h2>{error}</h2>
    }

    return (
        <>
            <h2>SuperHeroes Page</h2>
            {
                data.map(hero => {
                    return <div key={hero.id}>{hero.name}</div>
                })
            }
        </>
    )
}