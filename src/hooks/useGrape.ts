import { useContext } from 'react'
import { Context } from '../contexts/GrapeProvider'

const useGrape = () => {
  const { grape } = useContext(Context)
  return grape
}

export default useGrape
