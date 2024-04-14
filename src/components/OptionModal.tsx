// // // OptionModal.tsx
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import React, { useState, useEffect } from 'react';
// import BackendText from './BackendText';
// import SpecificationDropdown from './SpecificationDropdown';
// import SelectionTable from './SelectionTable';
// import { server_calls, apiURL } from "../api/server";
// import { useProduct } from '../context/ProductContext';

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

// interface OptionModalProps {
//   productId: number;
//   variationId: number;
// }

// const OptionModal: React.FC<OptionModalProps> = ({ productId, variationId, selectedOption, setSelectedSpecification, onOptionSelect }) => {
//     const { selectedSpecification, setSelectedOption } = useProduct();
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');
//     const [options, setOptions] = useState<OptionData[]>([]);
//     const [isOpen, setIsOpen] = useState<boolean>(false); // Local state for modal open/close
//     const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: SpecificationData }>({});
  
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const optionData: OptionData[] = await server_calls.get<OptionData[]>(`option/${productId}/${variationId}`);
//           const sortedOptions = [...optionData].sort((a, b) => a.ordering - b.ordering);
//           if (optionData && optionData.length > 0) {
//             setOptions(sortedOptions);
//           } else {
//             setError('Options not found');
//           }
//         } catch (error) {
//           setError(error.message || 'An error occurred while fetching data');
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchData();
//     }, [productId, variationId]);

//     useEffect(() => {
//         if (selectedOption) {
//           setIsOpen(true);
//         }
//       }, [selectedOption]);

//   const handleOptionSelect = (option: OptionData) => {
//     setSelectedOption(option);
//     onOptionSelect(option); // Pass the selected option to the parent component
//     setIsOpen(true); // Open the modal when an option is selected
//   };

//   const handleChooseSelection = async () => {
//     if (selectedOption && selectedSpecification && selectedSpecification.id !== void 0) {
//         try {
//             const url = `specification/${productId}/${selectedOption.id}/${selectedSpecification.id}`;
//             const specificationData: SpecificationData = await server_calls.get<SpecificationData>(url);
//             setSelectedSpecification(specificationData);
//             setIsOpen(false); // Close the modal after updating the specification
//             setSelectedSpecification(null); // Clear the selected specification state
//         } catch (error) {
//             setError(error.message || 'An error occurred while fetching specification data');
//         }
//     }
// };

// const handleClose = () => {
//     setIsOpen(false); // Close the modal when the close button is clicked
//     // setSelectedSpecification(null); // Clear the selected specification state
//   };

//   const handleSpecificationSelect = (specification: SpecificationData) => {
//     setSelectedOptions(prevState => ({
//       ...prevState,
//       [selectedOption!.id]: specification
//     }));
//     setSelectedSpecification(specification); // Set the selected specification in the context
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
//         open={isOpen}
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
//                     <h2 id="child-modal-title">{selectedOption.name}</h2>
//                     <div>
//                       {selectedOption.image && (
//                         <img src={`${apiURL}/${selectedOption.image}`} alt={selectedOption.name} className='w-10 h-10 object-contain rounded-md mr-2' />
//                       )}
//                       <div id="child-modal-description" className='p-3'><BackendText description={selectedOption.description} /></div>
//                     </div>
//                   </div>
//                   <div>
//                     <div className='p-2'>
//                     <SelectionTable
//                     selectedOption={selectedOption}
//                     selectedSpecification={selectedSpecification}
//                     />
//                     </div>
//                     <div className="mt-auto">
//                       <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' onClick={handleChooseSelection}>Choose Selection</button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="ml-auto">
//                     <SpecificationDropdown
//                     productId={productId}
//                     optionId={selectedOption?.id || 0} // assuming selectedOption is available
//                     onSpecificationSelect={handleSpecificationSelect}
//                     selectedSpecificationProp={selectedOptions[selectedOption!.id]}
//                     setSelectedSpecificationProp={() => {}} // Provide a dummy function if not needed
//                     />
//                 </div>
//               </div>
//             )}
//           </Box>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default OptionModal;




import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import BackendText from './BackendText';
import SpecificationDropdown from './SpecificationDropdown';
import SelectionTable from './SelectionTable';
import { server_calls, apiURL } from "../api/server";
import { useProduct } from '../context/ProductContext';

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

