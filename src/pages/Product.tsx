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
