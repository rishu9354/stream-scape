<template>
<h1>movies details</h1>
<div class="bg-zinc-900 grid grid-cols-1 md:grid-cols-3 gap-10 py-10 px-6 md:px-20 text-white">
    <!-- poster -->
     <div>
        <img  alt="movie-poster" class="rounded-xl w-full max-w-sm">
    </div>

    <!-- details -->
     <div class="md:col-span-2 flex flex-col gap-4">
        <h2 class="text-3xl font-semibold font-serif">Storyline</h2>
        <p class="text-zinc-300">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum dolor dicta, earum deserunt ea velit nam sapiente sit quasi est?</p>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <Detail label="Released" />
            <Detail label="Runtime"/>
            <Detail label="Budget" :value="formatCurrency()"/>
            <Detail label="Popularity"  />
            <Detail label="Language" />
            <Detail label="Vote"  />

        </div>

        <div class="mt-4">
            <h3 class="font-semibold mb-2">Genres</h3>
            <div class="flex gap-2 flex-wrap">
                <span class="px-3 py-1 bg-zinc-800 rounded-full text-sm cursor-default">
                    Genres name
                </span>
            </div>
        </div>

     </div>

    

</div>
</template>

<script setup>

function formatCurrency(amount){
    return "$" + Number(amount).toLocaleString();
}
function formatRuntime(mins){
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}h ${minutes}min`;
}
</script>