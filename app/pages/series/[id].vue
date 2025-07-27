<template>
    <Banner :is-dynamic-page="true"/>
    <div>
        <MovieDetails/>
    </div>
    
</template>

<script setup>
const route = useRoute();
const id = route.params.id;

</script>