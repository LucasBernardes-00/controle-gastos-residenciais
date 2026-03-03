export class Person {
  private id: string
  private name: string
  private birthday: Date

  constructor(id: string, name: string, birthday: Date) {
    this.id = id
    this.name = name
    this.birthday = birthday
  }

  get Id(): string { return this.id }
  get Name(): string { return this.name }
  get Birthday(): Date { return this.birthday }
}