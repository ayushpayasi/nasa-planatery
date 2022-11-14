import React from "react";
import PropTypes from "prop-types";
import { Box, CircularProgress, Skeleton, Typography } from "@mui/material";
export default function PlanetaryCard({
	loading,
	image,
	title,
	date,
	onClick,
}) {
	return (
		<Box
			sx={{
				borderRadius: "15px",
				width: "100%",
				boxShadow: "0px 0px 5px 0px rgba(255,255,255,0.75)",
				overflow: "hidden",
				background: "rgba(217, 217, 217,0.8)",
				cursor: "pointer",
				"&:hover": {
					boxShadow: "0px 0px 5px 1px rgba(255,255,255,0.75)",
				},
			}}
			onClick={() => !loading && onClick()}
		>
			{!loading ? (
				image && (
					<Box sx={{ width: "100%", height: "165px" }}>
						<img
							style={{ width: "100%", height: "100%" }}
							src={image.thumbnail || image.src}
							alt={image.alt}
						/>
					</Box>
				)
			) : (
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					height="165px"
				>
					<CircularProgress
						sx={{ color: "black", opacity: "0.25" }}
					/>
				</Box>
			)}
			<Box px={1} py={1}>
				{!loading ? (
					title && (
						<Typography
							sx={{
								fontFamily: `'Montserrat', sans-serif`,
								fontSize: "18px",
								fontWeight: "500",
								marginTop: "5px",
							}}
						>
							{title}
						</Typography>
					)
				) : (
					<>
						<Skeleton width="98%" height="22px" />
						<Skeleton width="90%" height="22px" />
					</>
				)}
				{!loading ? (
					date && (
						<Typography
							sx={{
								fontFamily: `'Montserrat', sans-serif`,
								fontSize: "12px",
								fontWeight: "500",
								marginTop: "5px",
								textAlign: "right",
							}}
						>
							{date}
						</Typography>
					)
				) : (
					<Box
						pt={2}
						display="flex"
						alignItems="center"
						justifyContent="flex-end"
					>
						<Skeleton width="30%" />
					</Box>
				)}
			</Box>
		</Box>
	);
}

PlanetaryCard.propTypes = {
	date: PropTypes.string,
	loading: PropTypes.bool,
	title: PropTypes.string,
	image: PropTypes.object,
	onClick: PropTypes.func,
};
