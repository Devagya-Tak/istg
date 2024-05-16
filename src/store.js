import { create } from "zustand";
import axios from "axios";
// import InstaDP from "instadp";

export const useLoginStore = create((set) => ({
    username: localStorage.getItem("username") || null,
    id: localStorage.getItem("id") || null,
    pfpURL: localStorage.getItem("pfpURL") || null,
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
    handleLogin: async (username) => {
        try {
            const res = await axios.post('https://1f4e5fe2-c348-4984-aaba-cdedc6b19e30-00-207iuccia4dae.pike.replit.dev/login/', {
                username: username
            });
            localStorage.setItem("username", username);
            localStorage.setItem("id", res.data.id); // Replace "user_id_here" with the actual user ID
            localStorage.setItem("isLoggedIn", true);
            set({ id: res.data.id, isLoggedIn: true, username: username });
            console.log(`${res.data.id} ${username}`);
        } catch (err) {
            console.log("An error occurred:", err);
        }
    },
    getPfp: async (username) => {
        const options = {
            method: 'POST',
            url: 'https://rocketapi-for-instagram.p.rapidapi.com/instagram/search',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': '6663f9f1b8msh91449d657922108p11c1c2jsn1ea0c072d3ba',
              'X-RapidAPI-Host': 'rocketapi-for-instagram.p.rapidapi.com'
            },
            data: {query: username}
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data.response.body.users[0].user.profile_pic_url);
              localStorage.setItem("pfpURL", response.data.response.body.users[0].user.profile_pic_url);
              set({ pfpURL:  response.data.response.body.users[0].user.profile_pic_url})
          } catch (error) {
              console.error(error);
          }

    }
}));

export const useQuestionStore = create((set) => ({
    questions: [],
    getQuestions: async (id) => {
        const res = await axios.get(`https://1f4e5fe2-c348-4984-aaba-cdedc6b19e30-00-207iuccia4dae.pike.replit.dev/get/${id}/`)
        console.log(res.data)
        set({ questions: res.data })
    },
    postQuestion: async (id, question) => {
        const res = await axios.post(`https://1f4e5fe2-c348-4984-aaba-cdedc6b19e30-00-207iuccia4dae.pike.replit.dev/post/${id}/`, {
            question: question
        })
        console.log(res.data)
    }
}))

export const useChitthiStore = create((set) => ({
    clickedImageIds: JSON.parse(localStorage.getItem('clickedImageIds')) || [],

    addClickedImageId: (id) => {
        set((state) => {
            const updatedClickedImageIds = [...state.clickedImageIds, id];
            localStorage.setItem('clickedImageIds', JSON.stringify(updatedClickedImageIds));
            return { clickedImageIds: updatedClickedImageIds };
        });
    }
}));
