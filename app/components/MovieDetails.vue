<template>

    <div class="min-h-screen bg-neutral-950 text-white py-12 px-6 md:px-16">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
            <!-- poster -->
            <div class="lg:col-span-4 flex justify-center lg:justify-start">
                <div class="relative group w-full max-w-sm mx-auto">
                    <img alt="movie-poster"
                        class="rounded-xl shadow-black/50 object-cover border border-zinc-800 group-hover:scale-[1.02] transition-transform duration-500"
                        :src="movieData.poster">
                    <div class="absolute -bottom-4 inset-x-4 h-4 bg-black/50 blur-xl rounded-[50%]"></div>
                </div>
            </div>

            <div class="lg:col-span-8 flex flex-col gap-6">
                <div class="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur py-2 border-b border-zinc-800">
                    <ToggleTabs v-model:selected="selectedTab" />

                </div>
                <Transition name="fade" mode="out-in">
                    <div class="space-y-8 animate-in" v-if="selectedTab === 'storyline'">
                        <div>
                            <h2 class="text-3xl font-bold font-serif md:text-4xl text-amber-500 mb-4">Storyline</h2>
                            <p class="text-zinc-300 leading-loose text-lg font-light">{{ movieData.storyline }}</p>
                        </div>

                        <div class="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50">
                            <Detail label="Released" :value="movieData.released" />
                            <Detail label="Runtime" :value="movieData.runtime" />
                            <Detail label="Budget" :value="movieData.budget" />
                            <Detail label="Popularity" :value="movieData.popularity" />
                            <Detail label="Language" :value="movieData.language" />
                            <Detail label="Rating" :value="`⭐ ${movieData.vote}`" highlight />
                    
                        </div>

                        <div>
                            <h3 class="font-bold text-zinc-500 uppercase text-xs tracking-widest mb-3">Genres</h3>
                            <div class="flex gap-2 flex-wrap">
                                <span class="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 rounded-full text-sm cursor-default transition-colors"
                                    v-for="genre in movieData.genres" :key="genre">
                                    {{ genre }}
                                </span>
                            </div>
                        </div>
                    </div>


                    <div class="animate-in" v-else-if="selectedTab === 'episodes'">
                        <EpisodeList :episodes="movieData.episodes" @play="goToPlayer" />
                        <!-- <VideoPlayer v-if="currentEp" :current="currentEp" :episodes="movie.episodes" @update:current="currentEp = $event" /> -->
                    </div>
                </Transition>
            </div>

        </div>

    </div>

</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from{
    opacity: 0;
    transform: translateY(10px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>

<script setup>
// import { movieData } from '~/data/movieData';
import { useMovieStore } from '~/stores/movieStore';
const route = useRoute();
const router = useRouter();
const slug = route.params.name;
const getMovieData = useMovieStore();
const { movie, currentEp } = storeToRefs(getMovieData);
const movieData = movie;
console.log("movie details:", movieData.title)


const selectedTab = ref('storyline');
// const currentEp = ref(movie.episodes?.[0] || null);

// function formatCurrency(amount) {
//     return "$" + Number(amount).toLocaleString();
// }
function formatRuntime(mins) {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}h ${minutes}min`;
}

function goToPlayer(ep) {
    router.push({
        name: 'player',
        query: {
            movie: slug,
            ep: ep.video_url,
            ep: ep.title
        }
    })
    console.log("episode click:", ep.title);

}
onMounted(() => {
    getMovieData.fetchMovie(slug)
})

</script>