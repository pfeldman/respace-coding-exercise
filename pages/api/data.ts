// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export interface WorkingHours {
  start: string
  end: string
}

interface Data {
  workingHours?: Record<string, WorkingHours[]>
  defaultPrice?: number
}

let data: Data = {}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    data = req.body
    res.status(200).json(data)
  } else {
    res.status(200).json(data)
  }
}
