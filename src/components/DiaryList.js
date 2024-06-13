import { useState } from "react"
import MyButton from "./MyButton"
import { useNavigate } from "react-router-dom"

const sortOptionList = [
  {value: "latest", name: '최신순'},
  {value: 'ordest', name: "오래된 순"}
]

const filterOptionList = [
  {value: 'all', name: '모두 다'},
  {value: 'good', name: '좋은 감정만'},
  {value: 'bad', name: '나쁜 감정만'},
]
const ControlMenu = ({value, onChange, optionList}) => {
  return (
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map(el => (
        <option key={el.value} value={el.value}>{el.name}</option>
      ))}

    </select>
  )
}

const DiaryList = ({diaryList = []}) => {
  const navigate = useNavigate()
  const [sortType, setSortType] = useState("latest")
  const [filter, setFilter] = useState(`all`)

  const filterCallBack = (item) => {
    if(filter === 'good') return parseInt(item.emotion) >= 3
    else return parseInt(item.emotion) < 3
  }

  const getProcessedDiaryList = () => {
    const copyList = JSON.parse(JSON.stringify(diaryList))
    
    
    const filteredList = filter === 'all' ? copyList : copyList.filter(el => filterCallBack(el))

    const compare = (a,b) => {
      if(sortType === 'latest') return parseInt(b.date) - parseInt(a.date)
      else return parseInt(a.date) - parseInt(b.date)
    }
    const sortedList = filteredList.sort(compare)

    return sortedList
  }

  

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
        <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList}/>
        <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList}/>
        </div>
        <div className="right_col">
          <MyButton type={`positive`} onClick={() => navigate(`/new`)} text={`새 일기쓰기`}/>
        </div>
      </div>
      
      
      {
        getProcessedDiaryList().map(el => (
          <div key={el.content}>
            {el.content}
            {el.emotion}
          </div>
        ))
      }
    </div>
  )
}

export default DiaryList;