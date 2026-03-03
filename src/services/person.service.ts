import axios from "axios"
import { Person } from "../models/person.model"
import type { inPersonBalanceDTO } from "../common/DTOs/personBalanceDTO"

const API_URL = "https://localhost:7001/api/Person"

export const personService = {
  // Buscar todos
  async getAll() {
    const { data } = await axios.get(API_URL) as { data: any[] }
    if (!data) return []

    return data.map((item: any) => new Person(item.id, item.name, new Date(item.birthday)))
  },
  // Buscar por ID
  async getById(id: string) {
    const { data } = await axios.get(`${API_URL}/${id}`)
    return new Person(data.id, data.name, new Date(data.birthday))
  },
  // Criar
  async create(person: { name: string, birthday: Date }) {
    const { data } = await axios.post(API_URL, person)
    return data
  },
  // Editar
  async update(id: string, person: { name: string, birthday: Date }) {
    const { data } = await axios.put(`${API_URL}/${id}`, person)
    return data
  },
  // Deletar
  async delete(id: string) {
    await axios.delete(`${API_URL}/${id}`)
  },
  async getBalance(): Promise<inPersonBalanceDTO[]> {
    const { data } = await axios.get(`${API_URL}/report-transaction`)
    return data as inPersonBalanceDTO[]
  }
}
