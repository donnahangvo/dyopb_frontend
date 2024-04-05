import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { server_calls, apiURL } from "../api/server";
import Logo from '../assets/images/AELogo.png';

interface ImageData {
    id: number;
    product: number;
    image: string;
    thumbnail: string;
    ordering: number;
}

interface ProductData {
    id: number;
    category: number;
    name: string;
    slug: string;
    product_sku: string;
    description: string;
    price: string;
    is_featured: boolean;
    images: ImageData[];
}

const IsFeatured: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [products, setProducts] = useState<ProductData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError('');
                const productData: ProductData[] = await server_calls.get(`product`);
                setProducts(productData);
            } catch (error) {
                setError(error.message || 'An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const slideLeft = () => {
        const slider = document.getElementById('slider');
        if (slider) {
            slider.scrollLeft -= 500;
        }
    };

    const slideRight = () => {
        const slider = document.getElementById('slider');
        if (slider) {
            slider.scrollLeft += 500;
        }
    };

    const getImagePath = (image: string): string => {
        return `${apiURL}/${image}`;
    };

    return (
        <div className="relative bg-primary-orange p-2">
            <div className="flex flex-wrap justify-center bg-primary-orange pt-2 font-semibold text-lg">
                Featured Products
            </div>
            <i className="absolute top-1/2 left-2 opacity-80 fa-solid fa-chevron-left cursor-pointer hover:opacity-100" onClick={slideLeft} style={{ fontSize: '20px', transform: 'translateY(-50%)' }}></i>
            <div id='slider' className="flex overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && products.length === 0 && <p>No featured products available.</p>}
                {products && products.length > 0 &&
                    products.map((product) => (
                        <div key={product.id} className="m-4">
                            <Card sx={{ maxWidth: 280, height: '100%' }}>
                                <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <CardMedia
                                        sx={{ height: 250, padding: '5px', objectFit: 'contain' }}
                                        component="img"
                                        src={product.images && product.images.length > 0 ? getImagePath(product.images[0].image) : Logo}
                                        title={product.name}
                                    />
                                    <CardContent sx={{ maxWidth: 280, maxHeight: 8500, objectFit: 'contain'}}>
                                        <Typography gutterBottom variant="h6" component="span">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" component="span">
                                            <div>
                                                <p>Explore this product for more details.</p>
                                                {product.price ? <p>Price: ${product.price}</p> : <p>Discover options for pricing.</p>}
                                            </div>
                                        </Typography>
                                    </CardContent>
                                </Link>
                                <CardActions>
                                    <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <button className="text-primary-red"><i className="fa-solid fa-palette"></i> Design This Product </button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </div>
                    ))}
            </div>
            <i className="absolute top-1/2 right-2 opacity-80 fa-solid fa-chevron-right cursor-pointer hover:opacity-100" onClick={slideRight} style={{ fontSize: '20px', transform: 'translateY(-50%)' }}></i>
        </div>
    );
};

export default IsFeatured;



