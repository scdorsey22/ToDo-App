import { Component } from "react";
import { Avatar, Button, CssBaseline, Link, Grid, Paper} from "@mui/material";
import { TextField, Typography, Container, CircularProgress } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme } from "@mui/material";

import axios from "axios";

const theme = createTheme()

class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
			lastName: '',
			phoneNumber: '',
			country: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			errors: [],
			loading: false
        }
    }

    componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({
				errors: nextProps.UI.errors
			});
		}
	}

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const newUserData = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			phoneNumber: this.state.phoneNumber,
			country: this.state.country,
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		};
		axios
			.post('/signup', newUserData)
			.then((response) => {
				localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
				this.setState({ 
					loading: false,
				});	
				this.props.navigate('/');
			})
			.catch((error) => {
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
					<Avatar 
                    sx={{
                        margin: theme.spacing(1),
                        backgroundColor: theme.palette.secondary.main,
                    }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form  className="form-class" noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="firstName"
									label="First Name"
									name="firstName"
									autoComplete="firstName"
									helperText={errors.firstName}
									error={errors.firstName ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lastName"
									helperText={errors.lastName}
									error={errors.lastName ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="username"
									label="User Name"
									name="username"
									autoComplete="username"
									helperText={errors.username}
									error={errors.username ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="phoneNumber"
									label="Phone Number"
									name="phoneNumber"
									autoComplete="phoneNumber"
									pattern="[7-9]{1}[0-9]{9}"
									helperText={errors.phoneNumber}
									error={errors.phoneNumber ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									helperText={errors.email}
									error={errors.email ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="country"
									label="Country"
									name="country"
									autoComplete="country"
									helperText={errors.country}
									error={errors.country ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
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
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="confirmPassword"
									label="Confirm Password"
									type="password"
									id="confirmPassword"
									autoComplete="current-password"
									onChange={this.handleChange}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							sx={{
                                margin: theme.spacing(3, 0, 2)
                            }}
							onClick={this.handleSubmit}
                            disabled={loading || 
                                !this.state.email || 
                                !this.state.password ||
                                !this.state.firstName || 
                                !this.state.lastName ||
                                !this.state.country || 
                                !this.state.username || 
                                !this.state.phoneNumber}
						>
							Sign Up
							{loading && <CircularProgress size={30} sx={{position: 'absolute'}} />}
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Container>
		);
 }
	


}

export default Signup
