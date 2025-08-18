// middleware
export default defineNuxtRouteMiddleware(() => {
   const { value: auth } = useAuth();
   if (!auth.isAuthenticated) {
      return navigateTo("/login");
   }
})