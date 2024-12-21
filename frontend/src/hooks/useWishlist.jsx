import { useContext } from "react";
import { WishlistContext } from "../cartWishlistProvider/WishlistProvider";

const useWishlist = () => {
	return useContext(WishlistContext);
};

export default useWishlist;
