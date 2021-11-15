import React from 'react';
import { useHistory } from "react-router-dom";
// import classes from './Login.module.css';
import {
		Button,
		TextField,
		Paper,
		Typography,
		CssBaseline,
		Container,
		ThemeProvider,
        Tabs,
        Tab
		} from "@material-ui/core";

import { makeStyles, createTheme } from '@material-ui/core/styles';
import {CardMembership, Person, Check, Payment} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
		paper: {
			marginTop: theme.spacing(8),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		form: {
			width: '100%',
			marginTop: theme.spacing(1),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
			height: '60px'
		},
		MyFormInput: {
			marginBottom: '32px',
			marginTop: '0',
			
		},
		MyContainer: {
			width: '70%',
			color: '#707070'
		},
		MyPaper: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			padding: '1rem',
			width: '540px',
			height: '650px'
		},
		MainContainer: {
			top: '215px',
			position: 'absolute',
			marginLeft: 'auto',
			marginRight: 'auto',
			left: '0',
			right: '0',
			opacity: '1',
			display: 'flex',
			justifyContent:'center',
			alignItems: 'center',
		},
		formLabels: {
			fontSize: '20px',
			
		}
}));

const Login = () => {
	const history = useHistory();
	const classes = useStyles();
	const theme = createTheme({
		typography: {
			fontFamily: [
			  'Open Sans', 
			  'sans-serif'
			].join(','),
		},
		palette: {
			primary: {
				main: "#3B87FF",
			},
			secondary: {
				main: "#ffa500"
			},
		}
	});

	const loginUser = () => {
		history.push('/report');
	}

	return(
		<ThemeProvider theme={theme}>
		<Container component="main" className={classes.MainContainer}>
			<CssBaseline />
			<Paper className={classes.MyPaper}>
				<div className={classes.MyContainer}>
					<Typography component="h1" variant="h5" align="center" style={{marginBottom: '4rem'}}>
						Login to your account
					</Typography>
                    <Tabs
                    value={0}
                    // onChange={handleChange}
                    aria-label="icon position tabs example"
                    >
                   
                    <Tab icon={<Person />} iconPosition="start" label="Detail" />
                    <Tab icon={<Payment />} iconPosition="start" label="Payment" />
                    <Tab icon={<Check />} iconPosition="start" label="Success" />

                    </Tabs>
					<form className={classes.form} noValidate>
						<Typography variant="body1" className={classes.formLabels} gutterBottom>
							<b>Email or Username:</b>
						</Typography>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							name="email"
							autoComplete="email"
							autoFocus
							className={classes.MyFormInput}
							/>
						<Typography variant="body1" className={classes.formLabels} gutterBottom>
							<b>Password:</b>
						</Typography>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							type="password"
							id="password"
							autoComplete="current-password"
							className={classes.MyFormInput}
							/>
						<Button 
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							style={{textTransform: 'none', fontSize: '24px'}}
							className={classes.submit}
							size="large"
							onClick={() => loginUser()}
							>
						Login
						</Button>
					</form>
				</div>
			</Paper>
		</Container>
		</ThemeProvider>
		
	)
}
export default Login;