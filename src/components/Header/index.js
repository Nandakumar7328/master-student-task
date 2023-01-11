import {withRouter,Link} from 'react-router-dom'
import { FcReading ,FcManager} from "react-icons/fc";
import './index.css' 

const Header = props => {  
 const onClickLogout = () => {
       localStorage.removeItem("ID")
       const {history} = props
       history.replace('/login')
    }
    const status = localStorage.getItem("status")
    const studentOrMaster = status === 'true' ? <FcManager className='avatar'/> :<FcReading className='avatar'/> 
    
    return(
      <nav className='header-container'>
       <div className='nav-sub-container'>
        <Link to="/" className='link'>
        <h1 className='logo'>SPR<span className='it'>IT</span>LE</h1>
        </Link>
        {studentOrMaster}
        </div>
        <div className='nav-sub-container'>
        <Link to="/account">
        <img className='avatar' src='https://res.cloudinary.com/duv0mhzrm/image/upload/v1665994997/Avatar_hzuzbt.png' alt='account'/>
        </Link>
            <button onClick={onClickLogout} type='button' className='btn-lagout'>Logout</button>
            </div>
      </nav>
    )
    }


export default withRouter(Header)