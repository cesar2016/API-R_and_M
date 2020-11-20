import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import {connect} from 'react-redux';
import { UIRouter, UIView, pushStateLocationPlugin} from '@uirouter/react';
import states from './routes/routes'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { esES } from '@material-ui/core/locale';
import Navbar from './components/modules/Navbar';
import Sidebar from './components/modules/Sidebar'; 
import Customers from './components/customers/Customers';
import Galery from './components/customers/Galery'
import Detayls from './components/customers/Detayls'


const plugins = [
  pushStateLocationPlugin
];

function App() {


    const theme = createMuiTheme({
      palette: {
        primary: { main: '#2196f3' },
        secundary: { main: '#ff1744' }
      },
    }, esES);

  return (
    <UIRouter plugins={plugins} states={states}>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          {/* <UIView /> */}
          <Route exact path="/" component={Customers} />
          <Route path="/" component={Navbar} />
          <Route path="/" component={Sidebar} />
          <Route path="/galery" component={Galery} />
          <Route path="/detayls/:id" render={({match}) => <Detayls id={match.params.id}/> }
          />         
        </ThemeProvider>
      </CssBaseline>
    </UIRouter>
  );
}

export default connect(null, null)(App);
