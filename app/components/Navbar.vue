<template>
        <nav class="py-3 px-4 md:px-20 bg-zinc-900 text-white">
           <div class="flex justify-between items-center">
            <!-- brand name -->
               <NuxtLink to="">
               <!-- <h1 class="text-3xl font-extralight text-red-500">LOGO</h1> -->
                <img src="/images/logo.png" alt="logo" class="size-16">
           </NuxtLink>

           <!-- humburger menu btn -->
            <!-- <button class="md:hidden" @click="isOpen =!isOpen">
                <Icon :icon="isOpen ? 'mdi:close' : 'mdi:menu'" width="28" height="28"/>
            </button> -->
       <!-- desktop menu -->
        <div class="hidden md:flex space-x-12 items-center">
            <a href="/" class="nav-link">Home</a>
            <a href="" class="nav-link">Tv Shows</a>
            <a href="" class="nav-link">Movies</a>
            <a href="" class="nav-link">My List</a>
            <input type="search" name="inputSearch" class="text-white px-3 py-2 bg-zinc-800 rounded-3xl" placeholder="Search">
            <span class="px-3 py-2 bg-zinc-700 rounded-full">
                <button type="button">Profile</button>
            </span>
        </div>
           </div>

           <!-- mobile view -->
            <!-- <div class="flex flex-col space-y-4 mt-6 md:hidden" v-if="isOpen">
                <a href="#about" class="nav-link" @click="isOpen = false">About Me</a>
      <a href="#skills" class="nav-link" @click="isOpen = false">Work</a>
      <a href="#experince" class="nav-link" @click="isOpen = false">Experience</a>
      <a href="#testimonial" class="nav-link" @click="isOpen = false">Testimonial</a>
      <NuxtLink to="/contact" class="flex rounded-3xl bg-black text-white py-3 px-4 text-xl justify-between w-max" @click="isOpen = false">
        Get in touch
        <Icon icon="mdi:arrow-top-right-thin" width="24" height="24" class="rounded-full bg-white text-black ml-2"/>
      </NuxtLink>
            </div> -->
    </nav>

</template>