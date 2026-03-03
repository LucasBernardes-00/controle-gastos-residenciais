export const eGoal = {
  DESPESA: 1,
  RECEITA: 2,
  AMBAS: 3,
} as const

export type eGoal = typeof eGoal[keyof typeof eGoal]

export class Category {
  private id: string
  private description: string
  private goal: eGoal

  constructor(id: string, description: string, goal: eGoal) {
    this.id = id
    this.description = description
    this.goal = goal
  }

  get Id(): string {
    return this.id
  }

  get Description(): string {
    return this.description
  }

  get Goal(): eGoal {
    return this.goal
  }
}