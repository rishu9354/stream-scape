<template>
<div>
    <h4 class="text-sm text-zinc-400">{{ label }}</h4>
    <p class="text-base font-medium">{{ value }}</p>
</div>

</template>

<script setup>
const props = defineProps({
    label:String,
    value:String,
})
</script>