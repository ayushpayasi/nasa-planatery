import React from "react";
import PropTypes from "prop-types";

// Material
import {
	Box,
	Typography,
	Grid,
	Skeleton,
	CircularProgress,
	useTheme,
	useMediaQuery,
} from "@mui/material";

// Comps
import DescriptionLoader from "./partials/DescriptionLoader";

export default function CoverCard({
	loading,
	title,
	description,
	author,
	image,
}) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	if (description && description.length >= 500) {
		description = description.slice(0, 500) + "...";
	}

	return (
		<Box
			px={3}
			py={4}
			mb={3}
			sx={{ background: "rgba(217, 217, 217,0.8)", borderRadius: "15px" }}
		>
			<Grid container wrap="wrap-reverse">
				<Grid
					item
					xs={12}
					md={7}
					sx={{ paddingRight: isMobile ? "0px" : "12px" }}
				>
					{!loading ? (
						title && (
							<Typography
								sx={{
									fontFamily: `'Montserrat', sans-serif`,
									fontSize: "24px",
									fontWeight: "700",
									textAlign: isMobile ? "center" : "left",
								}}
							>
								{title}
							</Typography>
						)
					) : (
						<Skeleton height="30px" width="90%" />
					)}
					{!loading ? (
						description && (
							<Typography
								sx={{
									fontFamily: `'Montserrat', sans-serif`,
									fontSize: "18px",
									fontWeight: "500",
									marginTop: "28px",
								}}
							>
								{description}
							</Typography>
						)
					) : (
						<DescriptionLoader width={"100%"} lines={5} />
					)}
					{!loading ? (
						author && (
							<Typography
								sx={{
									paddingTop: "16px",
									fontFamily: `'Montserrat', sans-serif`,
								}}
							>
								-{author}
							</Typography>
						)
					) : (
						<Skeleton height="22px" width="60px" />
					)}
				</Grid>
				<Grid
					item
					xs={12}
					md={5}
					sx={{
						display: loading ? "flex" : "block",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{!loading ? (
						image && (
							<img
								style={{
									borderRadius: "15px",
									width: "100%",
									height: "350px",
								}}
								src={image.src}
								alt={image.alt}
							/>
						)
					) : (
						<CircularProgress
							size={50}
							sx={{ color: "black", opacity: "0.25" }}
						/>
					)}
				</Grid>
			</Grid>
		</Box>
	);
}

CoverCard.propTypes = {
	loading: PropTypes.bool,
	title: PropTypes.string,
	description: PropTypes.string,
	author: PropTypes.string,
	image: PropTypes.object,
};
