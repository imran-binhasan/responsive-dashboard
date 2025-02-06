import { useLoaderData } from "react-router-dom";

const Product = () => {
    const product = useLoaderData();
    console.log(product)
    return (
        <div>
            <p>{product?.name}</p>
            <p>{product?.data?.color}</p>
            <p>{product?.data?.capacity}</p>
        </div>
    );
};

export default Product;