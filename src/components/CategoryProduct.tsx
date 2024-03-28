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
    id: string;
    product: string;
    image: string;
    thumbnail: string;
    ordering: number;
}

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
    ordering: number;
}

interface ProductComponentProps {
  categoryId: string;
}

const CategoryProduct: React.FC<ProductComponentProps> = ({ categoryId }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData: ProductData[] = await server_calls.get('product');
        const filteredProducts = productData.filter(product => product.category === categoryId);

        setProducts(filteredProducts);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);


// Function to get image path based on image ID
const getImagePath = (products: ProductData[], productId: string, imageId: string): string => {
  // Find the product in the products array by productId
  const product = products.find(product => product.id === productId);
  if (product) {
    // Find the image in the product's images array by imageId
    const image = product.images.find(image => image.id === imageId);
    if (image) {
      // Return the concatenated image path
      return `${apiURL}/${image.image}`; // Concatenate apiURL with image path
    }
  }
  // Return path to default image if no image found
  return Logo; // Return path to default image
};

  return (
    <div className="flex flex-wrap justify-center">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && products.length === 0 && <p>No products available for this category.</p>}
      {products
      .filter(product => product.is_featured)
      .sort((a, b) => a.ordering - b.ordering)
      .map((product) => (
        <div key={product.id} className="m-4">
            <Card sx={{ maxWidth: 280, maxHeight: 8500, objectFit: 'contain'}}>
              <Link to={`${product.slug}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <CardMedia
                  sx={{ height: 250, padding: '10px', objectFit: 'contain' }}
                  component="img"
                  src={product.images.length > 0 ? getImagePath(products, product.id, product.images[0].id) : Logo}
                  title={product.name}
                />
              <CardContent>
                <Typography gutterBottom variant="h5" component="span">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" component="span">
                  <div>
                    {/* Description: {product.description}<br /> */}
                    Price: ${product.price}<br />
                  </div>
                </Typography>
              </CardContent>
            </Link>
            <CardActions>
              <Link to={product.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                <button className="text-primary-red"><i className="fa-solid fa-palette"></i> Design This Product </button>
              </Link>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default CategoryProduct;

