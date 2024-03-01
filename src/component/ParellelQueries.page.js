//added for parallel queries

import axios from "axios"
import { useQuery } from "react-query"


const fetchSuperheroes = () => {
    return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = () => {
    return axios.get('http://localhost:4000/friends')
}


export const ParallelQueriesPage = () => {
    const { data: superheroes } = useQuery('super-heroes', fetchSuperheroes)
    const { data: friends } = useQuery('friends', fetchFriends)
    console.log(superheroes, friends)
    return <div>ParallelQueriesPage</div>
}