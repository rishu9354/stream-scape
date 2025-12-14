// import axios from "axios";
import { defineStore } from "pinia";
import { useAuth } from '~/composables/state'



export const useAuthStore = defineStore('auth', () => {
    // state
    const auth = useAuth(); //global state
    const { $axios } = useNuxtApp(); //global state plugins
    const user = ref(null);
    const fname = ref('');
  const token = useCookie('token', {
    maxAge: 60 * 60 * 24 * 7, // 1 week tak valid rahega
    path: '/',                 // <--- YEH SABSE ZAROORI HAI (Isse cookie poori app me dikhegi)
    // secure: true,           // Agar https use kar rahe ho to uncomment kar dena
    // sameSite: 'lax'
});

    // actions
    async function login(email, password) {
        try {
            const res = await $axios.post("/auth/login", { email, password })


            if (res.status === 200 && res.data.success === true) {
                user.value = res.data.user;
                token.value = res.data.token
                this.auth.isAuthenticated = true;

                if (process.client) localStorage.setItem("token", res.data.token);

                fname.value = res.data.user.fullname;
                // console.log("Backend se aaya hua success msg: ", res.data.success)
                // console.log("Backend se aaya hua msg: ", res.data.msg)
                return true;

                // localStorage.setItem("token",res.data.token);
            } else {
                // alert("Invaild credentials");
                throw new Error('Invaild credentials');
            }
            // localStorage.setItem("user-info",JSON.stringify(res.data.user))
        }
        catch (err) {
            console.error('Login failed:', err)
            throw err
        }
    }

    async function signup(fullname, email, password) {
        try {
            const res = await $axios.post("/auth/signup", {
                fullname,
                email,
                password
            });

            if (res.status === 200 && res.data.success === true) {
                user.value = res.data.user;
                token.value = res.data.token
                this.auth.isAuthenticated = true;

                if (process.client) localStorage.setItem("token", res.data.token);
                fname.value = res.data.user.fullname;



                // console.log("Backend se aaya hua msg: ", res.data.success)

                // localStorage.setItem("token",res.data.token);

                // console.warn("SignUp Done", res.data);
                return true;
            } else {
                // alert("Invaild credentials");
                throw new Error('Invaild credentials');
            }
            // localStorage.setItem("user-info", JSON.stringify(res.data));
        } catch (err) {
            console.error("Signup error:", err);
            throw err;
        }
    }

    function logout() {
        user.value = null;
        token.value = null;
        auth.value.isAuthenticated = false;
        if (process.client) localStorage.removeItem('token')

        // (optional, agar cookie use kar rahe ho)
        const c = useCookie('token')
        c.value = null

        console.log('User logged out')


    }


    return { auth, login, user, logout, signup, token,fname }
})

