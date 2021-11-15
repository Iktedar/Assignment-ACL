import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Movies from '../views/Movies';

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import clsx from "clsx";

const useStyles = makeStyles({
    root: {
      display: "flex"
    },
    MainContainer: {
        padding: '2rem 120px',
        position: "relative",
    }
})

const Content = () => {
    const classes = useStyles();
    return (
        <div className={classes.MainContainer}>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: true
                })}
            >
                <div className={classes.drawerHeader} />
                <Router>
                    <React.Suspense>
                        <Switch>
                            <Route path="/" component={Movies}/>
                        </Switch>
                    </React.Suspense>
                </Router>
            </main>
        </div>
    )
}

export default Content;
