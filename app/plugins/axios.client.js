import axios from "axios";

export default defineNuxtPlugin(() => {
  const instance = axios.create({
    baseURL: 'https://backend-stream-scape.onrender.com/', // backend url
    withCredentials: true //cookies ke liye
  })

  return {
    provide: { axios: instance }
  }
})