import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Transaction } from "../../../models/transaction.model"
import { transactionService } from "../../../services/transaction.service"
import './TransactionList.page.css'
import { useErrorModal } from "../../../common/components/error.component"

export function TransactionListPage() {
  const navigate = useNavigate()
  const { showErrors } = useErrorModal()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await transactionService.getAll()
        console.log(result)
        if (result) setTransactions(result)
        else setTransactions([])
      } catch (error: any) {
        showErrors(error.response.data.errors);
        setTransactions([])
      }
    }

    fetchData()
  }, [])

  function handleEdit(Id: string): void {
    navigate(`/transaction/edit/${Id}`)
  }

  async function handleDelete(Id: string): Promise<void> {
    try {
      await transactionService.delete(Id)
      setTransactions(transactions.filter(c => c.Id !== Id))
    }
    catch (error: any) {
      showErrors(error.response.data.errors);
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Lista de Transações</h1>

      <div className="table-actions">
        <button
          className="btn-add-small"
          onClick={() => navigate('/transaction/new')}
        >
          + Adicionar
        </button>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Pessoa</th>
            <th style={{ width: '120px' }}></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.Id}>
              <td>{transaction.Description}</td>
              <td>{transaction.Amount.toFixed(2)}</td>
              <td>{transaction.Type}</td>
              <td>{transaction.Category.Description}</td>
              <td>{transaction.Person.Name}</td>
              <td className="actions-cell">
                <button
                  className="btn-action btn-edit"
                  onClick={() => handleEdit(transaction.Id)}
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  className="btn-action btn-delete"
                  onClick={() => handleDelete(transaction.Id)}
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