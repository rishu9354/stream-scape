<template>
 
  <div
    class="relative w-full min-h-screen bg-black text-white font-sans overflow-hidden"
  >
    <!-- intro loader -->
    <Transition name="fade-out">
      <div
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        v-if="showIntro"
      >
        <div class="flex flex-col items-center">
          <img
            src="/images/logo.png"
            alt="Loading..."
            class="w-32 md:w-48 object-contain animate-zoom-in"
          />
          <div class="mt-8 flex gap-2">
            <span
              class="w-3 h-3 bg-red-600 rounded-full animate-bounce delay-75"
            ></span>
            <span
              class="w-3 h-3 bg-red-600 rounded-full animate-bounce delay-150"
            ></span>
            <span
              class="w-3 h-3 bg-red-600 rounded-full animate-bounce delay-300"
            ></span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- <div class="bg-gradient-to-b from-zinc-900 to-red-800 backdrop-blur-md rounded-2xl shadow-2xl flex overflow-hidden max-w-4xl w-full"> -->
    <!-- flex items-center justify-center w-full md:w-1/2 bg-gradient-to-b from-zinc-900 to-red-800 p-6 -->
    <!-- background -->
    <div class="absolute inset-0 z-0">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/IN-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="background"
        class="w-full h-full object-cover opacity-50 scale-105"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40"
      ></div>
    </div>

    <header
      class="top-0 left-0 absolute p-6 z-10 w-full flex justify-between items-center"
    >
      <img
        src="/images/logo.png"
        alt="logo"
        class="h-8 md:h-12 object-contain"
      />
    </header>

    <div
      class="relative z-10 flex items-center justify-center min-h-screen px-4 animate-fade-up"
      v-if="!showIntro"
    >
      <div
        class="w-full max-w-md bg-black/70 backdrop-blur-sm p-8 md:p-16 rounded-xl border border-white/10 shadow-2xl"
      >
        <h2 class="text-3xl font-bold mb-8 text-white">
          {{ isLogin ? "Sign In" : "Sign Up" }}
        </h2>

        <!-- error msg ke liye -->

        <div
          v-if="errorMsg"
          class="mb-4 p-3 bg-orange-500/20 border border-orange-500 rounded text-orange-200 text-sm flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clip-rule="evenodd"
            />
          </svg>
          {{ errorMsg }}
        </div>

        <!-- form -->
        <form class="space-y-5" @submit.prevent="onSubmit">
          <div class="relative group" v-if="!isLogin">
            <input
              type="text"
              id="fname"
              v-model="form.fullname"
              class="block rounded px-4 pb-2.5 pt-5 w-full text-white bg-zinc-800 border-0 border-b-2 border-transparent focus:border-red-600 focus:ring-0 focus:bg-zinc-700 peer transition-all"
              placeholder=" "
            />
            <label
              for="fname"
              class="absolute text-zinc-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Full Name
            </label>
          </div>

          <div class="relative group">
            <input
              type="email"
              id="email"
              v-model="form.email"
              placeholder=" "
              class="block rounded px-4 pb-2.5 pt-5 w-full text-white bg-zinc-800 border-0 border-b-2 border-transparent focus:border-red-600 focus:ring-0 focus:bg-zinc-700 peer transition-all"
            />
            <label
              for="email"
              class="absolute text-zinc-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Email Address
            </label>
          </div>

          <div class="relative group">
            <input
              type="password"
              id="password"
              v-model="form.password"
              placeholder=" "
              class="block rounded px-4 pb-2.5 pt-5 w-full text-white bg-zinc-800 border-0 border-b-2 border-transparent focus:border-red-600 focus:ring-0 focus:bg-zinc-700 peer transition-all"
            />
            <label
              for="password"
              class="absolute text-zinc-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Password
            </label>
          </div>

          <!-- toggle btn -->
          <button
            type="submit"
            class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded transition duration-300 mt-4 active:scale-95"
          >
            {{ isLogin ? "Sign In" : "Sign Up" }}
          </button>
        </form>

        <div class="mt-8 text-zinc-400 text-sm md:text-base cursor-default">
          {{ isLogin ? "New to StreamScape?" : "Already have an account?" }}
          <button
            @click="isLogin = !isLogin"
            class="text-white hover:underline font-medium ml-1 cursor-pointer"
          >
            {{ isLogin ? "Sign up now." : "Login here." }}
          </button>
        </div>

        <!-- <div class="mt-6 text-xs text-zinc-500 leading-tight">
                    This page is protected by Google reCAPTCHA to ensure you're not a bot.
                </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "~/composables/state";
import { useAuthStore } from "~/stores/authStore";

const router = useRouter();
const auth = useAuth();
const logic = useAuthStore();

// ui state
const showIntro = ref(true);
const isLogin = ref(true);
const errorMsg = ref("");

const form = reactive({
  email: "",
  password: "",
  fullname: "",
});

// intro loader logic
onMounted(() => {
  // 2.5 sec ka delay
  setTimeout(() => {
    showIntro.value = false;
  }, 2500);
});

async function onSubmit() {
  errorMsg.value = "";
  showIntro.value = true;
  try {
    if (isLogin.value) {
      await logic.login(form.email, form.password);
     
    } else {
      await logic.signup(form.fullname, form.email, form.password);
      
      // await logic.login(form.email, form.password);
    }

    auth.value.isAuthenticated = true;
    showIntro.value = false;
    await nextTick();
    router.replace("/");
  } catch (err) {
    showIntro.value = false;
    console.error("Login script pe error:", err);
    // Error ko UI pe show ke liye logic:
    errorMsg.value = err.message || "Invalid credentials. Please try again.";
  }
}

// SEO
useHead({
  title: () =>
    isLogin.value ? "Login - StreamScape" : "Sign Up - StreamScape",
});
</script>

<style scoped>
.fade-out-leave-active {
  transition: opacity 0.8s ease;
}

.fade-out-leave-to {
  opacity: 0;
}

.animate-fade-up {
  animation: fadeUp 0.8s ease-out forwards;
  opacity: 0;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-zoom-in {
  animation: zoomIn 2.5s ease-in-out infinite alternate;
}

@keyframes zoomIn {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }

  100% {
    transform: scale(1.1);
    opacity: 1;
  }
}
</style>
