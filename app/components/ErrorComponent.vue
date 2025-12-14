<template>
    <!-- main container -->
    <div class="flex flex-col items-center justify-center min-h-screen  text-white p-6">
        <div class="max-w-md w-full text-center">

            <!-- 404 img -->
            <div class="mb-8">
                <!-- img -->
                <img src="/images/not-found.png" alt="404 Error: Lost in the Stream-Scape"
                    class="w-full h-auto rounded-xl object-cover">

            </div>

            <!-- Error Message -->
            <h1 class="text-6xl md:text-8xl font-extrabold text-yellow-600 mb-4">
                404
            </h1>
            <h2 class="text-3xl font-semibold mb-6 text-gray-600">
                Stream Not Found
            </h2>
            <p class="text-lg text-zinc-500 mb-8">
                Oops! Looks like the title you were looking for got lost in the vast stream-scape universe. Let's get
                you back to the main menu.
            </p>

            <!-- Call to Action (Button to go home) -->
            <!-- We use handleError() function to clear the error state and redirect -->
            <button @click="handleError"
                class="inline-block px-8 py-3 text-lg font-bold text-black bg-yellow-600 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 transform hover:scale-105">
                Go Back To Home Base
            </button>

        </div>
    </div>

</template>

<script setup>

</script>