# 📑 Sistema de Controle Financeiro Residencial

Este é um projeto de gerenciamento financeiro residencial desenvolvido com React e TypeScript. A aplicação permite o controle de pessoas, categorias e transações, oferecendo relatórios detalhados de saldo e totais por entidade.

## 🚀 Tecnologias Utilizadas
React 19 (Functional Components & Hooks)

TypeScript (Tipagem forte para modelos e DTOs)

React Router Dom v6 (Navegação avançada com Rotas Aninhadas e Outlet)

Context API (Gerenciamento de Modais de Erro globais)

CSS3 (Layout responsivo com Flexbox)

## 🏗️ Arquitetura do Projeto
O projeto segue uma estrutura organizada por responsabilidades, facilitando a manutenção e escalabilidade:

/common: Componentes reutilizáveis (Modais, Inputs) e DTOs.

/models: Classes de domínio (Person, Category, Transaction) com lógica de negócio.

/services: Camada de abstração para chamadas de API (person.service, etc).

/pages: Componentes de página que representam as rotas da aplicação.

Layout Pattern: Uso de um componente de Layout fixo com um menu lateral dinâmico.

## 🛠️ Funcionalidades Principais
1. Gestão de Entidades

- Pessoas (Persons): Cadastro, edição e listagem.
- Categorias (Categories): Organização por tipo (Receita, Despesa ou Ambas).
- Transações (Transactions): Lançamentos financeiros vinculando pessoas e categorias.

2. Consultas e Relatórios

- Totals by Person: Relatório detalhado exibindo:
- Total de Receitas individual.
- Total de Despesas individual.
- Saldo Líquido.
- Grand Total: Soma geral de todas as movimentações do sistema no rodapé da tabela.

3. Experiência do Usuário (UX)

- Menu Lateral Retrátil: Grupo de "Consultas Totais" com efeito accordion.
- Global Error Handling: Modal centralizado para exibição de erros de validação da API.
- Navegação Semântica: Uso de IDs na URL para fluxos de edição e criação.

## 🔧 Como Rodar o Projeto

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/finance-control-react.git
```

2. Instale as dependências:

```bash
npm install
```

3. Instale o React Router:

```bash
npm install react-router-dom
```

4. Inicie o servidor de desenvolvimento:

```bash
Inicie o servidor de desenvolvimento:
```

## 📝 Licença
Este projeto está sob a licença MIT.