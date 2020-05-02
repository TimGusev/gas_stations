import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import ChargesDatatable from './ChargesDatatable';
import ChargeInformation from './ChargeInformation';

const ProfileRouter = (user) => {
  return(
    <Router>
      <Switch>
        <Route 
          path="/users/:id"
          exact
          render={() => <ChargesDatatable user={user}/>}
        />
        <Route path="/charge_information/:number" component={ChargeInformation} />
      </Switch>
    </Router>
  )
}

export default ProfileRouter;