<template>
    <div>
        <!-- <Banner :series-list="trendingSeries" :is-dynamic-page="false"/> -->
         <Slider :series-list="trendingSeries" :is-dynamic-page="false"/>
        <Trending />
    </div>
    
</template>

<script setup>
import { useContent } from '~/composables/useContent';


const {getLists} = useContent();
const trendingSeries = getLists();    

// console.log("TrendingSeries Jo home page se slider pe value send kar rha hai :",trendingSeries);



// SEO
useHead({
    title:'Home - StreamScape'
})
</script>

