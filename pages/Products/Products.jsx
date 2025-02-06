import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // For loading animation
import { toast } from "react-toastify"; // For notifications
import 'react-toastify/dist/ReactToastify.css'; // Ensure styles are imported

// Notify with success
const notifyRemove = (productName) => {
    toast.success(`${productName} has been removed!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
    });
};

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch a single product by ID from the API
    const fetchProductById = async (id) => {
        const res = await axios.get(`https://api.restful-api.dev/objects/${id}`);
        return res.data;
    };

    // Function to fetch all products (including those from localStorage)
    const fetchProducts = async () => {
        try {
            setLoading(true);
            // Fetch the default products from the API
            const res = await axios.get('https://api.restful-api.dev/objects');
            const fetchedProducts = res.data;

            // Get saved product IDs from localStorage
            const savedProductIds = JSON.parse(localStorage.getItem('addedProductIds')) || [];

            // Fetch additional products from localStorage IDs
            const additionalProducts = await Promise.all(
                savedProductIds.map(async (id) => await fetchProductById(id))
            );

            // Combine fetched products and additional products
            setProducts([...fetchedProducts, ...additionalProducts]);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const color = form.color.value;
        const capacity = form.capacity.value;

        const res = await axios.post('https://api.restful-api.dev/objects', {
            name: name,
            data: {
                color: color,
                capacity: capacity
            }
        });

        if (res.status === 200) {
            // Add the new product's ID to localStorage
            const savedProductIds = JSON.parse(localStorage.getItem('addedProductIds')) || [];
            savedProductIds.push(res.data.id);
            localStorage.setItem('addedProductIds', JSON.stringify(savedProductIds));

            // Optionally update the UI by adding the new product
            setProducts([...products, res.data]);
        }
    };

    const handleRemoveProduct = (id, productName) => {
        // Remove product from localStorage
        let savedProductIds = JSON.parse(localStorage.getItem('addedProductIds')) || [];
        savedProductIds = savedProductIds.filter(productId => productId !== id);
        localStorage.setItem('addedProductIds', JSON.stringify(savedProductIds));

        // Remove product from state
        setProducts(products.filter(product => product.id !== id));

        // Show notification for successful removal
        notifyRemove(productName);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-700">Products Dashboard</h2>
                <table className="min-w-full mt-4 border-collapse">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Product</th>
                            <th className="py-3 px-4 text-left">Color</th>
                            <th className="py-3 px-4 text-left">Capacity</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    <ClipLoader color="#4A90E2" loading={loading} size={50} />
                                </td>
                            </tr>
                        ) : (
                            products.map((product, index) => (
                                <tr key={product.id} className="border-t hover:bg-gray-50 transition duration-200">
                                    <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                                    <td className="py-3 px-4 text-gray-700">{product.name}</td>
                                    <td className="py-3 px-4 text-gray-700">{product.data ? product.data.color : '-'}</td>
                                    <td className="py-3 px-4 text-gray-700">{product.data ? product.data.capacity : '-'}</td>
                                    <td className="py-3 px-4 text-gray-700">
                                        <Link to={`/dashboard/product/${product.id}`} className="border py-1.5 px-3 bg-blue-500 text-white rounded mr-2">Details</Link>
                                        <button
                                            onClick={() => handleRemoveProduct(product.id, product.name)}
                                            className="border py-1.5 px-3 bg-red-500 text-white rounded"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg mt-10">
                <h2 className="text-xl font-semibold text-gray-700">Add Product</h2>
                <form onSubmit={handleAddProduct} className="mt-4">
                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            className="border p-2 w-full rounded-lg"
                            placeholder="Enter product name"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="color"
                            className="border p-2 w-full rounded-lg"
                            placeholder="Enter product color"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="capacity"
                            className="border p-2 w-full rounded-lg"
                            placeholder="Enter product capacity"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Add Product"
                        className="border py-2 px-4 bg-green-500 text-white rounded cursor-pointer w-full"
                    />
                </form>
            </div>
        </div>
    );
};

export default Products;
