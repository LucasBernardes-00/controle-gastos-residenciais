import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Category } from "../../../models/category.model"
import { categoryService } from "../../../services/category.service"
import "./CategoryList.page.css"
import { useErrorModal } from "../../../common/components/error.component"

export function CategoryListPage() {
  const navigate = useNavigate()
  const { showErrors } = useErrorModal()
  const [categories, setCategories] = useState<Category[]>([])

  /*
    Método que busca todas as categorias e atualiza o estado categories, para montar a listagem.
  */
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await categoryService.getAll()
        if (result) setCategories(result)
      } catch (error: any) {
        showErrors(error.response.data.errors);
      }
    }

    fetchData()
  }, [])

  // Método que redireciona para a página de edição da categoria.
  const handleEdit = (id: string) => {
    navigate(`/category/edit/${id}`)
  }

  // Método que deleta a categoria.
  const handleDelete = async (id: string) => {
    try {
      await categoryService.delete(id)
      setCategories(categories.filter(c => c.Id !== id))
    }
    catch (error: any) {
      showErrors(error.response.data.errors);
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Lista de Categorias</h1>

      <div className="table-actions">
        <button
          className="btn-add-small"
          onClick={() => navigate('/category/new')}
        >
          + Adicionar
        </button>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Meta</th>
            <th style={{ width: '120px' }}></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.Id}>
              <td>{category.Description}</td>
              <td>{category.Goal}</td>
              <td className="actions-cell">
                <button
                  className="btn-action btn-edit"
                  onClick={() => handleEdit(category.Id)}
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  className="btn-action btn-delete"
                  onClick={() => handleDelete(category.Id)}
                  title="Excluir"
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}