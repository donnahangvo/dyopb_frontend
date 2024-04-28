import React, { useState, useEffect } from 'react';
import { server_calls, apiURL } from "../api/server";
import { useProduct } from '../context/ProductContext';

interface ImageData {
    id: number;
    product: number;
    image: string;
    thumbnail: string;
  }
  
  interface SpecificationData {
    id: number;
    product: number;
    option: number;
    name: string;
    slug: string;
    specification_sku: string;
    description: string;
    price: number;
    num_available: number;
    is_featured: boolean;
    image: ImageData[];
    thumbnail: ImageData[];
    ordering: number;
  }
  
  interface OptionData {
    id: number;
    product: number;
    variation: number;
    name: string;
    slug: string;
    option_sku: string;
    description: string;
    price: number;
    image: ImageData[];
    thumbnail: ImageData[];
    ordering: number;
  }
  
//   interface VariationData {
//     id: number;
//     product: number;
//     name: string;
//     slug: string;
//     variation_sku: string;
//     description: string;
//     image: ImageData[];
//     thumbnail: ImageData[];
//     ordering: number;
//   }
  
  interface ProductData {
    id: number;
    category: number;
    name: string;
    slug: string;
    product_sku: string;
    description: string;
    price: number;
    is_featured: boolean;
    images: ImageData[];
  }

interface SpecificationImageProps {
    selectedProduct: ProductData | null; 
    selectedOption: OptionData | null;
    specificationId: number; // Accept the specification ID as props
}

const SpecificationImage: React.FC<SpecificationImageProps> = ({ specificationId }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { selectedProduct, selectedOption } = useProduct();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                if (!selectedProduct || !selectedOption) {
                    throw new Error('Selected product or option is missing');
                }
                // Fetch the specification using the ID
                const url = `specification/${selectedProduct.id}/${selectedOption.id}/${specificationId}`;
                //@ts-ignore
                const specificationData: SpecificationData = await server_calls.get<SpecificationData>(url);
                if (specificationData && specificationData.image && specificationData.image.length > 0) {
                    // Construct the image URL
                    const imageUrl = `${apiURL}/${specificationData.image}`; // Assuming the image is an array
                    setImageUrl(imageUrl);
                } else {
                    setError('No image available');
                }
            } catch (error) {
                //@ts-ignore
                setError('Failed to fetch image: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [specificationId, selectedProduct, selectedOption]);

    return (
        <div>
            {loading ? (
                'Loading Image...'
            ) : error ? (
                <div>Error: {error}</div>
            ) : imageUrl ? (
                <img src={imageUrl} alt="Specification" />
            ) : (
                <div>No Image Available</div>
            )}
        </div>
    );
};

export default SpecificationImage;


