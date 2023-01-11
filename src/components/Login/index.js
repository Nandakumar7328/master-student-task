import React,{useState} from 'react'
import { Link ,Redirect} from 'react-router-dom'
import './index.css'
const Login = (props) => {
  const [isSelectUser,clickUser] = useState(true)
  const [username,changeusername] = useState('')
  const [password,changePassword] = useState('')
  const [isErrorShow,displayError] = useState(false)
  const[erroMsg,addErrorMsg] = useState('')
  const [isMaster, changeToStudent] = useState(true)
 
  const onSubmitUserDetails = async event => {
     event.preventDefault()
     const url = isMaster ? 'https://spritelstudentmaster.onrender.com/login-master':'https://spritelstudentmaster.onrender.com/login-student'
     const userData = {
      username:username,
      password:password
     }
     const options ={
      method:"POST",
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
              },
     }
      
     const response = await fetch(url,options)
     const data = await response.json()
     if (data.status == true){
        localStorage.setItem("ID",data.id)
        localStorage.setItem("status",isMaster)
        displayError(false)
        const  {history} = props 
          history.replace("/")
     }else{
      addErrorMsg(data.msg)
      displayError(true)
     }


  }

  const onClickMaster = () => {
    clickUser(false)
    changeToStudent(true)
  }
  const onClickStudent = () => {
    clickUser(false)
    changeToStudent(false)
  }

  const onChangeUsername = event => {
    changeusername(event.target.value)
  }

  const onChangePassword = event => {
    changePassword(event.target.value)
  }

  const getId = localStorage.getItem("ID")
    if (getId !== null)  {
        return <Redirect to="/" />
      }

  return(
    <div className='login-main-container'>
      { isSelectUser ? (<div className='sub-select-container'>
        <p className='user-type-para'>Select User type?</p>
         <button onClick={onClickMaster} type='button' className='btn-select-user'>Master</button>
         <button onClick={onClickStudent} type='button'className='btn-select-user'>Student</button>
      </div>) : (<div className='login-main-container'>
              <form className='login-sub-container' onSubmit={onSubmitUserDetails}>
                <h1 className='login-main-heading'>Login</h1>
                <label  htmlFor='username' className='labele-heading'>Username</label>
                <input onChange={onChangeUsername} value={username} id='username'  className='input-container' type="text" placeholder="Enter Your Username"/>
                <label  htmlFor='password' className='labele-heading'>Password</label>
                <input onChange={onChangePassword} value={password} id='password' className='input-container' type="password" placeholder="Enter Your Password"/>
                <button className='btn' type='submit'>Login</button>
                {isErrorShow && <p className='error'>*{erroMsg}</p>}
                <Link to={`/create-account/${isMaster}`}>
                <p className='create-account-para'>Create Your Account</p>
                </Link>
              </form>
           </div>)}
    </div>
  )
}

export default Login