import { useContext } from 'react'
import { AppContext, WorkingHours } from 'context'
import axios from 'axios'
import { useQuery, useMutation } from 'react-query'

export const useData = () => {
  const { defaultPrice, workingHours } = useContext(AppContext)

  const { data, isFetching } = useQuery<{
    workingHours: Record<string, WorkingHours[]>
    defaultPrice: string
  }>('workingHours', async () => {
    const { data } = await axios.get('/api/data')
    return data
  })

  const mutation = useMutation(() => {
    return axios.post('/api/data', {
      workingHours,
      defaultPrice,
    })
  })

  return {
    data,
    loading: isFetching || mutation.isLoading,
    save: mutation.mutate,
  }
}
