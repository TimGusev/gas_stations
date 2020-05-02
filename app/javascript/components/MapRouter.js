import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import StationsMap from './StationsMap'
import Calculator from './Calculator'

const MapRouter = ({ user }) => {
  return(
    <Router>
      <Switch>
        {
          ["/", "/map"].map(path => (
            <Route 
              path={path}
              exact
              render={() => <ChargeInformation user={user} />}
            />
          ))
        }
        <Route path="/calculator" component={Calculator} />
        <Route path="/charge_information/:number" component={ChargeInformation} />
      </Switch>
    </Router>
  )
}

export default MapRouter;