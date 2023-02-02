
import { Avatar, Button, TextField, Link, Grid, CircularProgress } from "@mui/material";
import { CssBaseline, Typography, Container } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from "@mui/material";
import { withStyles } from "@mui/material";
import { adaptV4Theme } from "@mui/material";



import axios from 'axios'
import { Component } from "react";
import { createTheme } from "@mui/material";


const styles = (theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
	},
	progess: {
		position: 'absolute'
	}
});



class Login extends Component {
	constructor(props) {
	super(props)

	this.state = {
		email: '',
		password: '',
		errors: [],
		loading: false
	}

}

componentWillReceiveProps(nextProps) {
	if("errors" in nextProps.UI){
		if (nextProps.UI.errors) {
		this.setState({
			errors: nextProps.UI.errors
		});
	}
	}
	
}

handleChange = (event) => {
	this.setState({
		[event.target.name]: event.target.value
	});
};

handleSubmit = (event) => {
	event.preventDefault();
	this.setState({ loading: true });
	const userData = {
		email: this.state.email,
		password: this.state.password
	};
	axios
		.post('/login', userData)
		.then((response) => {
			localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
			this.setState({
				loading: false
			});
			this.props.history.push('/login');
		})
		.catch((error) => {
			this.setState({
				errors: error.response.data,
				loading: false
			});
		});
};

render() {
	const { classes } = this.props;
	const { errors, loading } = this.state;
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar >
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<form noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						helperText={errors.email}
						error={errors.email ? true : false}
						onChange={this.handleChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						helperText={errors.password}
						error={errors.password ? true : false}
						onChange={this.handleChange}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={this.handleSubmit}
						disabled={loading || !this.state.email || !this.state.password}
					>
						Sign In
						{loading && <CircularProgress size={30}  />}
					</Button>
					<Grid container>
						<Grid item>
							<Link href="signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
					{errors.general && (
						<Typography variant="body2" >
							{errors.general}
						</Typography>
					)}
				</form>
			</div>
		</Container>
	);
}

}

export default withStyles(styles)(Login)