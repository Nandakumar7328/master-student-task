import React,{useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid'
import Header from "../Header"
import { RiSendPlane2Fill } from "react-icons/ri";
import './index.css'

const selectOptionNum = [
    {id:"zero",
     display:"Zero"
    },
    {id:"one",
     display:"One"
    },
    {id:"two",
     display:"Two" 
    },
    {id:"three",
    display:"Three"
    },
    {id:"four",
     display:"Four"
    },
    {id:"five",
     display:"Five"
    },
    {id:"six",
     display:"Six"
    },
    {id:"seven",
    display:"Seven"
    },
    {id:"eight",
     display:"Eight"
    },
    {id:"nine",
     display:"Nine"
    }
]

const selectOptionOperator = [
    {
    id:"plus",
    display:"Pluse"
    },
    {
     id:"minus",
     display:"Minus"
    },
    {id:"times",
     display:"Times"
    },
    {id:"dividedBy",
     display:"DividedBy"
    }
]


const Home = props => {
    const [masterData,setMAsterData] = useState([])
    const [rightNum,setRightNum] = useState(selectOptionNum[0].id)
    const [allQuestionAndAnswer,setAllActivity] = useState([])
    const [operator , setOperator] = useState(selectOptionOperator[0].id)
    const [leftNum,setLeftNum] = useState(selectOptionNum[0].id)
    
    useEffect( () => {
        const status = localStorage.getItem("status")
        if(status === 'true'){
            getQuestions()
        }else{
            getAllActivity()
        }
        
     }, []);

    const getAllActivity = async() => {
        const url = 'https://spritelstudentmaster.onrender.com/all/questions'
        const options = {
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
             },
        }

        const response = await fetch(url,options) 
        const data = await response.json()
        setAllActivity(data)
        
    }

    const getQuestions = async() => {
       
        const id = localStorage.getItem("ID")
        const url = `https://spritelstudentmaster.onrender.com/get/master/question/${id}`
        const options = {
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
             },
        }

        const response = await fetch(url,options) 
        const data = await response.json()
        setMAsterData(data)
    }

    const updateQuestion = async (masterName,id,answer) => {
        const url = 'https://spritelstudentmaster.onrender.com/master-questions/send'
        const questionData = {
            id:uuidv4(),
            question:`${leftNum} ${operator} ${rightNum} answer-: ${answer}`,
            masterId:id,
            masterName:masterName
        }
        const options = {
            method:"POST",
            body: JSON.stringify(questionData),
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
             },
        }

        const response = await fetch(url,options) 
        const data = await response.json()
        if (data.status === true){
            setLeftNum(selectOptionNum[0].id)
            setOperator(selectOptionOperator[0].id)
            setRightNum(selectOptionNum[0].id)
            getQuestions()
        }
    }

    const onClickSendQuestion = async() => {
        function checkNum(num, temp) {
            if (temp === undefined) {
                  return num;
              } else {
                  return temp(num)
              }
          }
          
          function zero(temp) {
              return checkNum(0,temp)
          }
          function one(temp) {
              return checkNum(1,temp)
          }
          function two(temp) {
              return checkNum(2,temp)
          }
          function three(temp) {
              return checkNum(3,temp)
          }
          function four(temp) {
              return checkNum(4,temp)
          }
          function five(temp) {
              return checkNum(5,temp)
          }
          function six(temp) {
              return checkNum(6,temp)
          }
          function seven(temp) {
              return checkNum(7,temp)
          }
          function eight(temp) {
              return checkNum(8,temp)
          }
          function nine(temp) {
              return checkNum(9,temp)
          }
          
          function plus(right) {
            return function(left) {
                 return left + right
                }
          }
          function minus(right) {
            return function(left) {
                  return left - right
              }
          }
          function times(right) {
            return function(left) {
                 return left * right }
          }
          function dividedBy(right) {
            return function(left) {
                 return Math.round(left / right)
                 }
          }
         const answer = eval(`${leftNum}(${operator}(${rightNum}()))`)
        const id = localStorage.getItem("ID")
        const url = `https://spritelstudentmaster.onrender.com/get/master/name/${id}`
        const options = {
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
             },
        }

        const response = await fetch(url,options) 
        const data = await response.json()
        const masterName = data[0].name
        if (Number.isInteger(answer)){
            updateQuestion(masterName,id,answer)
        }

    }

    const onChangeUserLeft = event => {
        setLeftNum(event.target.value)
    }

    const onChangeUserOperator = event => {
        setOperator(event.target.value)
    }

    const onChangeUserRight = event => {
        setRightNum(event.target.value)
        
    }

    const status = localStorage.getItem("status")

    return (
    <div className="home-main-container">
    <Header/>
   {status === "true" ? (<div className="sub-home-container">
    <ul className="questions">
    {masterData.map(eachData => (
        <li className='li-container' key={eachData.id}>
            <p className='heading'>{eachData.question}</p>
            <p className='para'>By-:{eachData.masterName}</p>
        </li>
    ))}
    </ul>
    <div className="input-send-container">
    <select value={leftNum} onChange={onChangeUserLeft} className="input-question">
          {selectOptionNum.map(eachOp => (
            <option key={eachOp.id} value={eachOp.id}>{eachOp.display}</option>
          ))}
       </select>
       <select value={operator} onChange={onChangeUserOperator} className="input-question">
          {selectOptionOperator.map(eachOp => (
            <option key={eachOp.id} value={eachOp.id}>{eachOp.display}</option>
          ))}
       </select>
       <select value={rightNum} onChange={onChangeUserRight} className="input-question">
          {selectOptionNum.map(eachOp => (
            <option key={eachOp.id} value={eachOp.id}>{eachOp.display}</option>
          ))}
       </select>
        <RiSendPlane2Fill className="send" onClick={onClickSendQuestion}/>
    </div>
    </div>
    ):(<div className="sub-home-container">
    <ul className="questions-all">
    {allQuestionAndAnswer.map(eachData => (
        <li className='li-container-all' key={eachData.id}>
            <p className='heading'>{eachData.question}</p>
            <p className='para'>By-:{eachData.masterName}</p>
        </li>
    ))}
    </ul>
    </div>)}
    </div>
)
}

export default Home