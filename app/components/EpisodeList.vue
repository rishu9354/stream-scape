<template>
    <div class="mt-6 space-y-3">
        <div class="group relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 
                    bg-zinc-900/50 border border-zinc-800/50 
                    hover:bg-zinc-800 hover:border-amber-500/30 hover:shadow-lg hover:scale-[1.01]
                    animate-slide-in" v-for="(ep, index) in episodes" :key="index" @click="$emit('play', ep)"
            :style="{ animationDelay: `${index * 100}ms` }">


            <div class="hidden md:flex w-12 justify-center shrink-0">
                <span class="text-2xl font-bold text-zinc-700 group-hover:text-amber-500 transition-colors">
                    {{ (index + 1).toString().padStart(2, '0') }}
                </span>
            </div>
            <!-- numbers icon -->
            <div class="md:hidden flex w-8 justify-center shrink-0 text-zinc-500 group-hover:text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                    <path fill-rule="evenodd"
                        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.535 0 3.246l-11.54 6.348c-1.25.686-2.779-.217-2.779-1.643V5.653z"
                        clip-rule="evenodd" />
                </svg>
            </div>

            <div class="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>

                    <h4 class="text-base md:text-lg font-medium text-zinc-200 group-hover:text-white transition-colors">
                        {{ ep.title }}</h4>
                </div>

                <div class="flex items-center gap-4">

                    <p class="text-xs md:text-sm font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                        Duration: {{ ep.duration }}</p>

                        <!-- play icon -->
                    <div
                        class="hidden md:block opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 text-amber-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                            <path fill-rule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-slide-in{
    opacity: 0;
    animation: slideIn 0.5s ease-out forwards;
}

@keyframes slideIn {
    from{
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>

<script setup>
defineProps(['episodes'])
defineEmits(['play'])
</script>