import { defineStore } from "pinia";


export const useMovieStore = defineStore('mdata',() =>{
    // state
    const { $axios } = useNuxtApp(); //global state plugins
    const movies = ref([]);
    const movie = ref({
    title: "Not Found",
    poster: "/images/placeholder.jpg",
    storyline: "This movie does not exist in the hardcoded list.",
    released: "N/A",
    runtime: 0,
    budget: 0,
    popularity: 0,
    language: "Unknown",
    vote: 0,
    genres: [],
    reviews: 0,
    episodes: []
    })
    const currentEp = ref(null)
    // actions
    async function fetchMovie(title){
        try {
            const res = await $axios.get(`/video/movie/${encodeURIComponent(title)}`);
            if(!res || !res.data) throw new Error("Failed to fetch movie!");

            // console.log("Movie data from backend :",res.data)
            movie.value = res.data.data || res.data;
            // console.log("Movie.value",movie.value);
            
            currentEp.value = res.data.episodes?.[0] || null;

        } catch (error) {
            console.error("Error in fetching movie:",error);
        }
    }

    async function movieList() {
        try {
            const res = await $axios.get(`/video/`);
            if(!res || !res.data) throw new Error("Failed to fetch movie!");
            // console.log("Movie list from backend :",res.data)
            movies.value = res.data?.data || res.data;
            // console.log("MovieList.value",movies.value);
        } catch (error) {
            console.error("Error in fetching movie:",error);
            
        }
    }

    return {fetchMovie, movie, currentEp, movieList,movies}
})

