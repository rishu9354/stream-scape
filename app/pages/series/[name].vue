<template>
    <Banner :is-dynamic-page="true"/>
    <div>
        <MovieDetails/>
    </div>
    
</template>

<script setup>
definePageMeta({
    middleware:['auth']
})

</script>