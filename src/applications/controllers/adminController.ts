import { Request, Response } from 'express'
import { AdminUseCase } from 'applications/usecases/adminUseCase'

export class AdminController {
  constructor(private useCase: AdminUseCase) {}
  async create(req: Request, res: Response) {
    try {
      const id = req.params.id
      const { name, email, password } = req.body

      const result = await this.useCase.create({
        id,
        name,
        email,
        password
      })

      return res.status(201).json(result)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          message: err.message || 'Unexpected error'
        })
      }
      return res.status(500).json({
        message: 'Unexpected error'
      })
    }
  }

  async listOne(req: Request, res: Response) {
    try {
      const id = req.params.id
      const result = await this.useCase.listOne(id)

      return res.status(200).json(result)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          message: err.message || 'Unexpected error'
        })
      }
      return res.status(500).json({
        message: 'Unexpected error'
      })
    }
  }

  async listAll(_: Request, res: Response) {
    try {
      const result = await this.useCase.listAll()

      return res.status(200).json(result)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          message: err.message || 'Unexpected error'
        })
      }
      return res.status(500).json({
        message: 'Unexpected error'
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id
      const { name, email, password } = req.body

      await this.useCase.update({
        id,
        name,
        email,
        password
      })

      return res.status(200).send()
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          message: err.message || 'Unexpected error'
        })
      }
      return res.status(500).json({
        message: 'Unexpected error'
      })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id

      await this.useCase.delete(id)

      return res.status(200).send()
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          message: err.message || 'Unexpected error'
        })
      }
      return res.status(500).json({
        message: 'Unexpected error'
      })
    }
  }
}
