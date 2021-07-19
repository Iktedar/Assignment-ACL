import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Report from '../views/report/Report';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import clsx from "clsx";
import Header from "./Header";

const useStyles = makeStyles({
    root: {
      display: "flex"
    },
    MainContainer: {
        padding: '2rem 120px',
        position: "relative",
        top: '100px'
    }
})

const Content = () => {
    const classes = useStyles();
    return (
        <div className={classes.MainContainer}>
            <Header/>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: true
                })}
            >
                <div className={classes.drawerHeader} />
                <Router>
                    <React.Suspense>
                        <Switch>
                            <Route path="/report" component={Report}/>
                        </Switch>
                    </React.Suspense>
                </Router>
            </main>
        </div>
    )
}

export default Content;
