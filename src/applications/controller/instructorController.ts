import { Request, Response } from 'express'
import { instructorModel } from '../../models/instructorModel'

export class InstructorController {
  createInstructor = async (req: Request, res: Response) => {
    res.send('CREATE Instructor')
  }
  getAllInstructors = async (req: Request, res: Response) => {
    //const instructors = await instructorModel.find({})
    res.send('GET ALL Instructors')
  }
  getInstructor = async (req: Request, res: Response) => {
    res.send('GET Instructor')
  }
  updateInstructor = async (req: Request, res: Response) => {
    res.send('UPDATE Instructor')
  }
  deleteInstructor = async (req: Request, res: Response) => {
    res.send('DELETE Instructor')
  }
}
