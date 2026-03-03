import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Person } from "../../../models/person.model"
import { personService } from "../../../services/person.service"
import "./PersonList.page.css"
import { useErrorModal } from "../../../common/components/error.component"

export function PersonPage() {
  const navigate = useNavigate()
  const { showErrors } = useErrorModal()
  const [persons, setPersons] = useState<Person[]>([])

  /*
    Método que busca todas as pessoas e atualiza o estado persons, para montar a listagem.
  */
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await personService.getAll()
        console.log(result)
        if (result) setPersons(result)
      } catch (error: any) {
        showErrors(error.response.data.errors);
      }
    }

    fetchData()
  }, [])

  /*
    Método que redireciona para a página de edição da pessoa.
  */
  const handleEdit = (id: string) => {
    navigate(`/person/edit/${id}`)
  }

  /*
    Método que deleta a pessoa.
  */
  const handleDelete = async (id: string) => {
    try {
      await personService.delete(id)
      setPersons(persons.filter(c => c.Id !== id))
    }
    catch (error: any) {
      showErrors(error.response.data.errors);
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Lista de Pessoas</h1>

      <div className="table-actions">
        <button
          className="btn-add-small"
          onClick={() => navigate('/person/new')}
        >
          + Adicionar
        </button>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th style={{ width: '120px' }}></th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.Id}>
              <td>{person.Name}</td>
              <td>{person.Birthday.toLocaleDateString('pt-br')}</td>
              <td className="actions-cell">
                <button
                  className="btn-action btn-edit"
                  onClick={() => handleEdit(person.Id)}
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  className="btn-action btn-delete"
                  onClick={() => handleDelete(person.Id)}
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