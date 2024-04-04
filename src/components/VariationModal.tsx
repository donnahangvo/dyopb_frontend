import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { server_calls, apiURL } from "../api/server";
import React, { useState, useEffect } from 'react';
import BackendText from './BackendText';


// Specification Dropdown Menu

interface ProductComponentProps {
  productId: number;
  optionId: number;
}

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

const SpecificationDropdown: React.FC<ProductComponentProps & {onPriceChange: (price: number) => void, selectedSpecification: SpecificationData | null, selectedOption: OptionData | null } > = 
({ productId, optionId, onPriceChange, onSpecificationSelect }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [specifications, setSpecifications] = useState<SpecificationData[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [selectedSpecification, setSelectedSpecification] = useState<SpecificationData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const specificationData: SpecificationData[] = await server_calls.get<SpecificationData[]>(`specification/${productId}/${optionId}`);
                
                const sortedSpecifications = [...specificationData].sort((a, b) => a.ordering - b.ordering);

                if (specificationData && specificationData.length > 0) {
                    setSpecifications(sortedSpecifications);
                } else {
                    setError('No specifications available for this product');
                }
            } catch (error) {
                setError(error.message || 'An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [productId, optionId]);


    const handleSpecificationSelect = (specification: SpecificationData) => {
        setSelectedSpecification(specification);
        onPriceChange(specification.price);
        onSpecificationSelect(specification); // Pass the actual specification object
    };
    

    return (
        <div className="w-72 font-medium h-100">
            <div className={`bg-white w-full flex items-center justify-between rounded ${!selectedSpecification && "bg-secondary-blue text-gray-700"}`}>
            {selectedSpecification ? (
                      <div>
                          {selectedSpecification.name.length > 25 ? `${selectedSpecification.name.substring(0, 25)}...` : selectedSpecification.name}
                          {selectedSpecification.image && selectedSpecification.image.length > 0 && (
                              <img src={`${apiURL}/${selectedSpecification.image}`} alt={selectedSpecification.name} className='object-contain rounded-md mr-2' />
                          )}
                      </div>
                  ) : (
                      loading ? 'Loading...' : error ? error : 'Choose From Available Options'
                  )}
            </div>
            <ul className={`bg-white mt-1 overflow-y-auto ${isOpen ? "max-h-60" : "max-h-0"}`}>
                <div className="flex items-center px-2 sticky top-0 bg-white">
                </div>
                {specifications.map((specification) => (
                    <li
                        key={specification.id}
                        className={` ${specification.name.toLowerCase() === selectedSpecification?.name.toLowerCase() && "bg-secondary-blue text-black"}`}
                        onClick={() => {
                            if (specification.name.toLowerCase() !== selectedSpecification?.name.toLowerCase()) {
                                setSelectedSpecification(specification);
                                handleSpecificationSelect(specification);
                                onPriceChange(specification.price);
                                setInputValue("");
                                setIsOpen(true);
                            }
                        }}
                    >
                        {specification.name}
                        {specification.image && specification.image.length > 0 && (
                            <img src={`${apiURL}/${specification.image}`} alt={specification.name} className='w-10 h-10 object-contain rounded-md mr-2' />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};





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
  onPriceChange: (price: number, productId: number) => void;
  onOptionSelect: (option: OptionData) => void; 
  onSpecificationSelect: (specification: SpecificationData) => void; 
}



const OptionModal: React.FC<ProductComponentProps & {onPriceChange: (price: number) => void, selectedSpecification: SpecificationData | null, selectedOption: OptionData | null }> = 
({ productId, variationId, onPriceChange, onOptionSelect }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [options, setOptions] = useState<OptionData[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionData | null>(null);
  const [selectedSpecification, setSelectedSpecification] = useState<SpecificationData | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const optionData: OptionData[] = await server_calls.get<OptionData[]>(`option/${productId}/${variationId}`);

        // console.log('fetched optiondata', optionData);

        const sortedOptions = [...optionData].sort((a, b) => a.ordering - b.ordering);

        if (optionData && optionData.length > 0) {
        setOptions(sortedOptions); // Set sortedOptions to the state
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
    setPrice(option.price);
    onPriceChange(option.price);
    onOptionSelect(option);
    setOpen(true);
};

const [selectedPrice, setSelectedPrice] = useState<number | null>(null); // Declare state variables outside the function

const handleChooseSelection = () => {
    setOpen(false);
    // Confirm the selected option and specification by passing them to the parent component
    onOptionSelect(selectedOption);
    onSpecificationSelect(selectedSpecification);
};

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {options.map((option) => (
        <Button key={option.id} onClick={() => handleOptionSelect(option)}>
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
  
        <div className="">
          <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            maxWidth: 1000,
            maxHeight: 600,
            transform: 'translate(-50%, -50%)',
            bgcolor: '#FDFFB6',
            boxShadow: 24,
            p: 3,
            display: 'flex',
            flexDirection: 'column'
          }}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && options.length === 0 && <p>No options available for this product.</p>}
            {selectedOption && (
              <div className='flex-grow flex'>
                <div>

                  <div>
                  <h2 id="child-modal-title">{selectedOption.name}</h2>
                  <div>
                    {selectedOption.image && (
                      <img src={`${apiURL}/${selectedOption.image}`} alt={selectedOption.name} className='w-10 h-10 object-contain rounded-md mr-2' />
                    )}
                    <div id="child-modal-description"><BackendText description={selectedOption.description} /></div>
                  </div>
                  </div>

                  <div>
                    <div>
                    {/* Display price if available */}
                    {price !== null && <p>Price: ${price}</p>}
                    </div>

                    <div className="mt-auto"> {/* mt-auto pushes the button to the bottom */}

                    <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' onClick={handleChooseSelection}>Choose Selection</button>
                    </div>
                  </div>

                </div>
                <div style={{ marginLeft: 'auto' }}> 
                  <SpecificationDropdown
                    productId={productId}
                    optionId={selectedOption.id}
                    onPriceChange={(price: number) => {
                      onPriceChange(price);
                      setSelectedPrice(price); // Update the selected price
                  }}
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
      productSlug: string;
      onPriceChange: (price: number, productId: number) => void;
      onOptionSelect: (option: OptionData[]) => void; // Modify to handle array of options
      onSpecificationSelect: (specification: SpecificationData[]) => void; // Modify to handle array of specifications
  }
  
  const VariationModal: React.FC<ProductComponentProps & { selectedSpecifications: SpecificationData[], selectedOptions: OptionData[] }> = ({ productId, productSlug, onPriceChange, onOptionSelect, onSpecificationSelect, selectedSpecifications, selectedOptions }) => {
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string>('');
      const [variations, setVariations] = useState<VariationData[]>([]);
      const [selectedVariation, setSelectedVariation] = useState<VariationData | null>(null);
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
    
      const handlePriceChange = (newPrice: number, productId: number) => {
        onPriceChange(newPrice, productId);
      };
    
      const handleOpen = (variation: VariationData) => {
        setSelectedVariation(variation);
        setOpen(true);
      };
  
      const handleChooseSelection = () => {
          setOpen(false);
          // Confirm the selected variation, options, and specifications by passing them to the parent component
          onOptionSelect(selectedOptions);
          onSpecificationSelect(selectedSpecifications);
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
              <Box sx={{position: 'absolute' as 'absolute', top: '50%', left: '50%', width: '100%', maxWidth: 1000, transform: 'translate(-50%, -50%)', 
              bgcolor: '#FFD6A5', boxShadow: 24, p: 5 }}>
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
                        onPriceChange={(price: number) => {
                        handlePriceChange(price, productId);
                    }} 
                    onOptionSelect={onOptionSelect} // Pass onOptionSelect prop to OptionModal
                    onSpecificationSelect={onSpecificationSelect} // Pass onSpecificationSelect prop to OptionModal
                    selectedSpecification={selectedSpecifications} // Pass selectedSpecifications as prop
                    selectedOption={selectedOptions} // Pass selectedOptions as prop
                    />
                  )}
                </div>
                <div className="mt-auto">
                  <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' onClick={handleChooseSelection}>Confirm Selection</button>
                </div>
              </Box>
            </div>
          </Modal>
        </div>
      );
    };
    
    export default VariationModal;








      //       return (
//         <div className='space-x-3 flex'>
//           {/* Variation Buttons */}
//           {!loading && variations.length > 0 && variations.map((variation) => (
//             <button
//               key={variation.id}
//               className='flex items-center justify-center h-20 size-40 rounded-md cursor-pointer bg-white text-primary-purple p-1'
//               onClick={() => handleOpen(variation)}
//             >
//               {variation.image && (
//                 <img src={`${apiURL}/${variation.image}`} alt={variation.name} className='w-10 h-10 object-contain rounded-md mr-2' />
//               )}
//               <span>{variation.name}</span>
//             </button>
//           ))}
    
//           {/* Modal that displays options */}   
//           <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="parent-modal-title"
//             aria-describedby="parent-modal-description"
//           >
//             <div className=''>
//               <Box sx={{position: 'absolute' as 'absolute', top: '50%', left: '50%', width: '100%', maxWidth: 1000, transform: 'translate(-50%, -50%)', 
//               bgcolor: '#FFD6A5', boxShadow: 24, p: 5 }}>
//                 <div className=''>
//                   <h1 className="font-semibold" id="parent-modal-title">{selectedVariation?.name}</h1>
//                   <div id="parent-modal-description">
//                     <BackendText description={selectedVariation?.description} />
//                   </div>
//                 </div>
//                 <div>
//                   {selectedVariation && (
//                     <OptionModal 
//                         productId={productId} 
//                         variationId={selectedVariation.id} 
//                         onPriceChange={(price: number) => {
//                         handlePriceChange(price, productId);
//                     }} 
//                         onOptionSelect={onOptionSelect} // Pass onOptionSelect prop to OptionModal
//                         onSpecificationSelect={onSpecificationSelect} // Pass onSpecificationSelect prop to OptionModal
//                     />
//                   )}
//                 </div>

//                 <div>
//                   {/* Display selected options and specifications */}
//                   <p>Selected Options:</p>
//                   <ul>
//                       {selectedOptions.map((option, index) => (
//                           <li key={index}>{option.name}</li>
//                       ))}
//                   </ul>
//                   <p>Selected Specifications:</p>
//                   <ul>
//                       {selectedSpecifications.map((specification, index) => (
//                           <li key={index}>{specification.name}</li>
//                       ))}
//                   </ul>
//                   {/* Display price if available */}
//                   {/* Consider how you want to display the price, as it might not be available here */}
//                 </div>

//                 <div className="mt-auto">
//                   <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' onClick={handleChooseSelection}>Confirm Selection</button>
//                 </div>
//               </Box>
//             </div>
//           </Modal>
//         </div>
//       );
//     };
  
//   export default VariationModal;



// interface ProductComponentProps {
//     productId: number;
//     productSlug: string;
//     onPriceChange: (price: number, productId: number) => void;
//     onOptionSelect: (option: OptionData) => void; // Change parameter type to OptionData
//     onSpecificationSelect: (specification: SpecificationData) => void; // Change parameter type to SpecificationData
//   }

// const VariationModal: React.FC<ProductComponentProps & { selectedSpecification: SpecificationData | null, selectedOption: OptionData | null }> = ({ productId, onPriceChange, onOptionSelect, onSpecificationSelect, selectedSpecification, selectedOption }) => {
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');
//     const [product, setProduct] = useState<ProductData | null>(null);
//     const [variations, setVariations] = useState<VariationData[]>([]);
//     const [selectedVariation, setSelectedVariation] = useState<VariationData | null>(null);
//     const [open, setOpen] = useState(false);
//     const [price, setPrice] = useState<number | null>(null);
  
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const variationData: VariationData[] = await server_calls.get<VariationData[]>(`variation/${productId}`);
          
//           const sortedVariations = [...variationData].sort((a, b) => a.ordering - b.ordering);
          
//           if (variationData && variationData.length > 0) {
//             setVariations(sortedVariations); // Set sortedVariations to the state
//           } else {
//             setError('Variations not found');
//           }
//         } catch (error) {
//           setError(error.message || 'An error occurred while fetching data');
//         } finally {
//           setLoading(false);
//         }
//       };
    
//       fetchData();
//     }, [productId]);
  
//     const handlePriceChange = (newPrice: number, productId: number) => {
//       setPrice(newPrice);
//       onPriceChange(newPrice, productId);
//     };
  
//     const handleOpen = (variation: VariationData) => {
//       setSelectedVariation(variation);
//       setOpen(true);
//     };
  
//     const handleChooseSelection = () => {
//       setOpen(false); // Close OptionModal
//       // Pass selected specification and option to the parent component
//       if (selectedSpecification && selectedOption) {
//           // Pass price, specification SKU, and option SKU separately
//           onPriceChange(price, productId);
//           onSpecificationSelect(selectedSpecification);
//           onOptionSelect(selectedOption);
//       }
//     };
  
//     const handleClose = () => {
//       setOpen(false);
//     };
  
//     return (
//       <div className='space-x-3 flex'>
//         {/* Variation Buttons */}
//         {!loading && variations.length > 0 && variations.map((variation) => (
//           <button
//             key={variation.id}
//             className='flex items-center justify-center h-20 size-40 rounded-md cursor-pointer bg-white text-primary-purple p-1'
//             onClick={() => handleOpen(variation)}
//           >
//             {variation.image && (
//               <img src={`${apiURL}/${variation.image}`} alt={variation.name} className='w-10 h-10 object-contain rounded-md mr-2' />
//             )}
//             <span>{variation.name}</span>
//           </button>
//         ))}
  
//         {/* Modal that displays options */}   
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="parent-modal-title"
//           aria-describedby="parent-modal-description"
//         >
//           <div className=''>
//             <Box sx={{position: 'absolute' as 'absolute', top: '50%', left: '50%', width: '100%', maxWidth: 1000, transform: 'translate(-50%, -50%)', 
//             bgcolor: '#FFD6A5', boxShadow: 24, p: 5 }}>
//               <div className=''>
//                 <h1 className="font-semibold" id="parent-modal-title">{selectedVariation?.name}</h1>
//                 <div id="parent-modal-description">
//                   <BackendText description={selectedVariation?.description} />
//                 </div>
//               </div>
  
//               {selectedVariation && (
//                 <OptionModal 
//                   productId={productId} 
//                   variationId={selectedVariation.id} 
//                   onPriceChange={(price: number) => {
//                     handlePriceChange(price, productId);
//                   }} 
//                   onOptionSelect={onOptionSelect}
//                   selectedSpecification={selectedSpecification}
//                   selectedOption={selectedOption}
//                 />
//               )}
  
//               <div>
//                 {price !== null && <p>Price: ${price}</p>}
//               </div>
  
//               <div className="mt-auto">
//                 <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' onClick={handleChooseSelection}>Confirm Selection</button>
//               </div>
//             </Box>
//           </div>
//         </Modal>
//       </div>
//     );
//   };

//   export default VariationModal;








  

// const VariationModal: React.FC<ProductComponentProps> = ({ productId, onPriceChange, onOptionSelect, onSpecificationSelect }) => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>('');
//   const [product, setProduct] = useState<ProductData | null>(null);
//   const [variations, setVariations] = useState<VariationData[]>([]);
//   const [selectedVariation, setSelectedVariation] = useState<VariationData | null>(null);
//   const [open, setOpen] = useState(false);
//   const [price, setPrice] = useState<number | null>(null);
//   const [selectedSpecification, setSelectedSpecification] = useState<SpecificationData | null>(null);
//   const [selectedOption, setSelectedOption] = useState<OptionData | null>(null);

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

//   const handlePriceChange = (newPrice: number, productId: number) => {
//     setPrice(newPrice);
//     onPriceChange(newPrice, productId);
//   };

  

//   const handleOpen = (variation: VariationData) => {
//     setSelectedVariation(variation);
//     setOpen(true);
//   };

// const handleChooseSelection = () => {
//     setOpen(false); // Close OptionModal
//     // Pass selected specification and option to the parent component
//     if (selectedSpecification && selectedOption) {
//         // Pass price, specification SKU, and option SKU separately
//         onPriceChange(price, productId);
//         onSpecificationSelect(selectedSpecification.specification_sku);
//         onOptionSelect(selectedOption.option_sku);
//     }
// };

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
//           <Box sx={{position: 'absolute' as 'absolute', top: '50%', left: '50%', width: '100%', maxWidth: 1000, transform: 'translate(-50%, -50%)', 
//           bgcolor: '#FFD6A5', boxShadow: 24, p: 5 }}>
//             <div className=''>
//               <h1 className="font-semibold" id="parent-modal-title">{selectedVariation?.name}</h1>
//               <div id="parent-modal-description">
//                 <BackendText description={selectedVariation?.description} />
//               </div>
//             </div>


//             {selectedVariation && (
//               <OptionModal 
//                 productId={productId} 
//                 variationId={selectedVariation.id} 
//                 onPriceChange={(price: number) => {
//                   handlePriceChange(price, productId);
//                 }} 
//                 selectedSpecification={selectedSpecification}
//                 selectedOption={selectedOption}
//               />
//             )}

//             <div>
//               {price !== null && <p>Price: ${price}</p>}
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








// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import { server_calls, apiURL } from "../api/server";
// import React, { useState, useEffect } from 'react';
// import BackendText from './BackendText';


// // Specification Dropdown Menu

// interface ProductComponentProps {
//   productId: number;
//   optionId: number;
// }

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

// const SpecificationDropdown: React.FC<ProductComponentProps & { onPriceChange: (price: number) => void }> = ({ productId, optionId, onPriceChange }) => {
//     const [isOpen, setIsOpen] = useState(true);
//     const [specifications, setSpecifications] = useState<SpecificationData[]>([]);
//     const [inputValue, setInputValue] = useState("");
//     const [selectedSpecification, setSelectedSpecification] = useState<SpecificationData | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const specificationData: SpecificationData[] = await server_calls.get<SpecificationData[]>(`specification/${productId}/${optionId}`);
                
//                 const sortedSpecifications = [...specificationData].sort((a, b) => a.ordering - b.ordering);

//                 if (specificationData && specificationData.length > 0) {
//                     setSpecifications(sortedSpecifications);
//                 } else {
//                     setError('No specifications available for this product');
//                 }
//             } catch (error) {
//                 setError(error.message || 'An error occurred while fetching data');
//             } finally {
//                 setLoading(false);
//             }
//         };
        
//         fetchData();
//     }, [productId, optionId]);


//     const handleSpecificationSelect = (specification: SpecificationData) => {
//         setSelectedSpecification(specification);
//         onPriceChange(specification.price); 
//     };

    

//     return (
//         <div className="w-72 font-medium h-100">
//             <div className={`bg-white w-full flex items-center justify-between rounded ${!selectedSpecification && "bg-secondary-blue text-gray-700"}`}>
//             {selectedSpecification ? (
//                       <div>
//                           {selectedSpecification.name.length > 25 ? `${selectedSpecification.name.substring(0, 25)}...` : selectedSpecification.name}
//                           {selectedSpecification.image && selectedSpecification.image.length > 0 && (
//                               <img src={`${apiURL}/${selectedSpecification.image}`} alt={selectedSpecification.name} className='object-contain rounded-md mr-2' />
//                           )}
//                       </div>
//                   ) : (
//                       loading ? 'Loading...' : error ? error : 'Choose From Available Options'
//                   )}
//             </div>
//             <ul className={`bg-white mt-1 overflow-y-auto ${isOpen ? "max-h-60" : "max-h-0"}`}>
//                 <div className="flex items-center px-2 sticky top-0 bg-white">
//                 </div>
//                 {specifications.map((specification) => (
//                     <li
//                         key={specification.id}
//                         className={` ${specification.name.toLowerCase() === selectedSpecification?.name.toLowerCase() && "bg-secondary-blue text-black"}`}
//                         onClick={() => {
//                             if (specification.name.toLowerCase() !== selectedSpecification?.name.toLowerCase()) {
//                                 setSelectedSpecification(specification);
//                                 handleSpecificationSelect(specification);
//                                 onPriceChange(specification.price);
//                                 setInputValue("");
//                                 setIsOpen(true);
//                             }
//                         }}
//                     >
//                         {specification.name}
//                         {specification.image && specification.image.length > 0 && (
//                             <img src={`${apiURL}/${specification.image}`} alt={specification.name} className='w-10 h-10 object-contain rounded-md mr-2' />
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };





// // Option Modal


// interface ImageData {
//   id: number;
//   product: number;
//   image: string;
//   thumbnail: string;
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

// interface ProductComponentProps {
//   productId: number;
//   variationId: number; 
// }

// const OptionModal: React.FC<ProductComponentProps & { onPriceChange: (price: number) => void }> = ({ productId, variationId, onPriceChange }) => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>('');
//   const [options, setOptions] = useState<OptionData[]>([]);
//   const [open, setOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState<OptionData | null>(null);
//   const [selectedSpecification, setSelectedSpecification] = useState<SpecificationData | null>(null);
//   const [price, setPrice] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const optionData: OptionData[] = await server_calls.get<OptionData[]>(`option/${productId}/${variationId}`);

//         // console.log('fetched optiondata', optionData);

//         const sortedOptions = [...optionData].sort((a, b) => a.ordering - b.ordering);

//         if (optionData && optionData.length > 0) {
//         setOptions(sortedOptions); // Set sortedOptions to the state
//         } else {
//         setError('Options not found');
//         }
//       } catch (error) {
//         setError(error.message || 'An error occurred while fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [productId, variationId]);

//   const handleOptionSelect = (option: OptionData) => {
//     setSelectedOption(option);
//     setPrice(option.price);
//     onPriceChange(option.price); 
//     setOpen(true);
//   };

//   const [selectedPrice, setSelectedPrice] = useState<number | null>(null);



//   const handleChooseSelection = () => {
//     setOpen(false); 
//     setSelectedSpecification(selectedSpecification);
//     setSelectedOption(selectedOption);
// };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       {options.map((option) => (
//         <Button key={option.id} onClick={() => handleOptionSelect(option)}>
//           {option.image && (
//             <img src={`${apiURL}/${option.image}`} alt={option.name} className='w-10 h-10 object-contain rounded-md mr-2' />
//           )}
//           {option.name}
//         </Button>
        
//       ))}
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >
  
//         <div className="">
//           <Box sx={{
//             position: 'absolute' as 'absolute',
//             top: '50%',
//             left: '50%',
//             width: '100%',
//             maxWidth: 1000,
//             maxHeight: 600,
//             transform: 'translate(-50%, -50%)',
//             bgcolor: '#FDFFB6',
//             boxShadow: 24,
//             p: 3,
//             display: 'flex',
//             flexDirection: 'column'
//           }}>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error}</p>}
//             {!loading && options.length === 0 && <p>No options available for this product.</p>}
//             {selectedOption && (
//               <div className='flex-grow flex'>
//                 <div>

//                   <div>
//                   <h2 id="child-modal-title">{selectedOption.name}</h2>
//                   <div>
//                     {selectedOption.image && (
//                       <img src={`${apiURL}/${selectedOption.image}`} alt={selectedOption.name} className='w-10 h-10 object-contain rounded-md mr-2' />
//                     )}
//                     <div id="child-modal-description"><BackendText description={selectedOption.description} /></div>
//                   </div>
//                   </div>

//                   <div>
//                     <div>
//                     {/* Display price if available */}
//                     {price !== null && <p>Price: ${price}</p>}
//                     </div>

//                     <div className="mt-auto"> {/* mt-auto pushes the button to the bottom */}

//                     <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' onClick={handleChooseSelection}>Choose Selection</button>
//                     </div>
//                   </div>

//                 </div>
//                 <div style={{ marginLeft: 'auto' }}> 
//                   <SpecificationDropdown
//                     productId={productId}
//                     optionId={selectedOption.id}
//                     onPriceChange={(price: number) => {
//                       onPriceChange(price);
//                       setSelectedPrice(price); // Update the selected price
//                   }}
//                   />
//                 </div>
//               </div>
//             )}

//           </Box>
//         </div>
//       </Modal>
//     </>
//   );
// };




// // Variation Modal

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
//   onPriceChange: (price: number, productId: number) => void; // Add onPriceChange to the props
// }

// const VariationModal: React.FC<ProductComponentProps> = ({ productId, onPriceChange }) => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>('');
//   const [product, setProduct] = useState<ProductData | null>(null);
//   const [variations, setVariations] = useState<VariationData[]>([]);
//   const [selectedVariation, setSelectedVariation] = useState<VariationData | null>(null);
//   const [open, setOpen] = useState(false);
//   const [price, setPrice] = useState<number | null>(null);
//   const [selectedSpecification, setSelectedSpecification] = useState<SpecificationData | null>(null);
//   const [selectedOption, setSelectedOption] = useState<OptionData | null>(null);

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

//   const handlePriceChange = (newPrice: number, productId: number) => {
//     setPrice(newPrice);
//     onPriceChange(newPrice, productId);
//   };

  

//   const handleOpen = (variation: VariationData) => {
//     setSelectedVariation(variation);
//     setOpen(true);
//   };

//   const handleChooseSelection = () => {
//     setOpen(false); // Close OptionModal
//     // Pass selected specification and option to the parent component
//     if (selectedSpecification && selectedOption) {
//       // Do something with selectedSpecification and selectedOption
//     }
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
//           <Box sx={{position: 'absolute' as 'absolute', top: '50%', left: '50%', width: '100%', maxWidth: 1000, transform: 'translate(-50%, -50%)', 
//           bgcolor: '#FFD6A5', boxShadow: 24, p: 5 }}>
//             <div className=''>
//               <h1 className="font-semibold" id="parent-modal-title">{selectedVariation?.name}</h1>
//               <div id="parent-modal-description">
//                 <BackendText description={selectedVariation?.description} />
//               </div>
//             </div>


//             {selectedVariation && (
//               <OptionModal 
//                 productId={productId} 
//                 variationId={selectedVariation.id} 
//                 onPriceChange={(price: number) => {
//                   handlePriceChange(price, productId);
//                 }} 
//                 selectedSpecification={selectedSpecification}
//                 selectedOption={selectedOption}
//               />
//             )}

//             <div>
//               {price !== null && <p>Price: ${price}</p>}
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