interface OptionModalProps {
  productId: number;
  variationId: number;
}

const OptionModal: React.FC<OptionModalProps> = ({ productId, variationId }) => {
    const { selectedOption, setSelectedSpecification, selectedSpecification, setSelectedOption } = useProduct(); // Destructure selectedOption and setSelectedSpecification from the useProduct hook
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [options, setOptions] = useState<OptionData[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false); // Local state for modal open/close
    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: SpecificationData }>({});
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const optionData: OptionData[] = await server_calls.get<OptionData[]>(`option/${productId}/${variationId}`);
          const sortedOptions = [...optionData].sort((a, b) => a.ordering - b.ordering);
          if (optionData && optionData.length > 0) {
            setOptions(sortedOptions);
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
    setIsOpen(true); // Open the modal when an option is selected
  };

  const handleChooseSelection = async () => {
    if (selectedOption && selectedSpecification && selectedSpecification.id !== void 0) {

        console.log("Selected Option", selectedOption)
        console.log("Selected Specification", selectedSpecification)
        console.log("Selected Specification ID", selectedSpecification.id)
        try {
            const url = `specification/${productId}/${selectedOption.id}/${selectedSpecification.id}`;
            const specificationData: SpecificationData = await server_calls.get<SpecificationData>(url);
            setSelectedSpecification(specificationData);
            setSelectedOption(selectedOption);
            setIsOpen(false); // Close the modal after updating the specification
            setSelectedSpecification(null); // Clear the selected specification state
        } catch (error) {
            setError(error.message || 'An error occurred while fetching specification data');
        }
    }
};

const handleClose = () => {
    setIsOpen(false); // Close the modal when the close button is clicked
    // setSelectedSpecification(null); // Clear the selected specification state
  };

  const handleSpecificationSelect = (specification: SpecificationData) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [selectedOption!.id]: specification
    }));
    setSelectedSpecification(specification); // Set the selected specification in the context
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
        open={isOpen}
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
                      <div id="child-modal-description" className='p-3'><BackendText description={selectedOption.description} /></div>
                    </div>
                  </div>
                  <div>
                    <div className='p-2'>
                    <SelectionTable
                    selectedOption={selectedOption}
                    selectedSpecification={selectedSpecification}
                    />
                    </div>
                    <div className="mt-auto">
                      <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' onClick={handleChooseSelection}>Choose Selection</button>
                    </div>
                  </div>
                </div>
                <div className="ml-auto">
                    <SpecificationDropdown
                    productId={productId}
                    optionId={selectedOption?.id || 0} // assuming selectedOption is available
                    onSpecificationSelect={handleSpecificationSelect}
                    selectedSpecificationProp={selectedOptions[selectedOption!.id]}
                    setSelectedSpecificationProp={() => {}} // Provide a dummy function if not needed
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

export default OptionModal;








// function setSpecId(id: number) {
//     throw new Error('Function not implemented.');
// }
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import { server_calls, apiURL } from "../api/server";
// import React, { useState, useEffect } from 'react';
// import BackendText from './BackendText';
// import SpecificationDropdown from './SpecificationDropdown';
// import { useProduct } from '../context/ProductContext';
// import SummaryTable from './SummaryTable';


// // Option Modal


// interface ImageData {
//     id: number;
//     product: number;
//     image: string;
//     thumbnail: string;
//   }
  
//   interface OptionData {
//     id: number;
//     product: number;
//     variation: number;
//     name: string;
//     slug: string;
//     option_sku: string;
//     description: string;
//     price: number;
//     image: ImageData[];
//     thumbnail: ImageData[];
//     ordering: number;
//   }

//   interface SpecificationData {
//     id: number;
//     product: number;
//     option: number;
//     name: string;
//     slug: string;
//     specification_sku: string;
//     description: string;
//     price: number;
//     num_available: number;
//     is_featured: boolean;
//     image: ImageData[];
//     thumbnail: ImageData[];
//     ordering: number;
// }
  

// interface OptionModalProps {
//     productId: number;
//     variationId: number;
//     selectedSpecification: SpecificationData | null; // Add prop for selectedSpecification
//     onSpecificationSelect: (specification: SpecificationData) => void;
//     setSelectedSpecification: (specification: SpecificationData | null) => void; // Add function to update selectedSpecification
// }

