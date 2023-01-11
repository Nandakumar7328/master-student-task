import React,{useState,useEffect} from 'react'
import Header from '../Header'
import './index.css'
const Account = () => {
    const [userData,setUserData] = useState([])
    const [password,setPassword] = useState('')

     useEffect( () => {
        const status = localStorage.getItem("status")
        if(status === 'true'){
            getMasterData()
        }else{
            getStudentData()
        }
        
     }, []);
     const getStudentData = async() => {
        const id = localStorage.getItem("ID")
        const url = `https://spritelstudentmaster.onrender.com/get/student/account/${id}`
        const option = {
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
             },
        }

        const response = await fetch(url,option)
        const data = await response.json()
        const hide = "*".repeat(data[0].password.length)
        setPassword(hide)
        setUserData(data[0])

     }
     const getMasterData = async() => {
        const id = localStorage.getItem("ID")
        const url = `https://spritelstudentmaster.onrender.com/get/master/accout/${id}`
        const option = {
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
             },
        }

        const response = await fetch(url,option)
        const data = await response.json()
        const hide = "*".repeat(data[0].password.length)
        setPassword(hide)
        setUserData(data[0])

     }
        
    
     const status = localStorage.getItem("status")
     const StudentOrMaster = status === 'true' ? 'Master':'Student'

    return( <div className='account-main-container'>
    <Header/>
    <h1 className='heading-account'>{StudentOrMaster} Account</h1>
    <div className='account-sub-container'>
      <p className='para'>Name-: {userData.username}</p>
      <p className='para'>Email-: {userData.email} </p>
      <p className='para'>Password-: {password}</p>
    </div>
    </div>
    )
}

export default Account