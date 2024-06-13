import { useState } from "react"
import MyHeader from "../components/MyHeader"
import MyButton from "../components/MyButton"

const Home = () => {
  const [curDate, setCurDate] = useState(new Date())

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate() ))
  }

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate() ))
  }

  return (
    <div>
      <MyHeader 
        headText={`${curDate.getFullYear()}년 ${curDate.getMonth() + 1}`}
        leftChild={<MyButton text={`<`} onClick={decreaseMonth}/>}
        rightChild={<MyButton text={`>`} onClick={increaseMonth}/>}
      />
    </div>
  )
}

export default Home