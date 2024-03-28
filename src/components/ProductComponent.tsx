import React, { useState, useEffect } from 'react';
import { server_calls, apiURL } from "../api/server";
import VariationModal from './VariationModal';

interface CategoryData {
    id: string;
    name: string;
    slug: string;
    sku: string;
    is_featured: boolean;
    ordering: string;
}

interface ImageData {
    id: string;
    product: string;
    image: string;
    thumbnail: string;
}

interface ProductData {
    id: string;
    category: CategoryData;
    name: string;
    slug: string;
    product_sku: string;
    description: string;
    price: string;
    is_featured: boolean;
    images: ImageData[];
}

interface ProductComponentProps {
  productId: string;
}

const ProductComponent: React.FC<ProductComponentProps> = ({ productId }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [product, setProduct] = useState<ProductData | null>(null);
    const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
    const [amount, setAmount] = useState<number>(1);
    const [category, setCategory] = useState<CategoryData | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const productData: ProductData = await server_calls.get(`product/${productId}`);
          setProduct(productData);
          setLoading(false);
        } catch (error) {
          setError(error.message || 'An error occurred while fetching data');
          setLoading(false);
        }
      };
  
      fetchData();
    }, [productId]);

    const handleImageClick = (index: number) => {
        setActiveImgIndex(index);
    };

    return (
        <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center bg-secondary-red'>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {product && (
                <>
                    <div className='flex flex-col gap-6 lg:w-2/4 p-10'>
                        {product.images && product.images.length > 0 && (
                            <img src={`${apiURL}/${product.images[activeImgIndex]?.image}`} alt="" className='object-contain scale-down aspect-square rounded-xl bg-white p-5'/>
                        )}
                        <div className='flex flex-row justify-between h-24'>
                            {product.images && product.images.map((image, index) => (
                                <img key={index} src={`${apiURL}/${image.image}`} alt="" className='w-24 h-24 object-contain rounded-md cursor-pointer bg-white p-1' onClick={() => handleImageClick(index)}/>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 lg:w-2/4'>
                        {product && product.category && (
                            <>
                                <div>
                                    <span className='text-primary-purple font-semibold'>{product.category.name}</span>
                                    <h1 className='text-3xl font-bold'>{product.name}</h1>
                                </div>
                            </>
                        )}
                        <p className='text-gray-700'>
                            {product.description}
                        </p>
                        <div>
                            <VariationModal />
                        </div>
                        <h6 className='text-2xl font-semibold'>$ {product.price}</h6>
                        <div className="summary">Summary of Product Variations goes here, need to display the specifcations that were chosen</div>
                        <div className='flex flex-row items-center gap-12'>
                            <div className='flex flex-row items-center'>
                                <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount((prev) => prev - 1)}><i className="fa-solid object-contain fa-minus"></i></button>
                                <span className='py-4 px-6 rounded-lg text-gray-700 font-bold'>{amount}</span>
                                <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount((prev) => prev + 1)}><i className="fa-solid object-contain fa-plus"></i></button>
                            </div>
                            <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15'>Add to Cart</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ProductComponent;


