// middleware
import { useAuthStore } from "~/stores/authStore";
export default defineNuxtRouteMiddleware((to) => {
   const authStore = useAuthStore();
   // if(process.server) return;
   let token = useCookie("token").value;
   if(token){
      authStore.auth.isAuthenticated= true;
      if(to.path === '/login' || to.path ==='/signup'){
         return navigateTo("/")
      } 
      return 
    
   }
       
   // not authenticated
   if (to.path !== '/login') {
      return navigateTo("/login");
   }
})