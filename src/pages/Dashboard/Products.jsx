import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name"); // Default sort by name
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order

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
      const res = await axios.get("https://api.restful-api.dev/objects");
      const fetchedProducts = res.data;

      // Get saved product IDs from localStorage
      const savedProductIds =
        JSON.parse(localStorage.getItem("addedProductIds")) || [];

      // Fetch additional products from localStorage IDs
      const additionalProducts = await Promise.all(
        savedProductIds.map(async (id) => await fetchProductById(id))
      );

      // Combine fetched products and additional products
      setProducts([...fetchedProducts, ...additionalProducts]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle product search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle product sorting
  const handleSort = (e) => {
    const { value } = e.target;
    setSortBy(value);
  };

  // Toggle sort order (ascending/descending)
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Sort and filter products
  const sortedFilteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const color = form.color.value;
    const capacity = form.capacity.value;

    const res = await axios.post("https://api.restful-api.dev/objects", {
      name: name,
      data: {
        color: color,
        capacity: capacity,
      },
    });

    if (res.status === 200) {
      // Add the new product's ID to localStorage
      const savedProductIds =
        JSON.parse(localStorage.getItem("addedProductIds")) || [];
      savedProductIds.push(res.data.id);
      localStorage.setItem("addedProductIds", JSON.stringify(savedProductIds));

      // Optionally update the UI by adding the new product
      setProducts([...products, res.data]);
    }
  };

  const handleRemoveProduct = (id, productName) => {
    // Remove product from localStorage
    let savedProductIds =
      JSON.parse(localStorage.getItem("addedProductIds")) || [];
    savedProductIds = savedProductIds.filter((productId) => productId !== id);
    localStorage.setItem("addedProductIds", JSON.stringify(savedProductIds));

    // Remove product from state
    setProducts(products.filter((product) => product.id !== id));

    // Show notification for successful removal
    notifyRemove(productName);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    <Helmet>
      <title>Products</title>
    </Helmet>
    <div className="mb-10">
      <h2 className="text-2xl font-bold my-4 text-gray-700">Products Dashboard</h2>
  
      {/* Search and Sort Controls */}
      <div className="flex mb-6 space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 w-full rounded-lg"
          placeholder="Search products..."
        />
        <select
          onChange={handleSort}
          value={sortBy}
          className="border p-2 rounded-lg"
        >
          <option value="name">Name</option>
          <option value="data.color">Color</option>
          <option value="data.capacity">Capacity</option>
        </select>
        <button
          onClick={toggleSortOrder}
          className="border p-2 rounded-lg bg-gray-300"
        >
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>
  
      {/* Table with horizontal scrolling for small screens */}
      <div className="overflow-x-auto">
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
              sortedFilteredProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                  <td className="py-3 px-4 text-gray-700">{product.name}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {product.data ? product.data.color : "-"}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {product.data ? product.data.capacity : "-"}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    <Link
                      to={`/dashboard/product/${product.id}`}
                      className="border py-1.5 px-3 bg-blue-500 text-white rounded mr-2"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() =>
                        handleRemoveProduct(product.id, product.name)
                      }
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
    </div>
  
    <div className="bg-white/70 p-8 rounded-lg mt-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Add Product</h2>
      <form onSubmit={handleAddProduct} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-600">
            Product Color
          </label>
          <input
            type="text"
            name="color"
            id="color"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product color"
          />
        </div>
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-600">
            Product Capacity
          </label>
          <input
            type="text"
            name="capacity"
            id="capacity"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product capacity"
          />
        </div>
        <div className="mt-4">
          <input
            type="submit"
            value="Add Product"
            className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 cursor-pointer transition-all"
          />
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default Products;
