import { server_calls, apiURL } from "../api/server";
import React, { useState, useEffect } from 'react';
import { useProduct } from '../context/ProductContext';

interface ProductComponentProps {
    productId: number;
    optionId: number;
    onSpecificationSelect: (specification: SpecificationData) => void;
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

const SpecificationDropdown: React.FC<ProductComponentProps & { selectedSpecificationProp: SpecificationData | null; setSelectedSpecificationProp: (specification: SpecificationData | null) => void }> = ({
    productId,
    optionId,
    onSpecificationSelect,
    selectedSpecificationProp,
    setSelectedSpecificationProp
}) => {
    // const { selectedSpecification: contextSelectedSpecification, setSpecification } = useProduct();
    const { selectedOption, selectedSpecification, setSelectedSpecification } = useProduct();
    const [isOpen, setIsOpen] = useState(true);
    const [specifications, setSpecifications] = useState<SpecificationData[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [localSelectedSpecification, setLocalSelectedSpecification] = useState<SpecificationData | null>(null); // Keep the local state
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


    const fetchIndividualSpecification = async (specification: SpecificationData) => {
        try {
            if (selectedOption?.id === optionId) {
                const url = `specification/${productId}/${optionId}/${specification.id}`;
                const specificationData: SpecificationData = await server_calls.get<SpecificationData>(url);
                setSelectedSpecificationProp(specificationData);
            } else {
                setLocalSelectedSpecification(specification); // Set local state
                setSelectedSpecificationProp(specification);
            }
        } catch (error) {
            setError(error.message || 'An error occurred while fetching individual specification');
        }
    };


const handleSpecificationSelect = (specification: SpecificationData) => {
    setSelectedSpecificationProp(specification); // Update the selected specification in the context
    setSelectedSpecification(specification); // Update context with selected specification
    onSpecificationSelect(specification); // Notify the parent component about the selected specification
};

return (
    <div className="w-72 font-medium h-100">
    <div className={`bg-white w-full flex items-center justify-between rounded ${!selectedSpecificationProp && "bg-secondary-blue text-gray-700"}`}>
        {selectedSpecificationProp ? (

            
            <div>
                {selectedSpecificationProp.name.length > 25 ? `${selectedSpecificationProp.name.substring(0, 25)}...` : selectedSpecificationProp.name}
                {selectedSpecificationProp.image && selectedSpecificationProp.image.length > 0 && (
                    <img src={`${apiURL}/${selectedSpecificationProp.image}`} alt={selectedSpecificationProp.name} className='object-contain rounded-md mr-2' />
                )}
            </div>
            ) : (
                loading ? 'Loading...' : error ? error : 'Choose From Available Options'
            )}
        </div>
                <ul className={`bg-white mt-1 overflow-y-auto ${isOpen ? "max-h-60" : "max-h-0"}`}>
              {/* Check this empty div */}
              <div className="flex items-center px-2 sticky top-0 bg-white">
                  {/* Add content here if needed */}
              </div>
              {specifications.map((specification) => (
                  <li
                      key={specification.id}
                      className={` ${specification.name.toLowerCase() === selectedSpecificationProp?.name.toLowerCase() && "bg-secondary-blue text-black"}`}
                      onClick={() => {
                          if (specification.name.toLowerCase() !== selectedSpecificationProp?.name.toLowerCase()) {
                              handleSpecificationSelect(specification);
                              setInputValue("");
                          }
                      }}>
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

export default SpecificationDropdown;



//     // Fetch individual specification when selected
// const fetchIndividualSpecification = async (specification: SpecificationData) => {
//     try {
//         const url = `specification/${productId}/${optionId}/${specification.id}`;
//         const specificationData: SpecificationData = await server_calls.get<SpecificationData>(url);

//         // console.log(specificationData)

//         setSelectedSpecificationProp(specificationData);
//     } catch (error) {
//         setError(error.message || 'An error occurred while fetching individual specification');
//     }
// };

// const handleSpecificationSelect = (specification: SpecificationData) => {
//     if (fetchIndividualSpecification) {
//         fetchIndividualSpecification(specification); // Fetch individual specification
//     } else {
//         setLocalSelectedSpecification(specification); // Set local state
//         setSelectedSpecificationProp(specification); 
//         onSpecificationSelect(specification);
//     }
// };

// return (
//     <div className="w-72 font-medium h-100">
//     <div className={`bg-white w-full flex items-center justify-between rounded ${!selectedSpecificationProp && "bg-secondary-blue text-gray-700"}`}>
//         {selectedSpecificationProp ? (
//             <div>
//                 {selectedSpecificationProp.name.length > 25 ? `${selectedSpecificationProp.name.substring(0, 25)}...` : selectedSpecificationProp.name}
//                 {selectedSpecificationProp.image && selectedSpecificationProp.image.length > 0 && (
//                     <img src={`${apiURL}/${selectedSpecificationProp.image}`} alt={selectedSpecificationProp.name} className='object-contain rounded-md mr-2' />
//                 )}
//             </div>
//             ) : (
//                 loading ? 'Loading...' : error ? error : 'Choose From Available Options'
//             )}
//         </div>
//                 <ul className={`bg-white mt-1 overflow-y-auto ${isOpen ? "max-h-60" : "max-h-0"}`}>
//               {/* Check this empty div */}
//               <div className="flex items-center px-2 sticky top-0 bg-white">
//                   {/* Add content here if needed */}
//               </div>
//               {specifications.map((specification) => (
//                   <li
//                       key={specification.id}
//                       className={` ${specification.name.toLowerCase() === selectedSpecificationProp?.name.toLowerCase() && "bg-secondary-blue text-black"}`}
//                       onClick={() => {
//                           if (specification.name.toLowerCase() !== selectedSpecificationProp?.name.toLowerCase()) {
//                               handleSpecificationSelect(specification);
//                               setInputValue("");
//                             //   setIsOpen(false); // close dropdown after selection
//                           }
//                       }}>
//                     {specification.name}
//                     {specification.image && specification.image.length > 0 && (
//                         <img src={`${apiURL}/${specification.image}`} alt={specification.name} className='w-10 h-10 object-contain rounded-md mr-2' />
//                     )}
//                 </li>
//             ))}
//         </ul>
//     </div>
// );
// };