import { useRouter } from 'next/router'

const Polje = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>Post: {pid}</p>
}

export default Polje
