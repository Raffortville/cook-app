import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {HashRouter as Router, Route,Switch,Redirect} from 'react-router-dom'
import {auth} from './Firebase'
import {getUser} from './Store/modules/userStore'
import TopHeader from './Components/header/TopHeader'
import Login from './Pages/Logs/Login'
import Logout from './Pages/Logs/LogOut'
import Fiches from './Pages/Fiche/Fiches'
import Home from './Pages/Home'
import Profil from './Pages/Profil'
import FicheById from './Pages/Fiche/ficheById'
import Search from './Pages/Search/Search'
import Signup from './Pages/Logs/Signup'

function App() {

  const dispatch = useDispatch()

  useEffect(()=> {

    auth.onAuthStateChanged((user) => {
      
      if (user) {
       
        dispatch(getUser(user.uid))

      } else {
        
        console.log('no user')
      }
    });

  },[dispatch])


  return (

    <Router>
      <div className="bgApp">
        <TopHeader/>
        <Switch>
          <Route exact path={"/"} component={Home}/>
          <Route path={"/login"} component={Login}/>
          <Route path={"/signup"} component={Signup}/>
          <Route path={"/logout"} component={Logout}/>
          <Route path={"/formFiche"} component={Fiches}/>
          <Route path={"/profil"} component={Profil}/>
          <Route path={"/search"} component={Search}/>
          <Route path={"/fiche/:id"} component={FicheById}/>
        </Switch>
        <Redirect to="/"/>
      </div>
    </Router>
  )
}

export default App;
