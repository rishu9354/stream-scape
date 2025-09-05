import axios from "axios";

export default defineNuxtPlugin(() => {
  const instance = axios.create({
    baseURL: 'http://localhost:3001', // backend url
    withCredentials: true //cookies ke liye
  })

  return {
    provide: { axios: instance }
  }
})