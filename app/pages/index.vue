<template>
    <div>
        <!-- <Banner :series-list="trendingSeries" :is-dynamic-page="false"/> -->
         <Slider :series-list="trendingSeries" :is-dynamic-page="false"/>
        <Trending />
    </div>
    
</template>

<script setup>
// using server/api to get web series name
const { data: trendingSeries } = await useFetch("/api/lists",{baseURL:'/api'});


// SEO
useHead({
    title:'Home - StreamScape'
})
</script>

