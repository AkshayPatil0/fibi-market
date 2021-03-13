import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
	makeStyles
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
	root: {},
	card: {
		fontSize: theme.spacing(1)
	}
}));


import TextInput from "../common/input";

import { useProfileHook } from "./profile-hook";

const ProfileDetails = ({ className, ...rest }) => {
	const classes = useStyles();
	const { updateProfile, user, deleteAvatar } = useProfileHook();

	const [formData, setFormData] = useState({
		firstName: user?.firstName,
		lastName: user?.lastName,
		role: user?.role,
		avatar: null,
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		await updateProfile(formData);
	};


	return (
		<form
			autoComplete="off"
			noValidate
			className={clsx(classes.root, className)}
			{...rest}
		>
			<Card className={classes.card}>
				<CardHeader
					subheader="The information can be edited"
					title="Profile"
				/>
				<Divider />
				<CardContent>
					<Grid
						container
						spacing={2}
					>
						<TextInput
							name="firstName"
							label="First name"
							type="text"
							margin="normal"
							sm={6}
							value={formData.firstName}
							handleChange={handleChange}
						/>
						<TextInput
							name="lastName"
							label="Last name"
							type="text"
							margin="normal"
							sm={6}
							value={formData.lastName}
							handleChange={handleChange}
						/>
						<TextInput
							name="phone"
							label="Phone Number"
							type="text"
							margin="normal"
							sm={6}
							value={formData.phone}
							handleChange={handleChange}
						/>
					</Grid>
				</CardContent>
				<Divider />
				<Box
					display="flex"
					justifyContent="flex-end"
					p={2}
				>
					<Button
						color="primary"
						variant="contained"
					>
						Save details
          </Button>
				</Box>
			</Card>
		</form>
	);
};

ProfileDetails.propTypes = {
	className: PropTypes.string
};

export default ProfileDetails;