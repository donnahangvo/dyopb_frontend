import React, { useState, useEffect } from 'react';
import { server_calls, apiURL } from "../api/server";

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

const SpecificationDropdown: React.FC<ProductComponentProps & { onPriceChange: (price: number) => void }> = ({ productId, optionId, onPriceChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [specifications, setSpecifications] = useState<SpecificationData[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [selectedSpecification, setSelectedSpecification] = useState<SpecificationData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const specificationData: SpecificationData[] = await server_calls.get<SpecificationData[]>(`specification/${productId}/${optionId}`);
                console.log('this is the fetched specifications', specificationData)
                
                if (specificationData && specificationData.length > 0) {
                    setSpecifications(specificationData);
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

        console.log(specification.name, 'over here!')
    };

    const sortedSpecifications = [...specifications].sort((a, b) => a.ordering - b.ordering);

    return (
        <div className="w-72 font-medium h-80">
            <div className={`bg-white w-full p-2 flex items-center justify-between rounded ${!selectedSpecification && "text-gray-700"}`}>
                {selectedSpecification ? (
                    selectedSpecification.name.length > 25 ? `${selectedSpecification.name.substring(0, 25)}...` : selectedSpecification.name
                ) : (
                    loading ? 'Loading...' : error ? error : 'Please choose from available options'
                )}
                <i className={`${isOpen && "rotate-180"} fa-solid fa-chevron-down`}></i>
            </div>
            <ul className={`bg-white mt-2 overflow-y-auto ${isOpen ? "max-h-60" : "max-h-0"}`}>
                <div className="flex items-center px-2 sticky top-0 bg-white">
                    <i className="text-gray-700 fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                        placeholder="Choose a specification"
                        className="placeholder:text-gray-700 p-2 outline-none"
                    />
                </div>
                {sortedSpecifications.map((specification) => (
                    <li
                        key={specification.id}
                        className={` ${specification.name.toLowerCase() === selectedSpecification?.name.toLowerCase() && "bg-sky-600 text-white"}`}
                        onClick={() => {
                            if (specification.name.toLowerCase() !== selectedSpecification?.name.toLowerCase()) {
                                setSelectedSpecification(specification);
                                handleSpecificationSelect(specification);
                                onPriceChange(specification.price);
                                setInputValue("");
                                setIsOpen(false);

                                console.log(specification.name)
                            }
                        }}
                    >
                        {specification.name}
                        {specification.image && specification.image.length > 0 && (
                            <img src={`${apiURL}/${specification.image}`} alt={specification.name} className='w-10 h-10 object-contain rounded-md mr-2' />
                        )}
                        {specification.description}
                        {specification.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SpecificationDropdown;









// https://www.youtube.com/watch?v=KMxX8yFeK5k  for scrolling dropdown menu "Custom Dropdown Select Menu With Reactjs and Tailwind CSS | React js and tailwind css"
// import { server_calls, apiURL } from "../api/server";
// import React, { useState, useEffect, useRef } from 'react';



// // Specification Dropdown Menu 

// interface ProductComponentProps {
//     productId: number;
//     optionId: number;
//   }
  
//   interface ImageData {
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
//   }
  
//   const SpecificationDropdown: React.FC<ProductComponentProps & { onPriceChange: (price: number) => void }> = ({ productId, optionId, onPriceChange }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedSpecification, setSelectedSpecification] = useState<SpecificationData | null>(null);
//     const [inputValue, setInputValue] = useState('');
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');
//     const [specifications, setSpecifications] = useState<SpecificationData[]>([]);
//     const [selectedOption, setSelectedOption] = useState<OptionData | null>(null);
//     const [price, setPrice] = useState<number | null>(null);
  
//     const menuRef = useRef<HTMLDivElement>(null);
//     const iconRef = useRef<HTMLButtonElement>(null);
  
//     useEffect(() => {
  
      
//       const fetchData = async () => {
//         try {
//           const specificationData: SpecificationData[] = await server_calls.get<SpecificationData[]>(`specification/${productId}/${optionId}`);
  
//           console.log('passed in optionId', optionId)
//           console.log('fetched specification data', specificationData)
  
//           if (specificationData && specificationData.length > 0) {
//             setSpecifications(specificationData);
//           } else {
//             setError('No specifications available for this product');
//           }
//         } catch (error) {
//           setError(error.message || 'An error occurred while fetching data');
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchData();
//     }, [productId, optionId]);
  
//     const handleSpecificationSelect = (specification: SpecificationData) => {
//       setSelectedSpecification(specification);
//       onPriceChange(specification.price); 
//     };
  
//     const sortedSpecifications = [...specifications].sort((a, b) => a.ordering - b.ordering);
  
//     const handleClickOutside = (e: MouseEvent) => {
//       if (menuRef.current && iconRef.current && !menuRef.current.contains(e.target as Node) && !iconRef.current.contains(e.target as Node)) {
//         setIsOpen(false);
//       }
//     };
  
//     useEffect(() => {
//       document.addEventListener('mousedown', handleClickOutside);
  
//       return () => {
//         document.removeEventListener('mousedown', handleClickOutside);
//       };
//     }, []);
  
//     return (
//       <div className="relative flex flex-col items-center w-[150px] rounded bg-secondary-yellow">
//         <button
//           ref={iconRef}
//           onClick={() => setIsOpen((prev) => !prev)}
//           className="bg-primary-red p-4 w-full flex items-center rounded-lg text-white hover:text-primary-purple active:text-primary-purple active:bg-secondary-red"
//         >
//           {!isOpen ? (
//             <i className="fa-solid fa-moon mr-2"></i>
//           ) : (
//             <i className="fa-regular fa-moon mr-2"></i>
//           )}
//           {selectedOption?.name || `Select ${selectedOption.name}`}
//         </button>
  
//         {isOpen && (
//           <div
//             ref={menuRef}
//             onClick={() => setIsOpen(false)}
//             className="bg-secondary-red absolute top-20 flex flex-col justify-between items-start rounded-lg p-2 w-full"
//           >
//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error}</p>}
//             {!loading && sortedSpecifications.length === 0 && <p>{error}</p>}
//             {!loading && sortedSpecifications.length > 0 && (
//               <div className="w-72 font-medium h-80">
//                 <ul className={`bg-white mt-2 overflow-y-auto ${isOpen ? 'max-h-60' : 'max-h-0'}`}>
//                   <div className="flex items-center px-2 sticky top-0 bg-white">
//                     <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '18px' }}></i>
//                     <input
//                       type="text"
//                       value={inputValue}
//                       onChange={(e) => setInputValue(e.target.value.toLowerCase())}
//                       placeholder="Choose a specification"
//                       className="placeholder:text-gray-700 p-2 outline-none"
//                     />
//                   </div>
//                   {!loading && sortedSpecifications.length > 0 && sortedSpecifications.map((specification) => (
//                     <li
//                       key={specification.id}
//                       className={`p-2 text hover:bg-sky-600 hover:text-white ${
//                         selectedSpecification && specification.id === selectedSpecification.id && 'bg-sky-600 text-white'
//                       } ${specification.name.toLowerCase().includes(inputValue) ? 'block' : 'hidden'}`}
//                       onClick={() => {
//                         if (specification.id !== selectedSpecification?.id) {
//                           setSelectedSpecification(specification);
//                           setIsOpen(false);
//                           setInputValue('');
//                         }
//                       }}
//                     >
//                       {specification.name}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };
  

//   export default SpecificationDropdown;