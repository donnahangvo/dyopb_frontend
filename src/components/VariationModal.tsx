import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { server_calls, apiURL } from "../api/server";
import React, { useState, useEffect } from 'react';
import BackendText from './BackendText';
import SpecificationDropdown from './SpecificationDropdown';

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   // width: 500,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   pt: 5,
//   px: 4,
//   pb: 3,
// };


// Option Modal


interface ImageData {
  id: number;
  product: number;
  image: string;
  thumbnail: string;
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

interface ProductComponentProps {
  productId: number;
  variationId: number; 
}

const OptionModal: React.FC<ProductComponentProps & { onPriceChange: (price: number) => void }> = ({ productId, variationId, onPriceChange }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [options, setOptions] = useState<OptionData[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionData | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const optionData: OptionData[] = await server_calls.get<OptionData[]>(`option/${productId}/${variationId}`);

        console.log('fetched optiondata', optionData);

        if (optionData && optionData.length > 0) {
          setOptions(optionData);
        } else {
          setError('Options not found');
        }
      } catch (error) {
        setError(error.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, variationId]);

  const handleOptionSelect = (option: OptionData) => {
    setSelectedOption(option);
    onPriceChange(option.price); 
  };

  const sortedOptions = [...options].sort((a, b) => a.ordering - b.ordering);

  const handleOpen = (option: OptionData) => {
    setSelectedOption(option);
    onPriceChange(option.price); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {sortedOptions.map((option) => (
        <Button key={option.id} onClick={() => handleOpen(option)}>
          {option.image && (
            <img src={`${apiURL}/${option.image}`} alt={option.name} className='w-10 h-10 object-contain rounded-md mr-2' />
            )}
          {option.name}
        </Button>
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="flex justify-center p-10 bg-secondary-yellow">
          <Box sx={{ width: 300, height: 300 }}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && options.length === 0 && <p>No options available for this product.</p>}
            {selectedOption && (
              <div>
                <h2 id="child-modal-title">{selectedOption.name}</h2>
                <div className=''>
                  {selectedOption.image && (
                    <img src={`${apiURL}/${selectedOption.image}`} alt={selectedOption.name} className='w-10 h-10 object-contain rounded-md mr-2' />
                  )}
                  <p id="child-modal-description"><BackendText description={selectedOption.description} /></p>
                  {/* Display SpecificationDropdown only if selectedOption is available */}
                  <SpecificationDropdown
                    productId={productId}
                    optionId={selectedOption.id}
                    onPriceChange={onPriceChange}
                  />
                </div>
              </div>
            )}
          </Box>
        </div>
      </Modal>
    </>
  );
};


// Variation Modal

interface ImageData {
  id: number;
  product: number;
  image: string;
  thumbnail: string; 
}

interface VariationData {
  id: number;
  product: number;
  name: string;
  slug: string;
  variation_sku: string;
  description: string;
  image: ImageData[];
  thumbnail: ImageData[];
  ordering: number;
}

interface ProductComponentProps {
  productId: number;
  onPriceChange: (price: number, productId: number) => void; // Add onPriceChange to the props
}

const VariationModal: React.FC<ProductComponentProps> = ({ productId, onPriceChange }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [product, setProduct] = useState<ProductData | null>(null);
  const [variations, setVariations] = useState<VariationData[]>([]);
  const [selectedVariation, setSelectedVariation] = useState<VariationData | null>(null);
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const variationData: VariationData[] = await server_calls.get<VariationData[]>(`variation/${productId}`);

        console.log('this is the fetched variations', variationData)

        if (variationData && variationData.length > 0) {
          setVariations(variationData);
        } else {
          setError('Variations not found');
        }
      } catch (error) {
        setError(error.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);


  const handlePriceChange = (newPrice: number, productId: number) => {
    setPrice(newPrice);
    // Pass both price and productId to the parent component
    onPriceChange(newPrice, productId);
  };


  const sortedVariations = [...variations].sort((a, b) => a.ordering - b.ordering);

  const handleOpen = (variation: VariationData) => {
    setSelectedVariation(variation);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
        <div className='space-x-3 flex'>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && variations.length === 0 && <p>No variations available for this product.</p>}
          {!loading && sortedVariations.length > 0 && sortedVariations.map((variation) => (
            <button
              key={variation.id}
              className='flex items-center justify-center h-20 size-40 rounded-md cursor-pointer bg-white text-primary-purple p-1'
              onClick={() => handleOpen(variation)}
            >
              {variation.image && (
                <img src={`${apiURL}/${variation.image}`} alt={variation.name} className='w-10 h-10 object-contain rounded-md mr-2' />
              )}
              <span>{variation.name}</span>
            </button>
          ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className='bg-secondary-orange flex justify-center p-10'>
          <Box sx={{ width: 300, height: 300 }}>
            <h1 className="font-semibold" id="parent-modal-title">{selectedVariation?.name}</h1>
            <p id="parent-modal-description">
              {selectedVariation?.description}
            </p>
            {/* Display OptionModal only if selectedVariation is available */}
            {selectedVariation && (
              <OptionModal 
                productId={productId} 
                variationId={selectedVariation.id} 
                onPriceChange={handlePriceChange} // Pass function to update price
              />
            )}
            {/* Display price if available */}
            {price !== null && <p>Price: ${price}</p>}
            {/* Add to cart button */}
            <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' onClick={() => {/* Implement addToCart function */}}>Add to Cart</button>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default VariationModal;