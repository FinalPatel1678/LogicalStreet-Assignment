import axios from "axios"

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

export const searchPhrases = async (query: string, sort: string, order: "ASC" | "DESC", status?: string) => {
  try {
    const response = await apiClient.get("/phrase/search", {
      params: {
        query,
        sort,
        order,
        status
      }
    })
    return response.data
  } catch (error) {
    console.error("Error fetching phrases:", error)
    throw error
  }
}
