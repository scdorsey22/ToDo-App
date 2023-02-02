import { Component } from "react";
import { Avatar, Button, CSSBaseline, Link, Grid, LockOutlinedIcon } from "@mui/material";
import { TextField, Typography, Container, CircularProgress } from "@mui/material";
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
        this.state({
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
	


}
