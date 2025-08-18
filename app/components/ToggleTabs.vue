<template>
    <div class="flex gap-4 mt-6">
        <button class="px-4 py-2 rounded bg-zinc-800" :class="{'bg-blue-600': selected ==='storyline'}" @click="$emit('update:selected', 'storyline')">Storyline</button>
        <button class="px-4 py-2 rounded bg-zinc-800"
      :class="{ 'bg-blue-600': selected === 'episodes' }"
      @click="$emit('update:selected', 'episodes')">Episodes</button>
    </div>
</template>

<script setup>
defineProps(['selected'])
defineEmits(['update:selected'])
</script>