import { Category } from './category.model';
import { Person } from './person.model';

export const eTransactionType = {
  DESPESA: 1,
  RECEITA: 2,
} as const;

export type eTransactionType = typeof eTransactionType[keyof typeof eTransactionType];

export class Transaction {
  private id: string;
  private description: string;
  private amount: number;
  private type: eTransactionType;
  private category: Category;
  private person: Person;

  constructor(
    id: string,
    description: string,
    amount: number,
    type: eTransactionType,
    category: Category,
    person: Person
  ) {
    this.id = id;
    this.description = description;
    this.amount = amount;
    this.type = type;
    this.category = category;
    this.person = person;
  }

  get Id(): string { return this.id; }
  get Description(): string { return this.description; }
  get Amount(): number { return this.amount; }
  get Type(): eTransactionType { return this.type; }
  get Category(): Category { return this.category; }
  get Person(): Person { return this.person; }
}