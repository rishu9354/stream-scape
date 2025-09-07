import axios from "axios";

export default defineNuxtPlugin(() => {
  const instance = axios.create({
    baseURL: 'https://backend-stream-scape-production.up.railway.app/', // backend url
    withCredentials: true //cookies ke liye
  })

  return {
    provide: { axios: instance }
  }
})

// backend url : https://backend-stream-scape.onrender.com/->render
// backend url: https://backend-stream-scape-production.up.railway.app/ ->railway.app

