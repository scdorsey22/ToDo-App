import { createTheme } from "@mui/system";


export const Styles = createTheme({
	paper: {
		marginTop: 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: 1,
		backgroundColor: "#9c27b0"
	},
	form: {
		width: '100%',
		marginTop: 1
	},
	submit: {
		margin: [3, 0, 2]
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