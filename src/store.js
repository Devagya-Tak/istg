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
            const res = await axios.post('https://devagya02.pythonanywhere.com/login/', {
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
    }
    
}));

export const useQuestionStore = create((set) => ({
    questions: [],
    getQuestions: async (id) => {
        const res = await axios.get(`https://devagya02.pythonanywhere.com/get/${id}/`)
        console.log(res.data)
        set({ questions: res.data })
    },
    postQuestion: async (id, question) => {
        const res = await axios.post(`https://devagya02.pythonanywhere.com/post/${id}/`, {
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
