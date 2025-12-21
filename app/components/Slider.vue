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
    seriesList:{
    type: Object,
    default: () => []
  },
    isDynamicPage:Boolean,
    
})

const selectedSeries = ref('');

onMounted(()=>{
    if(props.isDynamicPage && route.params.name){
        selectedSeries.value =  route.params.name;
        return;
    } 

    // if coming from home page
    if(props.seriesList.length > 0){
        const randomIndex = Math.floor(Math.random() * props.seriesList.length);
        selectedSeries.value =  props.seriesList[randomIndex];
        console.log("Slider value: ",selectedSeries.value)
    }

})



// const slug = computed(() => route.params.name || selectedSeries.value);
// console.log(slug,"Slider img");

</script>