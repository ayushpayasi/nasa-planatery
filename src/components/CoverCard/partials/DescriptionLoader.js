import { Skeleton, Box } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
export default function DescriptionLoader({ width, lines }) {
	const arr = [...Array(lines).keys()];
	return (
		<Box my={4} width={width}>
			{arr.map((item) => (
				<Skeleton width={"100%"} height="22px" key={item} />
			))}
		</Box>
	);
}

DescriptionLoader.propTypes = {
	width: PropTypes.string,
	lines: PropTypes.number,
};
DescriptionLoader.defaultProps = {
	lines: 5,
};
