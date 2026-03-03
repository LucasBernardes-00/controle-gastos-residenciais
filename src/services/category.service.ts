import axios from "axios"
import { Category, eGoal } from "../models/category.model"
import type { inCategoryBalanceDTO } from "../common/DTOs/categoryBalanceDTO"

const API_URL = "https://localhost:7001/api/Category"

export const categoryService = {
  async getAll() {
    const { data } = await axios.get(API_URL) as { data: any[] }
    if (!data) return []
    return data.map((item) => new Category(item.id, item.description, item.goal))
  },
  async getById(id: string) {
    const { data } = await axios.get(`${API_URL}/${id}`) as { data: any }
    return new Category(data.id, data.description, data.goal)
  },
  async create(category: { description: string, goal: eGoal }) {
    const { data } = await axios.post(API_URL, category)
    return data
  },
  async update(id: string, category: { description: string, goal: eGoal }) {
    const { data } = await axios.put(`${API_URL}/${id}`, category)
    return data
  },
  async delete(id: string) {
    const { data } = await axios.delete(`${API_URL}/${id}`)
    return data
  },
  async getBalance(): Promise<inCategoryBalanceDTO[]> {
    const { data } = await axios.get(`${API_URL}/report-transaction`)
    return data as inCategoryBalanceDTO[]
  }
}
