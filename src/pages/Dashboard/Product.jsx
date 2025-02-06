import { useLoaderData } from "react-router-dom";

const Product = () => {
    const product = useLoaderData();
    const { name, data } = product || {};
    const { color, capacity } = data || {};

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6 border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-800">{name || "Unnamed Product"}</h2>
            <div className="mt-4 flex flex-col items-center space-y-2">
                <p className="text-gray-700">
                    🎨 Color: <span className="font-semibold">{color || "N/A"}</span>
                </p>
                <p className="text-gray-700">
                    ⚡ Capacity: <span className="font-semibold">{capacity || "N/A"}</span>
                </p>
            </div>
        </div>
    );
};

export default Product;
