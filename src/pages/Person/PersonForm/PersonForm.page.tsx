import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useErrorModal } from "../../../common/components/error.component"
import { personService } from "../../../services/person.service"
import "./PersonForm.page.css"

export function PersonFormPage() {
  let id: string | undefined = useParams().id
  const navigate = useNavigate()
  const { showErrors } = useErrorModal()
  
  const [formData, setFormData] = useState({
    name: "",
    birthday: ""
  })

  /*
    Método que busca a pessoa pelo id e para preencher o formulário.
  */
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let result = await personService.getById(id)
          if (result) {
            setFormData({
              name: result.Name,
              birthday: result.Birthday.toISOString().split('T')[0]
            })
          }
        }
      } catch (error: any) {
        id = undefined;
        showErrors(error.response.data.errors);
      }
    }

    fetchData()
  }, [id])

  // Método que lida com a mudança dos campos do formulário.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  /*
    Método que lida com o envio do formulário. Seja para cadastrar um novo ou alterar uma existente.
  */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (id) {
        await personService.update(id, { name: formData.name, birthday: new Date(formData.birthday) })
      } else {
        await personService.create({ name: formData.name, birthday: new Date(formData.birthday) })
      }
      navigate('/person')
    } catch (error: any) {
      showErrors(error.response.data.errors);
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">{id ? "Editar Pessoa" : "Nova Pessoa"}</h1>

      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-group">
          <label htmlFor="name">Nome Completo</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: João Silva"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthday">Data de Nascimento</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => navigate('/person')}>
            Cancelar
          </button>
          <button type="submit" className="btn-save">
            Salvar Registro
          </button>
        </div>
      </form>
    </div>
  )
}