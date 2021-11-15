import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";
import Content from "./layout/Content";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex"
  },
}));


function App() {
  
  const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#3B87FF",
        },
        secondary: {
            main: "#ffa500"
        },
        submit: {
            '&:hover': {
                backgroundColor: 'black',
                color: '#FFF'
            }
        },
        MyCard: {
            boxShadow: '0px 4px 10px #03030329'
        }
    }
  });

  const classes = useStyles();
  return (
    
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Router>
           <React.Suspense>
             <Switch>
              <Route path="/" component={Content}/>
             </Switch>
           </React.Suspense>
       </Router>
        
      </div>
    </ThemeProvider>
  )
}

export default App;
