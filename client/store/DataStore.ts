import { create } from "zustand"
import instanceAxios from "../lib/axios"

instanceAxios.defaults.withCredentials = false
const useDataStore = create((set, get) => ({
  detectedIngredients: [],
  recipes: [],
  advice: [],
  compostData: null,
  handleData: async (file: File, mode: any) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const result = await instanceAxios.post(`/get/data?mode=${mode}`, formData)
      set({ detectedIngredients: result.data.detectedIngredients })
      set({ recipes: result.data.recipes })
      set({ advice: result.data.advice })

      if (mode === "leftovers") {
        set({ compostData: result.data.compostData })
      }
    } catch (error) {
      console.log(error)
    }
  },
}))

export default useDataStore
