import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useReducer, useRef } from "react";

import Home from './pages/Home';
import New from "./pages/New";  
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import MyButton from "./components/MyButton";


const reducer = (state, action) => {
  let newState = []
  switch(action.type){
    case 'INIT': {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data
      };
      newState = [newItem, ...state]
      break;
    }
    case "REMOVE": {
      newState = state.filter(el => el.id !== action.targetId)
      break;
    }
    case "EDIT": {
      newState = state.map(el => 
        el.id === state.targetId ? {...action.data} : el
      )
      break;
    }
    default: 
      return state;
  }
  return newState;
}

export const DiaryStateContext = createContext();
export const DiaryDispathContext = createContext();

const dummyData = [{
  id: 1,
  emotion: 1,
  content: '감정일기 1번',
  date: 1718274915000
},{
  id: 1,
  emotion: 2,
  content: '감정일기 2번',
  date: 1718274916000
},{
  id: 1,
  emotion: 3,
  content: '감정일기 3번',
  date: 1718274917000
},{
  id: 1,
  emotion: 4,
  content: '감정일기 4번',
  date: 1718274918000
},{
  id: 1,
  emotion: 5,
  content: '감정일기 5번',
  date: 1718274919000
}
]

function App() {

  const [data, dispatch] = useReducer(reducer, dummyData)

  const dataId = useRef(0)
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({type: "CREATE", data: {
      id: dataId.current,
      date: new Date(date).getTime(),
      content,
      emotion
    }});
    dataId.current += 1
  }
  
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId})
  }

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({type: "EDIT", data: {
      id: targetId,
      date: new Date(date).getTime(),
      content,
      emotion
    }})
  }
  

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispathContext.Provider value={reducer}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/new' element={<New />}/>
              <Route path='/edit' element={<Edit />}/>
              <Route path='/diary/:id' element={<Diary />}/>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispathContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;