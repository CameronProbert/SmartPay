import { Button, FormControl, FormControlLabel, Input, InputLabel } from '@material-ui/core';
import { Loop } from '@material-ui/icons';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import { promisify } from 'util';
import './App.css';
import { Home } from './Home';
import { Login } from './Login';
import { Navbar } from './Navbar';
import { PaymentDisplay } from './PaymentDisplay';
import { QrScanner } from './QrScanner';
import { LoginFn, useAuth, User } from './useAuth';
import { Payment, usePayments } from './usePayment';

export enum AppRoute {
  home = '/',
  login = '/login',
  scan = '/scan',
  payment = '/payment',
}

const Page: React.FC = ({ children }) => {
  return <main style={{
    display: 'flex',
    flexDirection: 'column',
    padding: '20px'
  }}>
    {children}
  </main>;
};

function App() {
  const payments = usePayments();
  const auth = useAuth();
  return (
    <Router >
      <>
        <Navbar user={auth.loggedInUser} />
        <Page>
          <Switch>
            <Route exact path={AppRoute.home}>
              <Home user={auth.loggedInUser} onLogout={auth.logout} />
            </Route>
            <Route path={AppRoute.login}>
              {auth.loggedInUser ? <Redirect to={AppRoute.home} /> : <Login onLogin={auth.login} />}
            </Route>
            <Route path={AppRoute.scan}>
              <QrScanner onScan={payments.newPayment} />
            </Route>
            <Route path={AppRoute.payment}>
              {!payments.currentPayment || !auth.loggedInUser
                ? <Redirect to={AppRoute.home} />
                : <PaymentDisplay
                  user={auth.loggedInUser}
                  payment={payments.currentPayment}
                  onPaymentFailed={payments.paymentFail}
                  onPaymentSuccess={payments.paymentSuccess}
                  onPaymentRestart={payments.restart} />}
            </Route>
          </Switch>
        </Page>
      </>
    </Router>
  );
}

export default App;
