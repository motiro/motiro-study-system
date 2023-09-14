export class Lesson {
  public readonly id?: string
  public instructor: string
  public student: string
  public date: string

  constructor(props: Omit<Lesson, 'id'>, id?: string) {
    this.instructor = props.instructor
    this.student = props.student
    this.date = props.date

    if (id) {
      this.id = id
    }
  }
}
