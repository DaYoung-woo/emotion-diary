import { useContext, useEffect, useState } from "react"
import MyHeader from "../components/MyHeader"
import MyButton from "../components/MyButton"
import { DiaryStateContext } from "../App"
import DiaryList from "../components/DiaryList"

const Home = () => {
  const diaryList = useContext(DiaryStateContext)

  const [data, setData] = useState([])
  const [curDate, setCurDate] = useState(new Date())

  useEffect(() => {
    if(diaryList.length < 1) return;
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getTime()
    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0
    ).getTime()
    setData(diaryList.filter(el => firstDay <= el.date && el.date <= lastDay))
  }, [curDate, diaryList])



  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate() ))
  }

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate() ))
  }

  return (
    <div>
      <MyHeader 
        headText={`${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`}
        leftChild={<MyButton text={`<`} onClick={decreaseMonth}/>}
        rightChild={<MyButton text={`>`} onClick={increaseMonth}/>}
      />
      <DiaryList diaryList={data} />
    </div>
  )
}

export default Home