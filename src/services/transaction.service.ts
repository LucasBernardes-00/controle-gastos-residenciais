import axios from "axios"
import { Category } from "../models/category.model"
import { Person } from "../models/person.model"
import { eTransactionType, Transaction } from "../models/transaction.model"

const API_URL = "https://localhost:7001/api/Transaction"

export interface inTransactionRequest {
  id: string
  description: string
  amount: number
  type: eTransactionType
  categoryId: string
  personId: string
}

export const transactionService = {
  async getAll(): Promise<Transaction[]> {
    const { data } = await axios.get(API_URL) as { data: any[] }
    if (!data) return []

    return data.map((item: any) => new Transaction(
      item.id,
      item.description,
      item.amount,
      item.type,
      new Category(item.category.id, item.category.description, item.category.goal),
      new Person(item.person.id, item.person.name, new Date(item.person.birthday))
    ))
  },
  async getById(id: string): Promise<Transaction | null> {
    const { data } = await axios.get(`${API_URL}/${id}`) as { data: any }
    if (!data) return null

    return new Transaction(
      data.id,
      data.description,
      data.amount,
      data.type,
      new Category(data.category.id, data.category.description, data.category.goal),
      new Person(data.person.id, data.person.name, new Date(data.person.birthday))
    )
  },
  async save(transaction: inTransactionRequest) {
    const { data } = await axios.post(API_URL, transaction) as { data: any }
    return data
  },
  async update(id: string, transaction: inTransactionRequest) {
    const { data } = await axios.put(`${API_URL}/${id}`, transaction)
    return data
  },
  async delete(id: string): Promise<boolean> {
    const { data } = await axios.delete(`${API_URL}/${id}`) as { data: any }
    return data
  }
}