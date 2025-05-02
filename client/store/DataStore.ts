import {create} from "zustand"; 
import instanceAxios from "../lib/axios";

instanceAxios.defaults.withCredentials = false
const useDataStore = create((set, get)=>({
    detectedIngredients: [],
    recipes: [],
    advice: [],


    handleData: async(file :File) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const result = await instanceAxios.post(`/get/data`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
            });
            set( {detectedIngredients : result.data.detectedIngredients} );
            set( {recipes : result.data.recipes} );
            set( {advice : result.data.advice} );
        } catch (error) {
            console.log(error);
        }
    },

}));

export default useDataStore;