import React, { useEffect, useState } from "react";

// comps
import CoverCard from "./components/CoverCard";
import PlanetaryCard from "./components/PlanetaryCard";
import HeaderSection from "./components/HeaderSection";
import InfiniteScroll from "react-infinite-scroll-component";
import DialogBox from "./components/DialogBox";

// Material
import {
	Box,
	useTheme,
	Grid,
	CircularProgress,
	Typography,
} from "@mui/material";

// utils
import { deserializePlanetaryList } from "./utils/deserializePlanetaryInfo";
import moment from "moment";
import { getPlanetaryDetails } from "./api";

// constants
const TOP_CARDS_LENGTH = 7;

export default function App() {
	const theme = useTheme();

	const [coverLoading, setCoverLoading] = useState(true);
	const [coverData, setCoverData] = useState({});
	const [topCardsLoading, setTopCardLoading] = useState(true);
	const [infiniteScrollLoading, setInfiniteScrollLoading] = useState(true);
	const [infiniteScrollData, setInfiniteScrollData] = useState([]);
	const [subtractMonth, setSubtractMonth] = useState(1);
	const [dialogData, setDialogData] = useState(null);
	const [topCardsData, setTopCardsData] = useState([
		...Array(TOP_CARDS_LENGTH).map(() => {}),
	]);

	useEffect(() => {
		const payload = {
			start_date: moment("2022-11-14")
				.subtract(1, "month")
				.format("YYYY-MM-DD"),
			end_date: moment("2022-11-14").format("YYYY-MM-DD"),
			thumbs: true,
		};
		getPlanetaryDetails(payload)
			.then((res) => {
				let planateryList = deserializePlanetaryList(res.data);
				if (planateryList && planateryList.length) {
					planateryList = planateryList.reverse();
					setCoverData(planateryList.pop());
					setCoverLoading(false);
					setTopCardsData(planateryList.slice(0, TOP_CARDS_LENGTH));
					setTopCardLoading(false);
					setInfiniteScrollData(
						planateryList.slice(TOP_CARDS_LENGTH)
					);
					setInfiniteScrollLoading(false);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	const fetchNextData = () => {
		const payload = {
			start_date: moment("2022-11-14")
				.subtract(subtractMonth + 1, "month")
				.format("YYYY-MM-DD"),
			end_date: moment("2022-11-14")
				.subtract(subtractMonth, "month")
				.format("YYYY-MM-DD"),
			thumbs: true,
		};
		getPlanetaryDetails(payload)
			.then((res) => {
				let planateryList = deserializePlanetaryList(res.data);
				if (planateryList && planateryList.length) {
					planateryList = planateryList.reverse();
					setInfiniteScrollData([
						...infiniteScrollData,
						...planateryList,
					]);
					setInfiniteScrollLoading(false);
				}
				setSubtractMonth(subtractMonth + 1);
			})
			.catch((err) => console.log(err));
	};

	return (
		<Box px={2} py={1}>
			{/* Header Section */}
			<HeaderSection name={"Ayush Payasi"} />

			{/* POPUP DIALOG SECTION */}
			{dialogData && (
				<DialogBox
					open={Boolean(dialogData)}
					setDialogData={setDialogData}
					dialogData={dialogData}
				/>
			)}

			{/* COVER CARD SECTION */}
			<CoverCard
				loading={coverLoading}
				{...coverData}
				onClick={() => {
					setDialogData(coverData);
				}}
			/>

			{/* CAROUSEL SECTION */}
			<Box
				my={2}
				sx={{
					overflowX: "auto",
					display: "flex",
					padding: theme.spacing(0, 0, 2),
					"&>:nth-child(n)": {
						padding: theme.spacing(0, 1),
					},
					"&>:last-child": {
						padding: theme.spacing(0, 2, 0, 1),
					},
					"&>:first-child": {
						padding: theme.spacing(0, 1, 0, 0),
					},
				}}
			>
				{topCardsData.map((planateryInfo, index) => (
					<Box
						key={index}
						sx={{
							display: "flex",
							flex: "1",
							width: "270px",
							minWidth: "270px",
							maxWidth: "270px",
							[theme.breakpoints.down("xs")]: {
								width: "100%",
								minWidth: "unset",
								maxWidth: "unset",
							},
						}}
					>
						<PlanetaryCard
							loading={topCardsLoading}
							{...planateryInfo}
							onClick={() => {
								setDialogData(planateryInfo);
							}}
						/>
					</Box>
				))}
			</Box>

			{/* INFINITE SCROLL SECTION */}
			<InfiniteScroll
				dataLength={infiniteScrollData.length}
				next={fetchNextData}
				hasMore={true}
				loader={
					<Box
						height="80px"
						width="100%"
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						<CircularProgress
							sx={{ color: "white", opacity: "0.65" }}
						/>
					</Box>
				}
				endMessage={
					<Typography sx={{ textAlign: "center" }}>
						There is nothing more left!
					</Typography>
				}
			>
				<Grid mt={5} container spacing={2}>
					{infiniteScrollData &&
						infiniteScrollData.map((planetInfo, index) => (
							<Grid
								key={index}
								item
								xs={12}
								xl={2}
								lg={3}
								md={4}
								sm={6}
								display={"flex"}
							>
								<PlanetaryCard
									loading={infiniteScrollLoading}
									{...planetInfo}
									onClick={() => {
										setDialogData(planetInfo);
									}}
								/>
							</Grid>
						))}
				</Grid>
			</InfiniteScroll>
		</Box>
	);
}
