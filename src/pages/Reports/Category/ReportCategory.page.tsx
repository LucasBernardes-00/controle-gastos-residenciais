import { useEffect, useMemo, useState } from 'react'
import { useErrorModal } from '../../../common/components/error.component'
import type { inCategoryBalanceDTO } from '../../../common/DTOs/categoryBalanceDTO'
import { categoryService } from '../../../services/category.service'
import './ReportCategory.page.css'

export function ReportCategoryPage() {
  const { showErrors } = useErrorModal()
  const [personsBalance, setPersonsBalance] = useState<inCategoryBalanceDTO[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await categoryService.getBalance()
        setPersonsBalance(result)
      } catch (error: any) {
        showErrors(error.response.data.errors);
      }
    }

    fetchData()
  }, [])

  const grandTotal = useMemo(() => {
    return personsBalance.reduce(
      (acc, curr) => ({
        income: acc.income + curr.income,
        expense: acc.expense + curr.expense,
        balance: acc.balance + curr.balance,
      }),
      { income: 0, expense: 0, balance: 0 }
    );
  }, [personsBalance]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Relatório de Totais por Categoria</h1>

      <table className="custom-table report-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th className="text-right">Receitas</th>
            <th className="text-right">Despesas</th>
            <th className="text-right">Saldo</th>
          </tr>
        </thead>
        <tbody>
          {personsBalance.map((item) => (
            <tr key={item.id}>
              <td>{item.description}</td>
              <td className="text-right text-income">{formatCurrency(item.income)}</td>
              <td className="text-right text-expense">{formatCurrency(item.expense)}</td>
              <td className={`text-right ${item.balance >= 0 ? "text-income" : "text-expense"}`}>
                {formatCurrency(item.balance)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="table-footer-totals">
          <tr>
            <td><strong>TOTAL GERAL</strong></td>
            <td className="text-right text-income"><strong>{formatCurrency(grandTotal.income)}</strong></td>
            <td className="text-right text-expense"><strong>{formatCurrency(grandTotal.expense)}</strong></td>
            <td className="text-right">
              <strong className={grandTotal.balance >= 0 ? "text-income" : "text-expense"}>
                {formatCurrency(grandTotal.balance)}
              </strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}