import React from "react";
import PropTypes from "prop-types";

// Material
import {
	Box,
	Typography,
	Grid,
	Dialog,
	useTheme,
	useMediaQuery,
} from "@mui/material";

export default function DialogBox({ dialogData, setDialogData, open }) {
	const { title, description, author, image } = dialogData;

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Dialog
			fullWidth={true}
			maxWidth={"md"}
			open={open}
			onClose={() => setDialogData(null)}
			dialogData={dialogData}
			sx={{ overflow: "hidden" }}
		>
			<Box px={3} py={4}>
				<Grid container wrap="wrap-reverse">
					<Grid
						item
						xs={12}
						md={7}
						sx={{ paddingRight: isMobile ? "0px" : "12px" }}
					>
						{title && (
							<Typography
								sx={{
									fontFamily: `'Montserrat', sans-serif`,
									fontSize: isMobile ? "18px" : "24px",
									fontWeight: "700",
									textAlign: isMobile ? "center" : "left",
								}}
							>
								{title}
							</Typography>
						)}
						{description && (
							<Typography
								sx={{
									fontFamily: `'Montserrat', sans-serif`,
									fontSize: isMobile ? "14px" : "18px",
									fontWeight: "500",
									marginTop: "28px",
								}}
							>
								{description}
							</Typography>
						)}
						{author && (
							<Typography
								sx={{
									paddingTop: "16px",
									fontFamily: `'Montserrat', sans-serif`,
								}}
							>
								-{author}
							</Typography>
						)}
					</Grid>
					<Grid item xs={12} md={5}>
						{image && (
							<img
								style={{
									borderRadius: "15px",
									width: "100%",
									height: "350px",
								}}
								src={image.src}
								alt={image.alt}
							/>
						)}
					</Grid>
				</Grid>
			</Box>
		</Dialog>
	);
}

DialogBox.propTypes = {
	dialogData: PropTypes.object,
	setDialogData: PropTypes.func,
	open: PropTypes.bool,
};
