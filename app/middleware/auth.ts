// middleware
export default defineNuxtRouteMiddleware((to) => {
   const auth = useAuth();
   // if(process.server) return;
   let token = useCookie<string | null>("token").value ?? null;
   if(!token && process.client){
      try {
         token = localStorage.getItem("token")
      } catch (error) {
         console.error("middleware token mein error:",error)   
      }   
   }
      if(token){
         auth.value.isAuthenticated= true;
         if(to.path === '/login') return navigateTo("/")
         return 
      } 

   // not authenticated
   if (to.path !== '/login') {
      return navigateTo("/login");
   }
})