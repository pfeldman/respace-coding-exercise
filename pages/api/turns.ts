import type { NextApiRequest, NextApiResponse } from 'next'

interface Turn {
  takenBy: string
  time: string
}

interface Data {
  turnsTaken: Turn[]
}

const data: Data = {
  turnsTaken: [],
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    data.turnsTaken.push(req.body)
    res.status(200).json(data)
  } else {
    res.status(200).json(data)
  }
}
