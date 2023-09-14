export class Lesson {
  public readonly id?: string
  public instructorId: string
  public studentId: string
  public dateId: string

  constructor(props: Omit<Lesson, 'id'>, id?: string) {
    this.instructorId = props.instructorId
    this.studentId = props.studentId
    this.dateId = props.dateId

    if (id) {
      this.id = id
    }
  }
}
