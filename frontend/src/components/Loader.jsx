import GridLoader from "react-spinners/GridLoader";

const Loader = () => {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<GridLoader
				loading="true"
				color="#2776EA"
				size={20}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
};

export default Loader;
