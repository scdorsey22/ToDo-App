import { Component, forwardRef } from "react";
import { Typography, Dialog, AppBar, Toolbar, Slide, CardContent, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Button, TextField, Grid, Card, CardActions, CircularProgress, Box, Container } from "@mui/material";
import { AddCircle, Close } from "@mui/icons-material";
import { createTheme } from '@mui/material'

import axios from "axios";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { withRouter } from "../util/withRouter";
import { authMiddleWare } from "../util/auth";


const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createTheme()

class Todo extends Component {
    constructor(props) {
		super(props);

		this.state = {
			todos: '',
			title: '',
			body: '',
			todoId: '',
			errors: [],
			open: false,
			uiLoading: true,
			buttonType: '',
			viewOpen: false
		};

		this.deleteTodoHandler = this.deleteTodoHandler.bind(this);
		this.handleEditClickOpen = this.handleEditClickOpen.bind(this);
		this.handleViewOpen = this.handleViewOpen.bind(this);
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	componentWillMount = () => {
		authMiddleWare(this.props.navigate);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/todos')
			.then((response) => {
				this.setState({
					todos: response.data,
					uiLoading: false
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	deleteTodoHandler(data) {
		authMiddleWare(this.props.navigate);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		let todoId = data.todo.todoId;
		axios
			.delete(`todo/${todoId}`)
			.then(() => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	handleEditClickOpen(data) {
		this.setState({
			title: data.todo.title,
			body: data.todo.body,
			todoId: data.todo.todoId,
			buttonType: 'Edit',
			open: true
		});
	}

	handleViewOpen(data) {
		this.setState({
			title: data.todo.title,
			body: data.todo.body,
			viewOpen: true
		});
	}

	render() {
		const DialogTitle1 = (props) => {
			const { children, classes, onClose, ...other } = props;
			return (
				<DialogTitle disableTypography sx={{
                        minWidth: 470,
                    }} 
                    {...other}>
					<Typography variant="h6">{children}</Typography>
					{onClose ? (
						<IconButton aria-label="close" onClick={onClose} sx={{
                            position: 'absolute',
                            right: theme.spacing(1),
                            top: theme.spacing(1),
                            color: theme.palette.grey[500]}}>
							<Close />
						</IconButton>
					) : null}
				</DialogTitle>
			);
		};


		dayjs.extend(relativeTime);
		const { open, errors, viewOpen } = this.state;

		const handleClickOpen = () => {
			this.setState({
				todoId: '',
				title: '',
				body: '',
				buttonType: '',
				open: true
			});
		};

		const handleSubmit = (event) => {
			authMiddleWare(this.props.navigate);
			event.preventDefault();
			const userTodo = {
				title: this.state.title,
				body: this.state.body
			};
			let options = {};
			if (this.state.buttonType === 'Edit') {
				options = {
					url: `/todo/${this.state.todoId}`,
					method: 'put',
					data: userTodo
				};
			} else {
				options = {
					url: '/todo',
					method: 'post',
					data: userTodo
				};
			}
			const authToken = localStorage.getItem('AuthToken');
			axios.defaults.headers.common = { Authorization: `${authToken}` };
			axios(options)
				.then(() => {
					this.setState({ open: false });
					window.location.reload();
				})
				.catch((error) => {
					this.setState({ open: true, errors: error.response.data });
					console.log(error);
				});
		};

		const handleViewClose = () => {
			this.setState({ viewOpen: false });
		};

		const handleClose = (event) => {
			this.setState({ open: false });
		};

		if (this.state.uiLoading === true) {
			return (
				<Container sx={{
                    flexGrow: 1,
                    padding: theme.spacing(3)}}>
					<Box sx={theme.mixins.toolbar}/>
					{this.state.uiLoading && <CircularProgress size={150} sx={{
                            position: 'fixed',
                            zIndex: '1000',
                            height: '31px',
                            width: '31px',
                            left: '50%',
                            top: '35%'
                        }}  />}
				</Container>
			);
		} else {
			return (
				<Container sx={{
                    flexGrow: 1,
                    padding: theme.spacing(3)}}>
					<Box  sx={theme.mixins.toolbar}/>

					<IconButton
						sx={{
                            position: 'fixed',
                            bottom: 0,
                            right: 0
                        }}
						color="primary"
						aria-label="Add Todo"
						onClick={handleClickOpen}
					>
						<AddCircle style={{ fontSize: 60 }} />
					</IconButton>
					<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
						<AppBar sx={{
		                    position: 'relative',
	                        }}>
							<Toolbar>
								<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
									<Close />
								</IconButton>
								<Typography variant="h6" sx={{
                                        marginLeft: theme.spacing(2),
                                        flex: 1
                                    }}>
									{this.state.buttonType === 'Edit' ? 'Edit Todo' : 'Create a new Todo'}
								</Typography>
								<Button
									autoFocus
									color="inherit"
									onClick={handleSubmit}
									sx={{
                                        display: 'block',
                                        color: 'white',
                                        textAlign: 'center',
                                        position: 'absolute',
                                        top: 14,
                                        right: 10
                                    }}
								>
									{this.state.buttonType === 'Edit' ? 'Save' : 'Submit'}
								</Button>
							</Toolbar>
						</AppBar>

						<Box component="form"  noValidate 
                        sx={{
                            width: '98%',
                            marginLeft: 2,
                            marginTop: theme.spacing(3)
                        }}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="todoTitle"
										label="Todo Title"
										name="title"
										autoComplete="todoTitle"
										helperText={errors.title}
										value={this.state.title}
										error={errors.title ? true : false}
										onChange={this.handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="todoDetails"
										label="Todo Details"
										name="body"
										autoComplete="todoDetails"
										multiline
										rows={25}
										rowsMax={25}
										helperText={errors.body}
										error={errors.body ? true : false}
										onChange={this.handleChange}
										value={this.state.body}
									/>
								</Grid>
							</Grid>
						</Box>
					</Dialog>

					<Grid container spacing={2}>
						{this.state.todos.map((todo) => (
							<Grid item xs={12} sm={6}>
								<Card  variant="outlined" sx={{
                                    minWidth: 470,
                                    margin: 10,
                                    padding: theme.spacing(2)
                                    }}>
									<CardContent>
										<Typography variant="h5" component="h2">
											{todo.title}
										</Typography>
										<Typography  sx={{marginBottom: 12}} color="textSecondary">
											{dayjs(todo.createdAt).fromNow()}
										</Typography>
										<Typography variant="body2" component="p">
											{`${todo.body.substring(0, 65)}`}
										</Typography>
									</CardContent>
									<CardActions>
										<Button size="small" color="primary" onClick={() => this.handleViewOpen({ todo })}>
											{' '}
											View{' '}
										</Button>
										<Button size="small" color="primary" onClick={() => this.handleEditClickOpen({ todo })}>
											Edit
										</Button>
										<Button size="small" color="primary" onClick={() => this.deleteTodoHandler({ todo })}>
											Delete
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>

					<Dialog
						onClose={handleViewClose}
						aria-labelledby="customized-dialog-title"
						open={viewOpen}
						fullWidth
                        sx={{
                              "& .MuiPaper-root": {
                                maxWidth: "50%",  // Set your width here
                              },
                          }}
						
					>
						<DialogTitle1 id="customized-dialog-title" onClose={handleViewClose}>
							{this.state.title}
						</DialogTitle1>
						<DialogContent dividers>
							<TextField
								fullWidth
								id="todoDetails"
								name="body"
								multiline
								readonly
								rows={1}
								rowsMax={25}
								value={this.state.body}
								InputProps={{
									disableUnderline: true
								}}
                                sx={{margin: 0,
                                    padding: theme.spacing(2)}}
							/>
						</DialogContent>
					</Dialog>
				</Container>
			);
		}
	}
}


export default withRouter(Todo)