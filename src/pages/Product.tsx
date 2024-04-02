import React from 'react';
import ProductComponent from '../components/ProductComponent';
import { useParams } from 'react-router-dom';

interface RouteParams {
    productSlug: string;
}

const Product: React.FC = () => {
    const { productSlug } = useParams<RouteParams>(); // Access productSlug from route parameters
    return (
        <div>
            <ProductComponent productSlug={productSlug} /> {/* Pass productSlug to ProductComponent */}
        </div>
    );
}

export default Product;







// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { server_calls } from '../api/server';
// import ProductComponent from '../components/ProductComponent';

// interface CategoryData {
//     id: number;
//     name: string;
//     slug: string;
//     category_sku: string;
//     is_featured: boolean;
//     ordering: number;
// }

// interface ProductData {
//     id: number;
//     category: number;
//     name: string;
//     slug: string;
//     product_sku: string;
//     description: string;
//     price: string;
//     is_featured: boolean;
//     images: ImageData[];
// }

// interface RouteParams {
//     categorySlug: string;
//     productSlug: string;
// }

// const Product: React.FC = () => {
//     const { productSlug } = useParams<RouteParams>();
//     const [productId, setProductId] = useState<number>(0);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');
//     const [product, setProduct] = useState<ProductData | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const productData: ProductData[] = await server_calls.get<ProductData[]>(`product/${categorySlug}/${productSlug}/`);
//                 const foundProduct = productData.find((product) => product.slug === productSlug);
//                 if (foundProduct) {
//                     setProductId(foundProduct.id);
//                     setProduct(foundProduct);
//                 } else {
//                     setError('Product not found');
//                 }
//             } catch (error) {
//                 setError(error.message || 'An error occurred while fetching data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [productSlug]);

//     return (
//         <div className=''>
//             {loading && <p>Loading...</p>}
//             {error && <p>{error}</p>}
//             {product && (
//                 <div key={product.id}>
//                     <h1 className='bg-primary-purple text-center font-bold text-white'>{product.name}</h1>
//                     <div>
//                         <ProductComponent productId={productId} />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Product;






// import { useState, useEffect } from 'react';
// import { server_calls } from '../api/server';
// import ProductComponent from '../components/ProductComponent';

// interface ProductData {
//     id: number;
//     category: number;
//     name: string;
//     slug: string;
//     product_sku: string;
//     description: string;
//     price: string;
//     is_featured: boolean;
//     images: ImageData[];
// }

// interface ProductProps {
//     productSlug: string;
// }

// const Product: React.FC<ProductProps> = ({ productSlug }) => {
//     const [productId, setProductId] = useState<string>('');

//     useEffect(() => {
//         // Function to fetch product data based on productSlug and set the productId
//         const fetchProductId = async () => {
//             try {
//                 const productData: ProductData = await server_calls.get(`product/${productSlug}`);
//                 setProductId(productData.id);
//             } catch (error) {
//                 console.error('Error fetching product data:', error);
//             }
//         };

//         fetchProductId(); // Call the function when the component mounts
//     }, [productSlug]); // Dependency array to re-run effect when productSlug changes

//     return (
//         <div>
//             <ProductComponent productId={productId} />
//         </div>
//     );
// };

// export default Product;

// check the Category.tsx to see if there is anything useful in there
// product will be passed in as a product slug and needs to return a product id so that product components can use the product id to fetch data