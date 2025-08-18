<template>
    <div>
        <VideoPlayer />
    </div>
</template>

<script setup>
definePageMeta({
    layout:false,
    middleware:['auth']
})

</script>