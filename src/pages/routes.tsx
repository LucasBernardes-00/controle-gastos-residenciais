import { CategoryFormPage } from "./Category/CategoryForm/CategoryForm.page"
import { CategoryListPage } from "./Category/CategoryList/CategoryList.page"
import { PersonFormPage } from "./Person/PersonForm/PersonForm.page"
import { PersonPage } from "./Person/PersonList/PersonList.page"
import { ReportCategoryPage } from "./Reports/Category/ReportCategory.page"
import { ReportPersonPage } from "./Reports/Person/ReportPerson.page"
import { TransactionFormPage } from "./Transaction/TransactionForm/TransactionForm.page"
import { TransactionListPage } from "./Transaction/TransactionList/TransactionList.page"

const Dashboard = () => <h1>🏠 Dashboard Principal</h1>

export const routesConfig = [
  { index: true, element: <Dashboard />, label: "Dashboard" },
  { path: "person", element: <PersonPage />, label: "Pessoa" },
  { path: "category", element: <CategoryListPage />, label: "Categoria" },
  { path: "transaction", element: <TransactionListPage />, label: "Transação" },

  // Escondidos
  { path: "category/new", element: <CategoryFormPage />, label: "Nova Categoria", hideInMenu: true },
  { path: "category/edit/:id", element: <CategoryFormPage />, label: "Editar Categoria", hideInMenu: true },
  { path: "transaction/new", element: <TransactionFormPage />, label: "Nova Transação", hideInMenu: true },
  { path: "transaction/edit/:id", element: <TransactionFormPage />, label: "Editar Transação", hideInMenu: true },
  { path: "person/new", element: <PersonFormPage />, label: "Nova Pessoa", hideInMenu: true },
  { path: "person/edit/:id", element: <PersonFormPage />, label: "Editar Pessoa", hideInMenu: true },

  // Rotas do Grupo
  { path: "totais-pessoa", element: <ReportPersonPage />, label: "Pessoas", group: "Consultas Totais" },
  { path: "totais-categoria", element: <ReportCategoryPage />, label: "Categorias", group: "Consultas Totais" },
];