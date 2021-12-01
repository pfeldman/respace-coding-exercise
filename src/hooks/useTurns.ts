import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from 'react-query'

interface Turn {
  takenBy: string
  time: string
}

export const useTurns = () => {
  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery<{
    turnsTaken: Turn[]
  }>('takenTurns', async () => {
    const { data } = await axios.get('/api/turns')
    return data
  })

  const mutation = useMutation(
    (turn: Turn) => {
      return axios.post('/api/turns', turn)
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(['takenTurns'])
      },
    }
  )

  return {
    data,
    loading: isFetching || mutation.isLoading,
    save: mutation.mutate,
    status: mutation.status,
  }
}
