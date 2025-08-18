<template>
    <div class="mt-6 space-y-4">
        <div class="p-4 bg-zinc-800 rounded cursor-pointer hover:bg-zinc-700" v-for="(ep,index) in episodes" :key="index" @click="$emit('play',ep)">
            <h4 class="text-lg font-semibold">{{ ep.title }}</h4>
            <p class="text-sm text-zinc-400">Duration: {{ ep.duration }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps(['episodes'])
defineEmits(['play'])
</script>