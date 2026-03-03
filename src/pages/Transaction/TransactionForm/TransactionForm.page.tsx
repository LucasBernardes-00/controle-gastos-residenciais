import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useErrorModal } from "../../../common/components/error.component"
import type { Category } from "../../../models/category.model"
import type { Person } from "../../../models/person.model"
import { eTransactionType } from "../../../models/transaction.model"
import { categoryService } from "../../../services/category.service"
import { personService } from "../../../services/person.service"
import { transactionService, type inTransactionRequest } from "../../../services/transaction.service"
import "./TransactionForm.page.css"

export const transactionTypeMapper: Record<string, eTransactionType> = {
  "DESPESA": eTransactionType.DESPESA,
  "RECEITA": eTransactionType.RECEITA
}

export function TransactionFormPage() {
  const { showErrors } = useErrorModal()
  const [categories, setCategories] = useState<Category[]>([])
  const [persons, setPersons] = useState<Person[]>([])
   let id: string | undefined = useParams().id
  const navigate = useNavigate()

  const [formData, setFormData] = useState<inTransactionRequest>({
    id: "",
    description: "",
    amount: 0,
    type: eTransactionType.DESPESA,
    categoryId: "",
    personId: ""
  })

  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const [categoriesData, personsData] = await Promise.all([
          categoryService.getAll(),
          personService.getAll()
        ])
        setCategories(categoriesData)
        setPersons(personsData)
      } catch (error: any) {
        showErrors(error.response.data.errors)
      }
    }

    const fetchTransaction = async () => {
      if (id) {
        try {
          const result = await transactionService.getById(id)
          if (result) {
            setFormData({
              id: result.Id,
              description: result.Description,
              amount: result.Amount,
              type: transactionTypeMapper[result.Type] || eTransactionType.DESPESA,
              categoryId: result.Category.Id,
              personId: result.Person.Id
            })
          }
        } catch (error: any) {
          id = undefined;
          showErrors(error.response.data.errors)
        }
      }
    }

    fetchDependencies()
    fetchTransaction()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    let newValue: any = value
    if (name === "amount" || name === "type") {
      newValue = Number(value)
    }

    setFormData(prev => ({ ...prev, [name]: newValue }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (id) {
        await transactionService.update(id, formData)
      } else {
        await transactionService.save(formData)
      }
      navigate('/transaction')
    } catch (error: any) {
      showErrors(error.response.data.errors)
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">{id ? "Editar Transação" : "Nova Transação"}</h1>

      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Valor (R$)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Tipo</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange}>
            <option value={eTransactionType.DESPESA}>Despesa 💸</option>
            <option value={eTransactionType.RECEITA}>Receita 💰</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="personId">Pessoa</label>
          <select 
            id="personId" 
            name="personId" 
            value={formData.personId} 
            onChange={handleChange} 
            required
          >
            <option value="">Selecione uma pessoa...</option>
            {persons.map(p => (
              <option key={p.Id} value={p.Id}>{p.Name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="categoryId">Categoria</label>
          <select 
            id="categoryId" 
            name="categoryId" 
            value={formData.categoryId} 
            onChange={handleChange} 
            required
          >
            <option value="">Selecione uma categoria...</option>
            {categories.map(c => (
              <option key={c.Id} value={c.Id}>{c.Description}</option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => navigate('/transaction')}>
            Cancelar
          </button>
          <button type="submit" className="btn-save">
            {id ? "Atualizar" : "Lançar"}
          </button>
        </div>
      </form>
    </div>
  );
}