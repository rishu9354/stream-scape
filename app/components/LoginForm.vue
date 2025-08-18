<template>  
    <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-zinc-900 to-red-800">
        <div class="bg-gradient-to-b from-zinc-900 to-red-800 backdrop-blur-md rounded-2xl shadow-2xl flex overflow-hidden max-w-4xl w-full">
            
            <!-- left img -->
            <div class="flex items-center justify-center w-full md:w-1/2 bg-gradient-to-b from-zinc-900 to-red-800 p-6">
                <img src="/images/logo.png" alt="login-pic" class="w-96 h-auto object-contain">
            </div>

            <!-- toggle btn -->
             <button @click="isLogin = !isLogin" class="absolute top-1/2 left-96 -translate-y-1/2 
               w-16 h-16 rounded-full bg-zinc-900 
               flex items-center justify-center text-white text-xl font-semibold shadow-lg hover:scale-105 transition"">
                {{ isLogin ? 'Sign' : 'LogIn' }}
             </button>

             <!-- right form -->
            
            <div class="w-full md:w-1/2 p-8">
                <h2 class="text-3xl font-bold text-center text-zinc-300 mb-8 font-serif">
                    {{ isLogin ? 'Login to your Account' : 'Create a New Account' }}
                </h2>

                <!-- error handling if users are not present -->
                 <div v-if="_error"><p class="bg-red-500 text-red-200 text-sm p-3">{{ _error }}</p></div>
                <form @submit.prevent="onSubmit" class="space-y-6">
                    <div v-if="!isLogin">
                        <label for="fname" class="block text-lg text-zinc-200 mb-1 font-serif">Full Name</label> 
                        <input type="text" name="fname" placeholder="Enter your Full Name"
                        class="w-full px-4 py-2 border-1 border-black rounded-lg focus:ring-2 focus:ring-red-800 focus:outline-none text-white" v-model="form.fullname">

                    </div>

                    <div>
                        <label for="email" class="block text-lg text-zinc-200 mb-1 font-serif">Email Id</label> 
                        <input type="text" name="email" placeholder="Enter your Email Id"
                        class="w-full px-4 py-2 border-1 border-black rounded-lg focus:ring-2 focus:ring-red-800 focus:outline-none text-white" v-model="form.email">

                    </div>
                    <div>   
                        <label for="password" class="block text-lg text-zinc-200 mb-1 font-serif">Password</label>
                     <input type="password" name="password" placeholder="Enter your Password"
                     class="w-full px-4 py-2 border-1 border-black rounded-lg focus:ring-2 focus:ring-red-700 focus:outline-none text-white" v-model="form.password">
                        
                    </div>
                    <button type="submit"
                        class="w-full bg-zinc-900 text-white py-2 rounded-lg hover:bg-zinc-950 transition duration-300 font-semibold mt-7">
                       {{ isLogin ? 'Login' : 'Sign Up' }}
                        </button>
                </form>
            </div>

        </div>
    </div>
</template>

<script setup>

import { useAuth } from '~/composables/state';
import { useAuthStore } from '~/stores/authStore';
const router = useRouter();
const auth = useAuth();
const logic = useAuthStore();

const isLogin = ref(true)
const form = reactive({
    email:"",
    password:"",
    fullname:""
})

async function onSubmit(){
    try{
if(isLogin.value){
       await logic.login(form.email,form.password)
        
    }
    else if(!isLogin.value){
        await logic.signup(form.fullname,form.email, form.password);
        
    }
    router.push('/')

    }catch(err){
        console.error(err)
    }
    
    auth.value.isAuthenticated = true;
}




useHead({
    title:isLogin.value ? 'Login' : 'Sign Up'
})
</script>