import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import AccountCreate from './components/CreateAccount'
import Account from './components/Account'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
const App = () => (
  <>
  <Switch>
    <Route exact path='/login' component={Login}/>
    <Route exact path='/create-account/:status' component={AccountCreate}/>
    <ProtectedRoute exact path='/' component={Home}/>
    <ProtectedRoute exact path='/account' component={Account}/>
  </Switch>
  </>
)

export default App