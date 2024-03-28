import { useState, useEffect } from 'react';
import { server_calls } from '../api/server';
import ProductComponent from '../components/ProductComponent';

interface ProductData {
    id: string;
    category: string;
    name: string;
    slug: string;
    product_sku: string;
    description: string;
    price: string;
    is_featured: boolean;
    images: ImageData[];
}

interface ProductProps {
    productSlug: string;
}

const Product: React.FC<ProductProps> = ({ productSlug }) => {
    const [productId, setProductId] = useState<string>('');

    useEffect(() => {
        // Function to fetch product data based on productSlug and set the productId
        const fetchProductId = async () => {
            try {
                const productData: ProductData = await server_calls.get(`product/${productSlug}`);
                setProductId(productData.id);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProductId(); // Call the function when the component mounts
    }, [productSlug]); // Dependency array to re-run effect when productSlug changes

    return (
        <div>
            <ProductComponent productId={productId} />
        </div>
    );
};

export default Product;

// check the Category.tsx to see if there is anything useful in there
// product will be passed in as a product slug and needs to return a product id so that product components can use the product id to fetch data