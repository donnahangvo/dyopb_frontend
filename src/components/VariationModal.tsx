// // VariationModal.tsx
// import React, { useState, useEffect } from 'react';
// import OptionModal from './OptionModal';
// import SelectionTable from './SelectionTable';
// import { server_calls, apiURL } from "../api/server";
// import { useProduct } from '../context/ProductContext';

// const VariationModal: React.FC<ProductComponentProps> = ({ productId }) => {
//   const { selectedProduct, setSelectedProduct, setSelectedVariation, selectedVariation: contextSelectedVariation } = useProduct();
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>('');
//   const [variations, setVariations] = useState<VariationData[]>([]);
//   const [selectedVariation, setSelectedVariationState] = useState<VariationData | null>(null); 
//   const [selectedOption, setSelectedOption] = useState<OptionData | null>(null); // Lifted state for selected option
//   const [selectedSpecification, setSelectedSpecification] = useState<SpecificationData | null>(null); // Lifted state for selected specification
//   const [open, setOpen] = useState(false);
  
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

//   const handleChooseSelection = (variation: VariationData) => {
//     setSelectedVariation(variation); // Directly set the new variation
  
//     if (selectedVariation) {
//       // Here, you can set the selected variation into the table or take any other action
//       console.log("Selected Variation:", selectedVariation);
//     }
  
//     setSelectedVariationState(variation);
//     setOpen(false);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleOptionSelect = (option: OptionData) => {
//     setSelectedOption(option);
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
//       <OptionModal
//         open={open}
//         onClose={handleClose}
//         selectedOption={selectedOption}
//         setSelectedSpecification={setSelectedSpecification} // Pass setSelectedSpecification as a prop
//         onOptionSelect={handleOptionSelect} // Pass handleOptionSelect as a prop
//         productId={productId} 
//         variationId={selectedVariation?.id || 0} // Pass the variationId
//       />
//     </div>
//   );
// };

// export default VariationModal;


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { server_calls, apiURL } from "../api/server";
import React, { useState, useEffect } from 'react';
import BackendText from './BackendText';
import SelectionTable from './SelectionTable';
import OptionModal from './OptionModal';
import { useProduct } from '../context/ProductContext';

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
}

const VariationModal: React.FC<ProductComponentProps> = ({ productId }) => {
  const { selectedProduct, setSelectedProduct, setSelectedVariation, selectedVariation: contextSelectedVariation } = useProduct();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [variations, setVariations] = useState<VariationData[]>([]);
  const [selectedVariation, setSelectedVariationState] = useState<VariationData | null>(null); 
  const [open, setOpen] = useState(false);
  
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

  const handleOpen = (variation: VariationData) => {
    setSelectedVariation(variation);
    setOpen(true);
    setSelectedVariationState(variation); // Update the selected variation in the context
  };

  const handleChooseSelection = (variation: VariationData) => {
    setSelectedVariation(variation); // Directly set the new variation
  
    if (selectedVariation) {
      // Here, you can set the selected variation into the table or take any other action
      console.log("Selected Variation:", selectedVariation);
    }
  
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
                />
              )}
            </div>
            <div>
              {selectedVariation ? (
                <SelectionTable selectedVariation={selectedVariation} />
              ) : (
                <p>No choices selected yet.</p>
              )}
              {/* <p>Price: </p> */}
            </div>
            <div className="mt-auto">
            <button 
                  className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' 
                  onClick={() => { 
                    if (selectedVariation) {
                      handleChooseSelection(selectedVariation); 
                      // setSelectedVariation(null);
                    }
                  }}
                >
                  Confirm Selection
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
// import SummaryTable from './SummaryTable';
// import OptionModal from './OptionModal';
// import { useProduct } from '../context/ProductContext';

// interface ImageData {
//   id: number;
//   product: number;
//   image: string;
//   thumbnail: string; 
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

// interface ProductComponentProps {
//   productId: number;
// }

// // const VariationModal: React.FC<ProductComponentProps> = ({ productId }) => {
// //   const { selectedVariation: contextSelectedVariation, setSelectedVariation } = useProduct();
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string>('');
// //   const [variations, setVariations] = useState<VariationData[]>([]);
// //   const [selectedVariation, setSelectedVariationState] = useState<VariationData | null>(null); 
// //   const [open, setOpen] = useState(false);

// const VariationModal: React.FC<ProductComponentProps> = ({ productId }) => {
//   const { selectedProduct, setSelectedProduct, selectedVariation: contextSelectedVariation, setSelectedVariation } = useProduct();
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>('');
//   const [variations, setVariations] = useState<VariationData[]>([]);
//   const [selectedVariation, setSelectedVariationState] = useState<VariationData | null>(null); 
//   const [open, setOpen] = useState(false);
  
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

//   const handleChooseSelection = (variation: VariationData) => {
//     setSelectedVariation(variation);
//     setSelectedVariationState(variation); // Update the selected variation in the context
//     setOpen(false);
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
//                 />
//               )}
//             </div>
//             <div>
//             <SummaryTable variation={selectedVariation} />
//               {/* <p>Price: </p> */}
//             </div>
//             <div className="mt-auto">
//               <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' onClick={handleChooseSelection}>Confirm Selection</button>
//             </div>
//           </Box>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default VariationModal;





