import React from 'react'
import {BrowserRouter,Switch, NavLink, Route, Redirect} from 'react-router-dom'

import Login from './Components/Login/Login'

import TransportPlans from './Components/Transport/TransportPlans'
import TransportOngoing from './Components/Transport/TransportOngoing'

import UpdateTrip from './Components/Updates/Update'
import Listing from './Components/Updates/Listing'

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      isAuth : 'false'
    }
    this.handleAuth=this.handleAuth.bind(this)
  }
  handleAuth = (bool) => {
    this.setState({isAuthenticated:bool})
}
  componentDidMount(){
    if(localStorage.getItem('Authorization')){
      this.setState({isAuth: true})
    }else {
      this.setState({isAuth: false})
    }
  }
  render(){
    return(
      <div>
        <BrowserRouter>
          {this.state.isAuth && (
            <div>
              <NavLink to="/">Home</NavLink><br/>
              <NavLink to="/ongoing">Ongoing Trips</NavLink><br/>
              <NavLink to='/plans'>Transport Plans</NavLink>
              <Switch>
                <>                  
                  <Route exact strict path="/"/>
                  <Route exact strict path="/plans" component={TransportPlans}/>
                  <Route exact strict path="/ongoing" component={TransportOngoing}/>
                  <Route exact strict path="/book/:id" render={(props) => {
                    return <UpdateTrip {...props}/>
                  }}/>
                  <Route exact strict path="/list/:id" render={(props) => {
                    return <Listing {...props}/>
                  }}/>
                </>
              </Switch>
            </div>
          )}
          {!this.state.isAuth && (
            <div>
              <NavLink to="/login">Login</NavLink>
            <Switch>
              <Route exact strict path="/login" render={(props) => {
                return <Login {...props}/>
              }}/>
            </Switch>
            </div>
            
            
          )}
        </BrowserRouter>
      </div>
    
    )
  }
}

export default App

