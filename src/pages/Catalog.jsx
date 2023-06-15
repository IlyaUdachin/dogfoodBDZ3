import Card from "../components/Card";
import { useContext } from "react";
import Context from "../context";
const Catalog = ({ products, setSrvProducts }) => {
	const { dogToken } = useContext(Context)
	return (
		<>
			{products?.map((e, i) => <Card img={e.pictures} key={e._id} {...e} dogToken={dogToken} setSrvProducts={setSrvProducts} />)}
		</>
	);
}

export default Catalog;
