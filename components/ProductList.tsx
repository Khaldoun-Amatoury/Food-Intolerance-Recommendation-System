import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../lib/types";

interface ProductListProps {
  intolerance: string;
}

const ProductList: React.FC<ProductListProps> = ({ intolerance }) => {
  const [safeProducts, setSafeProducts] = useState<Product[]>([]);
  const [unsafeProducts, setUnsafeProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [safePage, setSafePage] = useState(1);
  const [unsafePage, setUnsafePage] = useState(1);
  const [safeTotalPages, setSafeTotalPages] = useState(1);
  const [unsafeTotalPages, setUnsafeTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async (productType: "safe" | "unsafe") => {
      try {
        setLoading(true);
        const page = productType === "safe" ? safePage : unsafePage;
        const response = await axios.get(
          `/api/recommendations?intolerance=${intolerance}&page=${page}&limit=10&productType=${productType}`
        );
        if (productType === "safe") {
          setSafeProducts(response.data.products);
          setSafeTotalPages(response.data.totalPages);
        } else {
          setUnsafeProducts(response.data.products);
          setUnsafeTotalPages(response.data.totalPages);
        }
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching ${productType} products:`, error);
        setLoading(false);
      }
    };

    fetchProducts("safe");
    fetchProducts("unsafe");
  }, [intolerance, safePage, unsafePage]);

  const handlePageChange = (
    productType: "safe" | "unsafe",
    newPage: number
  ) => {
    if (productType === "safe") {
      setSafePage(newPage);
    } else {
      setUnsafePage(newPage);
    }
  };

  const renderProductList = (
    products: Product[],
    title: string,
    page: number,
    totalPages: number,
    productType: "safe" | "unsafe"
  ) => (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.ProductName} className="border rounded p-4">
            <img
              src={product.Image_Url}
              alt={product.ProductName}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="font-bold">{product.ProductName}</h3>
            <p>Brand: {product.Brand}</p>
            <p>Price: ₹{product.Price}</p>
            <p>Category: {product.Category}</p>
            <p>SubCategory: {product.SubCategory}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange(productType, page - 1)}
          disabled={page === 1}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(productType, page + 1)}
          disabled={page === totalPages}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  return (
    <div>
      {renderProductList(
        safeProducts,
        "Safe Products",
        safePage,
        safeTotalPages,
        "safe"
      )}
      {renderProductList(
        unsafeProducts,
        "Products to Avoid",
        unsafePage,
        unsafeTotalPages,
        "unsafe"
      )}
    </div>
  );
};

export default ProductList;
