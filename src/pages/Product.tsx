// import React, { useEffect, useState } from 'react';
// import ProductComponent from '../components/ProductComponent';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useShoppingBag } from '../context/ShoppingBagContext';

// interface RouteParams {
//     productSlug: string;
// }

// const Product: React.FC = () => {
//     const { productSlug } = useParams<RouteParams>(); // Access productSlug from route parameters
//     const { addToBag } = useShoppingBag();
//     const navigate = useNavigate(); 

//     // Function to handle navigation
//     const handleNavigation = () => {
//         navigate(`/product/${productSlug}`); // Navigate to the specified URL
//     };

//     return (
//         <div>
//             <ProductComponent productSlug={productSlug} handleAddToBag={addToBag} /> {/* Pass addToBag as handleAddToBag prop to ProductComponent */}
//         </div>
//     );
// }

// export default Product;






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
