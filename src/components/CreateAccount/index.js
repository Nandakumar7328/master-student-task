import React,{useState} from 'react'
import { v4 as uuidv4 } from 'uuid'
import './index.css'
const AccountCreate = props => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [isErrorShow,displayError] = useState(false)
    const[erroMsg,addErrorMsg] = useState('')
    const {match} = props 
    const {params} = match 
    const {status} = params
    const studentOrMaster = status === 'true' ? "Master":"Student"
    const onSubmitAccoutDetails = async event => {
        event.preventDefault()
        const url = status === 'true' ? 'https://spritelstudentmaster.onrender.com/add-master':'https://spritelstudentmaster.onrender.com/add-student'
        const userDetails = {
            id:uuidv4(),
            username:username,
            password:password,
            email:email
        }

        const options = {
            method:"POST",
            body: JSON.stringify(userDetails),
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
              },
        }

        const response = await fetch(url,options)
        const data = await response.json()
        
        if (data.status === true){
          const  {history} = props 
          history.replace("/login")
        }else{
            displayError(true)
            addErrorMsg("User Not add")
        }

    } 
    const onChangeUsername = event => {
       setUsername(event.target.value)
    }

    const onChangePassword = event => {
        setPassword(event.target.value)

    }

    const onChangeEmail = event => {
        setEmail(event.target.value)

    }
   
    return(
        <div className='sign-up-main-container'>
           <h1 className='main-heading-create-account'>Create {studentOrMaster} Account</h1>
           <form className='sign-up-form-container' onSubmit={onSubmitAccoutDetails}>
            <div className='label-input-container'>
              <label htmlFor='username' className='label-para'>USERNAME<span className='mandatory'> *</span></label>
              <input value={username} onChange={onChangeUsername} placeholder='Username' id='username' type="text" className='input-sign-up'/>
              </div>
              <div className='label-input-container'>
              <label htmlFor='password' className='label-para'>PASSWORD<span className='mandatory'> *</span></label>
              <input value={password} onChange={onChangePassword} placeholder='password'  id='dob' type="password" className='input-sign-up'/>
              </div>
              <div className='label-input-container'>
              <label htmlFor='email' className='label-para'>EMAIL<span className='mandatory'> *</span></label>
              <input onChange={onChangeEmail} value={email} placeholder='Email' id='email' type="email" className='input-sign-up'/>
              </div>
              <button className='submit-btn' type='submit'>Submit</button>
              {isErrorShow && <p className='error'>*{erroMsg}</p>}
              </form>
        </div>
    )
}

export default AccountCreate