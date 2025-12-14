// middleware
import { useAuthStore } from "~/stores/authStore";

export default defineNuxtRouteMiddleware((to) => {
    console.log("Middleware calling...");
    
   const authStore = useAuthStore();
   // if(process.server) return;
   const token = useCookie("token");
   // if token avaiable
  if (token.value) {
        // Agar store me state false hai, to usse true kar do (Refresh handling)
        if (!authStore.auth.isAuthenticated) {
            authStore.auth.isAuthenticated = true;
        }

        // Agar user already logged in hai aur Login/Signup page pe ja raha hai -> Redirect to Home
        if (to.path === '/login' || to.path === '/signup') {
            return navigateTo("/");
        }
        
        // Baki kisi bhi page pe jaane do
        return;
    }
   // Case 2: Agar Token NAHI hai (Not Authenticated)
    // Aur user login ya signup page pe nahi hai -> Redirect to Login
    if (to.path !== '/login' && to.path !== '/signup') {
        // Optional: Logout call kardo taaki store bhi clean ho jaye
        authStore.auth.isAuthenticated = false;
        return navigateTo("/login");
    }
})