// import axios from "axios";
import { defineStore } from "pinia";
import { useAuth } from '~/composables/state'



export const useAuthStore = defineStore('auth', () => {
    // state
    const auth = useAuth(); //global state
    const {$axios} = useNuxtApp(); //global state plugins
    const user = ref(null);
    const token = ref(null);

    // actions
    async function login(email:string, password:string) {
        try {
                const res = await $axios.post("/login",{email, password})
            

            if (res.status ==200 && res.data.success == true) {
                user.value = res.data.user;
                auth.value.isAuthenticated = true;
                token.value = res.data.token
                console.log(email,password);
                
                console.log("Backend se aaya hua msg: ",res.data.success)
                console.log("Backend se aaya hua msg: ",res.data.msg)

                localStorage.setItem("token",res.data.token);
            } else {
                alert("Invaild credentials");
                throw new Error('Invaild credentials');
            }
            // localStorage.setItem("user-info",JSON.stringify(res.data.user))
        }
        catch (err) {
            console.error('Login failed:', err)
            throw err
        }
    }

    async function signup(fullname:string,email:string, password:string){
        try{
                const res = await $axios.post("/create",{
                    fullname,
                    email,password
                });

            if (res.status == 200 && res.data.success == true) {
                user.value = res.data.user;
                auth.value.isAuthenticated = true;
                token.value = res.data.token
                console.log("Backend se aaya hua msg: ",res.data.success)

                localStorage.setItem("token",res.data.token);

                 console.warn("SignUp Done",res.data);
            } else {
                alert("Invaild credentials");
                // throw new Error('Invaild credentials');
            }
            // localStorage.setItem("user-info", JSON.stringify(res.data));
        }catch(err){
            console.error("Signup error:", err);
      throw err;
        }
    }

    function logout(){
        user.value = null;
        auth.value.isAuthenticated = false;
        token.value = null;
        localStorage.removeItem("token")
        console.log("User logged out");
        location.reload();        
    }


    return { auth, login, user ,logout,signup,token}
})
