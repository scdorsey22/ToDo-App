
import { Avatar, Button, TextField, Link, Grid, CircularProgress } from "@mui/material";
import { CssBaseline, Typography, Container, Paper } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme } from "@mui/material/styles";
import { withRouter } from "../util/withRouter";

import axios from 'axios'
import { Component } from "react";


const theme = createTheme()


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
			console.log(response.data)
			localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
			this.setState({
				loading: false
			});
			this.props.navigate('/');
		})
		.catch((error) => {
			console.log(error)
			this.setState({
				errors: error.response.data,
				loading: false
			});
		});
};

render() {
	const { errors, loading } = this.state;
	return (
		
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Paper 
			elevation={0}
			sx={{
				display: 'flex', 
				flexDirection: 'column', 
				marginTop: theme.spacing(8),
				alignItems: 'center'
			}}>
				<Avatar sx={{
					margin: theme.spacing(1),
					backgroundColor: theme.palette.secondary.main,
				}}>
					<LockOutlinedIcon />
				</Avatar >
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<form className="form-class" noValidate>
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
						sx={{
							width: '100%',
							marginTop: theme.spacing(1)
						}}
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
						sx={{
							margin: theme.spacing(3, 0, 2)
						}}
						disabled={loading || !this.state.email || !this.state.password}
					>
						Sign In
						{loading && <CircularProgress size={30} sx={{position: 'absolute'}} />}
					</Button>
					<Grid container>
						<Grid item>
							<Link href="signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
					{errors.general && (
						<Typography variant="body2" sx={{color: 'red', fontSize: '0.8rem', marginTop: 10}} >
							{errors.general}
						</Typography>
					)}
				</form>
			</Paper>
		</Container>
	
	);
}

}

export default withRouter(Login)