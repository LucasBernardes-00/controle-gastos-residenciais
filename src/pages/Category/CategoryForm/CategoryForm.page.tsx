import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { eGoal } from '../../../models/category.model'
import { categoryService } from '../../../services/category.service'
import './CategoryForm.page.css'
import { useErrorModal } from '../../../common/components/error.component'

const goalMapper: Record<string, eGoal> = {
  "DESPESA": eGoal.DESPESA,
  "RECEITA": eGoal.RECEITA,
  "AMBAS": eGoal.AMBAS
};

export function CategoryFormPage() {
  let id: string | undefined = useParams().id
  const navigate = useNavigate()
  const { showErrors } = useErrorModal()

  const [formData, setFormData] = useState({
    description: "",
    goal: eGoal.DESPESA as eGoal
  })

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const result = await categoryService.getById(id)
          console.log(result)
          if (result) {
            setFormData({
              description: result.Description,
              goal: goalMapper[result.Goal]
            })
          }
        } catch (error: any) {
          id = undefined;
          showErrors(error.response.data.errors);
        }
      }
    }
    fetchData()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    const newValue = name === 'goal' ? Number(value) : value

    setFormData(prev => ({ ...prev, [name]: newValue }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (id) {
        await categoryService.update(id, { description: formData.description, goal: formData.goal })
      } else {
        await categoryService.create({ description: formData.description, goal: formData.goal })
      }
      navigate('/category') // Ajuste para sua rota de listagem
    } catch (error: any) {
      showErrors(error.response.data.errors);
    }
  }
  
  return (
    <div className="page-container">
      <h1 className="page-title">{id ? "Editar Categoria" : "Nova Categoria"}</h1>

      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ex: Alimentação, Salário..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="goal">Objetivo (Tipo)</label>
          <select 
            id="goal" 
            name="goal" 
            value={formData.goal} 
            onChange={handleChange}
            className="custom-select"
          >
            <option value={eGoal.DESPESA}>Despesa</option>
            <option value={eGoal.RECEITA}>Receita</option>
            <option value={eGoal.AMBAS}>Ambas</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => navigate('/category')}>
            Cancelar
          </button>
          <button type="submit" className="btn-save">
            {id ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  )
}