import React from "react";
import PropTypes from "prop-types";

// Material
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";

// assets
import logo from "../../assets/nasa-logo.svg";

export default function HeaderSection({ name }) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Grid container mb={6}>
			<Grid item xs={12} sm={6} md={7} lg={8}>
				<img
					height={isMobile ? "50px" : "44px"}
					width={isMobile ? "50px" : "44px"}
					src={logo}
					alt="NASA"
				/>
				<Typography
					sx={{
						fontFamily: `'Montserrat', sans-serif`,
						fontSize: "20px",
						fontWeight: "600",
						color: "white",
						lineHeight: isMobile ? "14px" : "28px",
					}}
				>
					{name}
				</Typography>
			</Grid>
			<Grid item mt={isMobile && 3} xs={12} sm={6} md={5} lg={4}>
				<Typography
					sx={{
						fontFamily: `'Montserrat', sans-serif`,
						fontSize: !isMobile ? "30px" : "24px",
						fontWeight: "600",
						color: "white",
						textAlign: isMobile ? "center" : "right",
						lineHeight: "36px",
						paddingLeft: !isMobile && "50px",
					}}
				>
					Astronomy Picture of the Day
				</Typography>
			</Grid>
		</Grid>
	);
}

HeaderSection.propTypes = {
	name: PropTypes.string,
};
