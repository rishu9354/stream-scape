<template>
<section class="relative w-full h-[30vh] md:h-[80vh] lg:h-[95vh] bg-black text-white overflow-hidden">
    <img :src="`/images/cover/${selectedSeries}.jpg`" alt="cover-img" class="absolute inset-0 w-full h-full object-cover object-center">
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent md:from-black md:via-black/40 md:to-transparent"></div>

</section>
</template>

<script setup>
// import { useMovieStore } from '~/stores/movieStore';

const route = useRoute();

const props = defineProps({
    seriesList:Array,
    isDynamicPage:Boolean,
    
})

const selectedSeries = computed(()=>{
    // if coming from [name].vue
    if(props.isDynamicPage && route.params.name){
        return route.params.name.replaceAll("-", "");
    } 

    // if coming from home page
    if(props.seriesList && props.seriesList.length > 0){
        const randomIndex = Math.floor(Math.random() * props.seriesList.length);
        return props.seriesList[randomIndex].replaceAll("-","");
    }
    return "Featured Series";   
});

const slug = computed(() => route.params.name || selectedSeries.value);
console.log(route.params.name,"Slider img");

</script>