// const OptionModal: React.FC<OptionModalProps & { onPriceChange: (price: number) => void }> = ({ productId, variationId }) => {
//     const { setSelectedSpecification, selectedSpecification } = useProduct();
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');
//     const [options, setOptions] = useState<OptionData[]>([]);
//     const [isOpen, setIsOpen] = useState<boolean>(false); // Local state for modal open/close

//     const [selectedOption, setSelectedOptionState] = useState<OptionData | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const optionData: OptionData[] = await server_calls.get<OptionData[]>(`option/${productId}/${variationId}`);
//                 const sortedOptions = [...optionData].sort((a, b) => a.ordering - b.ordering);
//                 if (optionData && optionData.length > 0) {
//                     setOptions(sortedOptions);
//                 } else {
//                     setError('Options not found');
//                 }
//             } catch (error) {
//                 setError(error.message || 'An error occurred while fetching data');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [productId, variationId]);

//     const handleOptionSelect = (option: OptionData) => {
//         setSelectedOptionState(option);
//         setIsOpen(true); // Open the modal when an option is selected
//     };


//     const handleChooseSelection = async () => {
//         if (selectedOption && selectedSpecification && selectedSpecification.id !== void 0) {
//             try {
//                 const url = `specification/${productId}/${selectedOption.id}/${selectedSpecification.id}`;
//                 const specificationData: SpecificationData = await server_calls.get<SpecificationData>(url);
//                 setSelectedSpecification(specificationData);
//                 setIsOpen(false); // Close the modal after updating the specification
//             } catch (error) {
//                 setError(error.message || 'An error occurred while fetching specification data');
//             }
//         }
//     };


//     const handleClose = () => {
//         setIsOpen(false); // Close the modal when the close button is clicked
//     };


//     function onSpecificationSelect(specification: SpecificationData): void {
//         throw new Error('Function not implemented.');
//     }

//     return (
//         <>
//             {options.map((option) => (
//                 <Button key={option.id} onClick={() => handleOptionSelect(option)}>
//                     {option.image && (
//                         <img src={`${apiURL}/${option.image}`} alt={option.name} className='w-10 h-10 object-contain rounded-md mr-2' />
//                     )}
//                     {option.name}
//                 </Button>
//             ))}
//             <Modal
//                 open={isOpen}
//                 onClose={handleClose}
//                 aria-labelledby="child-modal-title"
//                 aria-describedby="child-modal-description"
//             >
//                 <div className="">
//                     <Box sx={{
//                         position: 'absolute' as 'absolute',
//                         top: '50%',
//                         left: '50%',
//                         width: '100%',
//                         maxWidth: 1000,
//                         maxHeight: 600,
//                         transform: 'translate(-50%, -50%)',
//                         bgcolor: '#FDFFB6',
//                         boxShadow: 24,
//                         p: 3,
//                         display: 'flex',
//                         flexDirection: 'column'
//                     }}>
//                         {loading && <p>Loading...</p>}
//                         {error && <p>Error: {error}</p>}
//                         {!loading && options.length === 0 && <p>No options available for this product.</p>}
//                         {selectedOption && (
//                             <div className='flex-grow flex'>
//                                 <div>
//                                     <div>
//                                         <h2 id="child-modal-title">{selectedOption.name}</h2>
//                                         <div>
//                                             {selectedOption.image && (
//                                                 <img src={`${apiURL}/${selectedOption.image}`} alt={selectedOption.name} className='w-10 h-10 object-contain rounded-md mr-2' />
//                                             )}
//                                             <div id="child-modal-description" className='p-3'><BackendText description={selectedOption.description} /></div>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className='p-2'>
//                                             <SummaryTable />
//                                         </div>
//                                         <div className="mt-auto">
//                                             <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' onClick={handleChooseSelection}>Choose Selection</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="ml-auto">
//                                     <SpecificationDropdown
//                                         productId={productId}
//                                         optionId={selectedOption?.id || 0} // assuming selectedOption is available
//                                         onSpecificationSelect={onSpecificationSelect}
//                                         selectedSpecificationProp={selectedSpecification}
//                                         setSelectedSpecificationProp={setSelectedSpecification}
//                                     />
//                                     </div> 
//                             </div>
//                         )}
//                     </Box>
//                  </div>
//             </Modal>
//         </>
//     );
// };

// export default OptionModal;







