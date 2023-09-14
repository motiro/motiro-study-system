export class Lesson {
  public readonly id?: string
  public instructor: string
  public student: string
  public date: string
  public files: []

  constructor(props: Omit<Lesson, 'id'>, id?: string) {
    this.instructor = props.instructor
    this.student = props.student
    this.date = props.date
    this.files = props.files

    if (id) {
      this.id = id
    }
  }
}
