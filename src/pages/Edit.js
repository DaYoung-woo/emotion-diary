import { useNavigate, useSearchParams } from "react-router-dom"

const Edit = () => {

  const navigate = useNavigate();

  const [searchParams, setSearchParams ] = useSearchParams();

  const id = searchParams.get('id')

  const mode = searchParams.get('mode')


  return (
    <div>
      <h1>Edit</h1>
      <p></p>
      <button onClick={() => setSearchParams({who: "dayoung"})}>QS 바꾸기</button>
      <button onClick={() => {
        navigate("/home")
      }}>
        홈으로 이동
      </button>
    </div>
  )
}

export default Edit