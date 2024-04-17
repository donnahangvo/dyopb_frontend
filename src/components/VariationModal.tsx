import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { server_calls, apiURL } from "../api/server";
import React, { useState, useEffect } from 'react';
import BackendText from './BackendText';
import SpecificationImage from './SpecificationImage';
import OptionModal from './OptionModal';
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

interface VariationComponentProps {
  productId: number;
  selectedProduct: ProductData | null; 
  selectedVariation: VariationData | null; 
  selectedOption: OptionData | null;
  selectedSpecification: SpecificationData | null;
  onPriceChange: (price: number) => void;
  // onPriceChange: (price: number, productId: number) => void;
}

const VariationModal: React.FC<VariationComponentProps> = ({ productId, onPriceChange }) => {
  const { selectedProduct, setSelectedProduct, setSelectedVariation, selectedVariation: contextSelectedVariation, selectedSpecification, selectedOption } = useProduct();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [variations, setVariations] = useState<VariationData[]>([]);
  const [selectedVariation, setSelectedVariationState] = useState<VariationData | null>(null); 
  const [open, setOpen] = useState(false);
  const [specId, setSpecId] = useState<number | null>(null); // State variable to hold the specification_id
  const [selectedVariations, setSelectedVariations] = useState<VariationData[]>([]); // Define selectedVariations state variable
  const [price, setPrice] = useState<number | null>(null); // State variable to hold the price
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const variationData: VariationData[] = await server_calls.get<VariationData[]>(`variation/${productId}`);
        
        const sortedVariations = [...variationData].sort((a, b) => a.ordering - b.ordering);
        
        if (variationData && variationData.length > 0) {
          setVariations(sortedVariations); // Set sortedVariations to the state
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

  // const handlePriceChange = (newPrice: number, productId: number) => {
  //   setPrice(newPrice);
  //   // Pass both price and productId to the parent component
  //   onPriceChange(newPrice, productId);
  // };

  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice);
    // Pass both price and productId to the parent component
    onPriceChange(newPrice);
  };

  const handleOpen = (variation: VariationData) => {
    setSelectedVariation(variation);
    setOpen(true);
    setSelectedVariationState(variation); // Update the selected variation in the context
  };

  const handleChooseSelection = (variation: VariationData) => {
    setSelectedVariationState(variation);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='space-x-3 flex'>
      {/* Variation Buttons */}
      {!loading && variations.length > 0 && variations.map((variation) => (
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

      {/* Modal that displays options */}   
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className=''>
          <Box sx={{
            position: 'absolute' as 'absolute', 
            top: '50%', 
            left: '50%',
            width: '100%', 
            maxWidth: 1000, 
            transform: 'translate(-50%, -50%)', 
            bgcolor: '#FFD6A5', 
            boxShadow: 24,
            p: 5 }}>
            <div className=''>
              <h1 className="font-semibold" id="parent-modal-title">{selectedVariation?.name}</h1>
              <div id="parent-modal-description">
                <BackendText description={selectedVariation?.description} />
              </div>
            </div>
            <div>
            {selectedVariation && (
              <OptionModal 
                productId={productId} 
                variationId={selectedVariation.id} 
                onPriceChange={handlePriceChange} // Pass function to update price
              />
            )}
            </div>

            <div>
                      {selectedSpecification && (
                      // Render SpecificationImage component with necessary props
                        <SpecificationImage
                          selectedProduct={selectedProduct} // Pass selected product
                          selectedOption={selectedOption} // Pass selected option
                          specificationId={selectedSpecification.id} // Pass selected specification ID
                                />
                            )}
                        </div>
                        <div>
                          {price !== null && <p>Price: ${price}</p>}
                        </div>

            <div className="mt-auto">
            <button 
                  className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' 
                  onClick={() => { 
                    if (selectedVariation) {
                      handleChooseSelection(selectedVariation); 
                    }
                  }}
                >
                  Back to Product Page!
            </button>
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default VariationModal;




// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import { server_calls, apiURL } from "../api/server";
// import React, { useState, useEffect } from 'react';
// import BackendText from './BackendText';
// import SpecificationImage from './SpecificationImage';
// import OptionModal from './OptionModal';
// import { useProduct } from '../context/ProductContext';

// interface ImageData {
//   id: number;
//   product: number;
//   image: string;
//   thumbnail: string;
// }

// interface SpecificationData {
//   id: number;
//   product: number;
//   option: number;
//   name: string;
//   slug: string;
//   specification_sku: string;
//   description: string;
//   price: number;
//   num_available: number;
//   is_featured: boolean;
//   image: ImageData[];
//   thumbnail: ImageData[];
//   ordering: number;
// }

// interface OptionData {
//   id: number;
//   product: number;
//   variation: number;
//   name: string;
//   slug: string;
//   option_sku: string;
//   description: string;
//   price: number;
//   image: ImageData[];
//   thumbnail: ImageData[];
//   ordering: number;
// }

// interface VariationData {
//   id: number;
//   product: number;
//   name: string;
//   slug: string;
//   variation_sku: string;
//   description: string;
//   image: ImageData[];
//   thumbnail: ImageData[];
//   ordering: number;
// }

// interface ProductData {
//   id: number;
//   category: number;
//   name: string;
//   slug: string;
//   product_sku: string;
//   description: string;
//   price: string;
//   is_featured: boolean;
//   images: ImageData[];
// }

// interface ProductComponentProps {
//   productId: number;
//   selectedProduct: ProductData | null; 
//   selectedVariation: VariationData | null; 
//   selectedOption: OptionData | null;
//   selectedSpecification: SpecificationData | null;
//   onPriceChange: (price: number, productId: number) => void;
// }

// const VariationModal: React.FC<ProductComponentProps> = ({ productId, onPriceChange }) => {
//   const { selectedProduct, setSelectedProduct, setSelectedVariation, selectedVariation: contextSelectedVariation, selectedSpecification, selectedOption } = useProduct();
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>('');
//   const [variations, setVariations] = useState<VariationData[]>([]);
//   const [selectedVariation, setSelectedVariationState] = useState<VariationData | null>(null); 
//   const [open, setOpen] = useState(false);
//   const [specId, setSpecId] = useState<number | null>(null); // State variable to hold the specification_id
//   const [selectedVariations, setSelectedVariations] = useState<VariationData[]>([]); // Define selectedVariations state variable
//   const [price, setPrice] = useState<number | null>(null);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const variationData: VariationData[] = await server_calls.get<VariationData[]>(`variation/${productId}`);
        
//         const sortedVariations = [...variationData].sort((a, b) => a.ordering - b.ordering);
        
//         if (variationData && variationData.length > 0) {
//           setVariations(sortedVariations); // Set sortedVariations to the state
//         } else {
//           setError('Variations not found');
//         }
//       } catch (error) {
//         setError(error.message || 'An error occurred while fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchData();
//   }, [productId]);

//   const handleOpen = (variation: VariationData) => {
//     setSelectedVariation(variation);
//     setOpen(true);
//     setSelectedVariationState(variation); // Update the selected variation in the context
//   };

//   const handlePriceChange = (newPrice: number, productId: number) => {
//     setPrice(newPrice);
//     // Pass both price and productId to the parent component
//     onPriceChange(newPrice, productId);
//   };


//   const handleChooseSelection = (variation: VariationData) => {
//     // Create a copy of the current selected variations array
//     const updatedSelectedVariations: VariationData[] = [...selectedVariations]; // Explicitly define the type as VariationData[]
    
//     // Check if the selected variation is already in the array
//     const index = updatedSelectedVariations.findIndex(v => v.id === variation.id);
    
//     // If the selected variation is not already in the array, add it
//     if (index === -1) {
//       updatedSelectedVariations.push(variation);
//     }
    
//     // Update the selected variations in the state
//     setSelectedVariationState(variation); // Use variation here, or updatedSelectedVariations if you intend to set the whole array
    
//     setOpen(false);
//     // Optionally, you can trigger updates in other components or perform additional actions here
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className='space-x-3 flex'>
//       {/* Variation Buttons */}
//       {!loading && variations.length > 0 && variations.map((variation) => (
//         <button
//           key={variation.id}
//           className='flex items-center justify-center h-20 size-40 rounded-md cursor-pointer bg-white text-primary-purple p-1'
//           onClick={() => handleOpen(variation)}
//         >
//           {variation.image && (
//             <img src={`${apiURL}/${variation.image}`} alt={variation.name} className='w-10 h-10 object-contain rounded-md mr-2' />
//           )}
//           <span>{variation.name}</span>
//         </button>
//       ))}

//       {/* Modal that displays options */}   
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//       >
//         <div className=''>
//           <Box sx={{
//             position: 'absolute' as 'absolute', 
//             top: '50%', 
//             left: '50%',
//             width: '100%', 
//             maxWidth: 1000, 
//             transform: 'translate(-50%, -50%)', 
//             bgcolor: '#FFD6A5', 
//             boxShadow: 24,
//             p: 5 }}>
//             <div className=''>
//               <h1 className="font-semibold" id="parent-modal-title">{selectedVariation?.name}</h1>
//               <div id="parent-modal-description">
//                 <BackendText description={selectedVariation?.description} />
//               </div>
//             </div>
//             <div>
//               {selectedVariation && (
//                 <OptionModal 
//                   productId={productId} 
//                   variationId={selectedVariation.id}
//                   onPriceChange={handlePriceChange} // Pass function to update price 
//                 />
//               )}
//               {price !== null && <p>Price: ${price}</p>}
//             </div>

//             <div>
//                       {selectedSpecification && (
//                       // Render SpecificationImage component with necessary props
//                         <SpecificationImage
//                           selectedProduct={selectedProduct} // Pass selected product
//                           selectedOption={selectedOption} // Pass selected option
//                           specificationId={selectedSpecification.id} // Pass selected specification ID
//                                 />
//                             )}
//                         </div>

//             <div className="mt-auto">
//             <button 
//                   className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' 
//                   onClick={() => { 
//                     if (selectedVariation) {
//                       handleChooseSelection(selectedVariation); 
//                     }
//                   }}
//                 >
//                   Back to Product Page!
//             </button>
//             </div>
//           </Box>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default VariationModal;







