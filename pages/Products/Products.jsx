import axios from "axios";
import { useEffect, useState } from "react";

const Products = () => {
    const [products,setProducts] = useState([])
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => setProducts(res.data))
    },[])
    console.log(products);
    return (
        <div>
            TOtal prodycts = {products.length}
            
        </div>
    );
};

export default Products;