import React, { useState, useEffect } from 'react';
import { server_calls, apiURL } from "../api/server";
import VariationModal from './VariationModal';
import BackendText from './BackendText';
import SummaryTable from './SummaryTable';
import { useProduct } from '../context/ProductContext';
// import { useProductReducer } from '../context/ProductReducer';
import { useShoppingBag } from '../context/ShoppingBagContext'
import ShoppingBagComponent from './ShoppingBagComponent'; // Import the ShoppingBagComponent

interface ImageData {
    id: number;
    product: number;
    image: ImageData[];
    thumbnail: ImageData[];
}

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

// interface OptionData {
//     id: number;
//     product: number;
//     variation: number;
//     name: string;
//     slug: string;
//     option_sku: string;
//     description: string;
//     price: number;
//     image: ImageData[]; // Array of ImageData
//     thumbnail: ImageData[]; // Array of ImageData
//     ordering: number;
// }

//@ts-ignore
interface ProductComponentProps {
    productId: number;
    productSlug: string;
}

const ProductComponent: React.FC<ProductComponentProps> = ({ productSlug }) => {
    //@ts-ignore
    const { selectedProduct, setSelectedProduct, selectedOptionSpecifications, setSelectedOptionSpecifications, setSelectedOption, selectedOption, finalPrice, setFinalPrice } = useProduct();
    const { addToBag } = useShoppingBag();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [product, setProduct] = useState<ProductData | null>(null);
    const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
    const [amount, setAmount] = useState<number>(1);
    const [isBagOpen, setIsBagOpen] = useState<boolean>(false); // State variable to manage the visibility of the shopping bag component

    useEffect(() => {
        const fetchData = async () => {
            try {
                //@ts-ignore
                const productData: ProductData = await server_calls.get<ProductData>(`product/${productSlug}`);

                if (productData) {
                    setProduct(productData);
                    //@ts-ignore
                    setSelectedProduct(productData);
                } else {
                    setError('Product not found');
                }
            } catch (error) {
                //@ts-ignore
                setError(error.message || 'An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [productSlug, setSelectedProduct]);

    const handleImageClick = (index: number) => {
        setActiveImgIndex(index);
    };

    const handleAddToBag = () => {
        // Add selected product to the shopping bag
        //@ts-ignore
        addToBag(selectedProduct, selectedOption, selectedOptionSpecifications, amount);
        // Open the shopping bag component
        setIsBagOpen(true);
        // Reset component state
        resetComponent();
    };

    const resetComponent = () => {
        setActiveImgIndex(0);
        setAmount(1);
        setSelectedOption(null); // Set selectedOption to its initial value
        setSelectedOptionSpecifications(null); // Set selectedOptionSpecifications to its initial value
    
        // You can add additional state variables to reset here
    };

    return (
        //@ts-ignore
        <div className='flex flex-col justify-between lg:flex-row gap-5 lg:items-center bg-secondary-red' >
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {product && (
                <>
                    <div className='flex flex-col gap-5 lg:w-3/4 p-3'>
                        {product.images && product.images.length > 0 && (
                            <img src={`${apiURL}/${product.images[activeImgIndex]?.image}`} alt="" className='object-contain scale-down aspect-square rounded-xl bg-white p-5'/>
                        )}
                        <div className='flex flex-row justify-between h-24 space-x-1'>
                            {product.images && product.images.map((image, index) => (
                                <img key={index} src={`${apiURL}/${image.image}`} alt="" className='w-20 h-24 object-contain rounded-md cursor-pointer bg-white p-1' onClick={() => handleImageClick(index)}/>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col gap-10 lg:w-3/4 p-10'>
                        <div>
                            {product && product.category && (
                                <>
                                    <h1 className='text-3xl font-bold'>{product.name}</h1>
                                </>
                            )}
                        </div>

                        <div>
                            <div className='text-gray-700'>
                                <BackendText description={product.description} />
                            </div>
                        </div>
                        {/*//@ts-ignore*/}
                        <VariationModal productId={product.id} />

                        <div className=''>
                            <h3>Your Product Summary:</h3>
                            <div className='max-w-lg'> {/* Adjust max-w-lg to your desired width */}
                            <SummaryTable selectedProduct={selectedProduct} selectedOption={selectedOption} selectedOptionSpecifications={selectedOptionSpecifications} />
                            </div>

                            <div className='text-2xl font-semibold'>
                                {finalPrice !== Infinity ? (
                                    <p >Price: ${finalPrice}</p>
                                ) : (
                                    <p>Please make a selection</p>
                                )}
                            </div>
                        </div>

                        <div className='flex flex-row items-center gap-12'>
                            <div className='flex flex-row items-center'>
                                <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                                <span className='py-4 px-6 rounded-lg text-gray-700 font-bold'>{amount}</span>
                                <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                            </div>
                            <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' onClick={() => handleAddToBag()}>Add to Bag</button>
                        </div>

                    </div>
                </>
            )}
            {/* Render the ShoppingBagComponent with visibility controlled by state */}
            {isBagOpen && <ShoppingBagComponent isVisible={true} toggleVisibility={() => setIsBagOpen(false)} />}
        </div>
    );
}

export default ProductComponent;




// import React, { useState, useEffect } from 'react';
// import { server_calls, apiURL } from "../api/server";
// import VariationModal from './VariationModal';
// import BackendText from './BackendText';
// import SummaryTable from './SummaryTable';
// import { useProduct } from '../context/ProductContext';
// import { useProductReducer } from '../context/ProductReducer';
// import { useShoppingBag } from '../context/ShoppingBagContext'

// interface ImageData {
//     id: number;
//     product: number;
//     image: ImageData[];
//     thumbnail: ImageData[];
// }

// interface ProductData {
//     id: number;
//     category: number;
//     name: string;
//     slug: string;
//     product_sku: string;
//     description: string;
//     price: number;
//     is_featured: boolean;
//     images: ImageData[];
// }

// interface OptionData {
//     id: number;
//     product: number;
//     variation: number;
//     name: string;
//     slug: string;
//     option_sku: string;
//     description: string;
//     price: number;
//     image: ImageData[]; // Array of ImageData
//     thumbnail: ImageData[]; // Array of ImageData
//     ordering: number;
//   }

// interface ProductComponentProps {
//     productId: number;
//     productSlug: string;
// }

// const ProductComponent: React.FC<ProductComponentProps> = ({ productSlug }) => {
//     const { selectedProduct, setSelectedProduct, selectedOptionSpecifications, setSelectedOptionSpecifications, setSelectedOption, selectedOption, finalPrice, setFinalPrice } = useProduct();
//     // const { finalPrice } = useProductReducer();
//     const { addToBag } = useShoppingBag();
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');
//     const [product, setProduct] = useState<ProductData | null>(null);
//     const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
//     const [amount, setAmount] = useState<number>(1);


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const productData: ProductData = await server_calls.get<ProductData>(`product/${productSlug}`);

//                 if (productData) {
//                     setProduct(productData);
//                     setSelectedProduct(productData);
//                 } else {
//                     setError('Product not found');
//                 }
//             } catch (error) {
//                 setError(error.message || 'An error occurred while fetching data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [productSlug, setSelectedProduct]);

// const handleImageClick = (index: number) => {
//         setActiveImgIndex(index);
//     };

//     const handleAddToBag = () => {
//         // Add selected product to the shopping bag
//         addToBag(selectedProduct, selectedOption, selectedOptionSpecifications, amount);
        
//         // Clear product selection state
//         // setSelectedProduct(null);
//         // setSelectedOptionSpecifications(null);
//         // setSelectedOption(null);
//         // setFinalPrice(0);
//         // setAmount(1);
//         // handleAddToBag();
//     };


//     return (
//         <div className='flex flex-col justify-between lg:flex-row gap-5 lg:items-center bg-secondary-red'>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error}</p>}
//             {product && (
//                 <>
//                     <div className='flex flex-col gap-5 lg:w-3/4 p-3'>
//                         {product.images && product.images.length > 0 && (
//                             <img src={`${apiURL}/${product.images[activeImgIndex]?.image}`} alt="" className='object-contain scale-down aspect-square rounded-xl bg-white p-5'/>
//                         )}
//                         <div className='flex flex-row justify-between h-24 space-x-1'>
//                             {product.images && product.images.map((image, index) => (
//                                 <img key={index} src={`${apiURL}/${image.image}`} alt="" className='w-20 h-24 object-contain rounded-md cursor-pointer bg-white p-1' onClick={() => handleImageClick(index)}/>
//                             ))}
//                         </div>
//                     </div>


//                     <div className='flex flex-col gap-10 lg:w-3/4 p-10'>

//                         <div>
//                             {product && product.category && (
//                                 <>
//                                     <h1 className='text-3xl font-bold'>{product.name}</h1>
//                                 </>
//                             )}
//                         </div>

//                         <div>
//                             <div className='text-gray-700'>
//                                 <BackendText description={product.description} />
//                             </div>
//                         </div>
                        
//                         <VariationModal productId={product.id} />
//                         {/* Display the product price */}



//                         <div className=''>
//                             {/* Display the product summary */}
//                             <h3>Your Product Summary:</h3>
//                             <div className='max-w-lg'> {/* Adjust max-w-lg to your desired width */}
//                             <SummaryTable selectedProduct={selectedProduct} selectedOption={selectedOption} selectedOptionSpecifications={selectedOptionSpecifications} />
//                                 {/* <SummaryTable selectedProduct={selectedProduct} selectedVariation={null} selectedOption={null} selectedSpecification={null} /> */}
//                             </div>

//                             <div className='text-2xl font-semibold'>
//                                 {finalPrice !== Infinity ? (
//                                 <p >Price: ${finalPrice}</p>
//                                 ) : (
//                                 <p>Please make a selection</p>
//                                 )}
//                             </div>

//                         </div>


//                         <div className='flex flex-row items-center gap-12'>
//                             <div className='flex flex-row items-center'>
//                                 <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
//                                 <span className='py-4 px-6 rounded-lg text-gray-700 font-bold'>{amount}</span>
//                                 <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
//                             </div>
//                             <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' onClick={() => handleAddToBag()}>Add to Bag</button>
//                         </div>

//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default ProductComponent;






// import React, { useState, useEffect } from 'react';
// import { server_calls, apiURL } from "../api/server";
// import VariationModal from './VariationModal';
// import BackendText from './BackendText';
// import SummaryTable from './SummaryTable';
// import { useProduct } from '../context/ProductContext';

// interface ImageData {
//     id: number;
//     product: number;
//     image: ImageData[];
//     thumbnail: ImageData[];
// }

// interface ProductData {
//     id: number;
//     category: number;
//     name: string;
//     slug: string;
//     product_sku: string;
//     description: string;
//     price: string;
//     is_featured: boolean;
//     images: ImageData[];
// }

// interface OptionData {
//     id: number;
//     product: number;
//     variation: number;
//     name: string;
//     slug: string;
//     option_sku: string;
//     description: string;
//     price: number;
//     image: ImageData[]; // Array of ImageData
//     thumbnail: ImageData[]; // Array of ImageData
//     ordering: number;
//   }

// interface ProductComponentProps {
//     productId: number;
//     productSlug: string;
//     onPriceChange: (price: number, productId: number) => void; // Add onPriceChange to the props
// }

// const ProductComponent: React.FC<ProductComponentProps> = ({ productSlug, onPriceChange }) => {
//     const { selectedProduct, setSelectedProduct, selectedOptionSpecifications, selectedOption } = useProduct();
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');
//     const [product, setProduct] = useState<ProductData | null>(null);
//     const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
//     const [price, setPrice] = useState<number | null>(null);
//     const [productPrice, setProductPrice] = useState<number | null>(null);
//     const [amount, setAmount] = useState<number>(1);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const productData: ProductData = await server_calls.get<ProductData>(`product/${productSlug}`);

//                 if (productData) {
//                     setProduct(productData);
//                     setSelectedProduct(productData);
//                 } else {
//                     setError('Product not found');
//                 }
//             } catch (error) {
//                 setError(error.message || 'An error occurred while fetching data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [productSlug, setSelectedProduct]);

// const handlePriceChange = (newPrice: number, productId: number) => {
//     if (productId === product.id) {
//         setProductPrice(newPrice);
//       }
//         setPrice(newPrice);
//         // Pass both price and productId to the parent component
//         onPriceChange(newPrice, productId);
//       };


// const handleImageClick = (index: number) => {
//         setActiveImgIndex(index);
//     };

//     return (
//         <div className='flex flex-col justify-between lg:flex-row gap-5 lg:items-center bg-secondary-red'>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error}</p>}
//             {product && (
//                 <>
//                     <div className='flex flex-col gap-5 lg:w-3/4 p-3'>
//                         {product.images && product.images.length > 0 && (
//                             <img src={`${apiURL}/${product.images[activeImgIndex]?.image}`} alt="" className='object-contain scale-down aspect-square rounded-xl bg-white p-5'/>
//                         )}
//                         <div className='flex flex-row justify-between h-24 space-x-1'>
//                             {product.images && product.images.map((image, index) => (
//                                 <img key={index} src={`${apiURL}/${image.image}`} alt="" className='w-20 h-24 object-contain rounded-md cursor-pointer bg-white p-1' onClick={() => handleImageClick(index)}/>
//                             ))}
//                         </div>
//                     </div>


//                     <div className='flex flex-col gap-10 lg:w-3/4 p-10'>

//                         <div>
//                             {product && product.category && (
//                                 <>
//                                     <h1 className='text-3xl font-bold'>{product.name}</h1>
//                                 </>
//                             )}
//                         </div>

//                         <div>
//                             <div className='text-gray-700'>
//                                 <BackendText description={product.description} />
//                             </div>
//                         </div>
                        
//                         <VariationModal 
//                         productId={product.id}
//                         onPriceChange={handlePriceChange} // Pass function to update price
//                          />
//                         {/* Display the product price */}



//                         <div className=''>
//                             {/* Display the product summary */}
//                             <h3>Your Product Summary:</h3>
//                             <div className='max-w-lg'> {/* Adjust max-w-lg to your desired width */}
//                             <SummaryTable selectedProduct={selectedProduct} selectedOption={selectedOption} selectedOptionSpecifications={selectedOptionSpecifications} />
//                                 {/* <SummaryTable selectedProduct={selectedProduct} selectedVariation={null} selectedOption={null} selectedSpecification={null} /> */}
//                             </div>

//                             <p>Price:</p> 
//                             <h6 className='text-2xl font-semibold'>
//                                 {productPrice !== null ? `$ ${productPrice}` : 'Price not available'}
//                             </h6>
                            
//                         </div>


//                         <div className='flex flex-row items-center gap-12'>
//                             <div className='flex flex-row items-center'>
//                                 <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
//                                 <span className='py-4 px-6 rounded-lg text-gray-700 font-bold'>{amount}</span>
//                                 <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
//                             </div>
//                             <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15'>Add to Cart</button>
//                         </div>

//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default ProductComponent;










// import React, { useState, useEffect } from 'react';
// import { server_calls, apiURL } from "../api/server";
// import VariationModal from './VariationModal';
// import BackendText from './BackendText';

// interface ImageData {
//     id: number;
//     product: number;
//     image: ImageData[];
//     thumbnail: ImageData[];
// }

// interface ProductData {
//     id: number;
//     category: number;
//     name: string;
//     slug: string;
//     product_sku: string;
//     description: string;
//     price: string;
//     is_featured: boolean;
//     images: ImageData[];
// }

// interface OptionData {
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
// }

// interface SpecificationData {
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

// interface ProductComponentProps {
//     productId: number;
//     productSlug: string;
//     onPriceChange: (price: number, productId: number) => void;
//     onOptionSelect: (option: OptionData[]) => void; // Modify to handle array of options
//     onSpecificationSelect: (specification: SpecificationData[]) => void; 
//     selectedSpecification: SpecificationData[]; 
//     selectedOption: OptionData[]; 
// }

// const ProductComponent: React.FC<ProductComponentProps> = ({ productId, productSlug, onPriceChange, onOptionSelect, onSpecificationSelect }) => {
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');
//     const [product, setProduct] = useState<ProductData | null>(null);
//     const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
//     const [selectedSpecifications, setSelectedSpecifications] = useState<SpecificationData[]>([]); // Updated state to store array of selected specifications
//     const [selectedOptions, setSelectedOptions] = useState<OptionData[]>([]); // Updated state to store array of selected options
//     const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const productData: ProductData = await server_calls.get<ProductData>(`product/${productSlug}`);

//                 if (productData) {
//                     setProduct(productData);
//                 } else {
//                     setError('Product not found');
//                 }
//             } catch (error) {
//                 setError(error.message || 'An error occurred while fetching data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [productSlug]);

//     const handleProductPriceChange = (newPrice: number) => {
//         setSelectedPrice(newPrice);
//         onPriceChange(newPrice, product?.id || 0);
//     };

//     // Callback function to receive selected specification data
//     const handleSpecificationSelect = (specification: SpecificationData) => {
//         setSelectedSpecifications([...selectedSpecifications, specification]);
//         onSpecificationSelect(specification);
//     };

//     // Callback function to receive selected option data
//     const handleOptionSelect = (option: OptionData) => {
//         setSelectedOptions([...selectedOptions, option]);
//         onOptionSelect(option);
//     };

//     const handleImageClick = (index: number) => {
//         setActiveImgIndex(index);
//     };

//     const [amount, setAmount] = useState<number>(1);

//     // Function to handle adding product to cart
//     const handleAddToCart = () => {
       
//     };

//     return (
//         <div className='flex flex-col justify-between lg:flex-row gap-5 lg:items-center bg-secondary-red'>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error}</p>}
//             {product && (
//                 <>
//                     <div className='flex flex-col gap-5 lg:w-3/4 p-3'>
//                         {product.images && product.images.length > 0 && (
//                             <img src={`${apiURL}/${product.images[activeImgIndex]?.image}`} alt="" className='object-contain scale-down aspect-square rounded-xl bg-white p-5'/>
//                         )}
//                         <div className='flex flex-row justify-between h-24 space-x-1'>
//                             {product.images && product.images.map((image, index) => (
//                                 <img key={index} src={`${apiURL}/${image.image}`} alt="" className='w-20 h-24 object-contain rounded-md cursor-pointer bg-white p-1' onClick={() => handleImageClick(index)}/>
//                             ))}
//                         </div>
//                     </div>
//                     <div className='flex flex-col gap-10 lg:w-3/4 p-10'>
//                         <div>
//                             {product && product.category && (
//                                 <>
//                                     <h1 className='text-3xl font-bold'>{product.name}</h1>
//                                 </>
//                             )}
//                         </div>
//                         <div className='text-gray-700'>
//                             <BackendText description={product.description} />
//                         </div>
//                         <VariationModal 
//                             productId={product.id}
//                             onPriceChange={handleProductPriceChange}
//                             onOptionSelect={handleOptionSelect} 
//                             onSpecificationSelect={handleSpecificationSelect}
//                         />
//                         <div className='mt-auto'>
//                             <div>
//                                 {/* Display the product summary */}
//                                 <h3>Your Product Summary:</h3>
//                                 <p>Options:</p>
//                                 <ul>
//                                     {selectedOptions.map((option, index) => (
//                                         <li key={index}>{option.name}</li>
//                                     ))}
//                                 </ul>
//                                 <p>Specifications:</p>
//                                 <ul>
//                                     {selectedSpecifications.map((specification, index) => (
//                                         <li key={index}>{specification.name}</li>
//                                     ))}
//                                 </ul>
//                                 <p>Price: ${selectedPrice}</p>
//                             </div>
                            
//                             <div className='flex flex-row items-center gap-10 mt-10'>
//                                 <div className='flex flex-row items-center'>
//                                     <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount(prev => prev - 1)}>-</button>
//                                     <span className='py-4 px-6 rounded-lg text-gray-700 font-bold'>{amount}</span>
//                                     <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount(prev => prev + 1)}>+</button>
//                                 </div>
//                                 <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' onClick={handleAddToCart}>Add to Cart</button>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default ProductComponent;










// import React, { useState, useEffect } from 'react';
// import { server_calls, apiURL } from "../api/server";
// import VariationModal from './VariationModal';
// import BackendText from './BackendText';

// interface ImageData {
//     id: number;
//     product: number;
//     image: ImageData[];
//     thumbnail: ImageData[];
// }

// interface ProductData {
//     id: number;
//     category: number;
//     name: string;
//     slug: string;
//     product_sku: string;
//     description: string;
//     price: string;
//     is_featured: boolean;
//     images: ImageData[];
// }

// interface OptionData {
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
// }

// interface SpecificationData {
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

// interface ProductComponentProps {
//     productId: number;
//     productSlug: string;
//     onPriceChange: (price: number, productId: number) => void;
//     onOptionSelect: (option: OptionData[]) => void; // Modify to handle array of options
//     onSpecificationSelect: (specification: SpecificationData[]) => void; 
//     selectedSpecification: SpecificationData[]; 
//     selectedOption: OptionData[]; 
// }

// const ProductComponent: React.FC<ProductComponentProps> = ({ productId, productSlug, onPriceChange, onOptionSelect, onSpecificationSelect }) => {
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');
//     const [product, setProduct] = useState<ProductData | null>(null);
//     const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
//     const [selectedSpecifications, setSelectedSpecifications] = useState<SpecificationData[]>([]); // Updated state to store array of selected specifications
//     const [selectedOptions, setSelectedOptions] = useState<OptionData[]>([]); // Updated state to store array of selected options
//     const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const productData: ProductData = await server_calls.get<ProductData>(`product/${productSlug}`);

//                 if (productData) {
//                     setProduct(productData);
//                 } else {
//                     setError('Product not found');
//                 }
//             } catch (error) {
//                 setError(error.message || 'An error occurred while fetching data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [productSlug]);

//     const handleProductPriceChange = (newPrice: number) => {
//         setSelectedPrice(newPrice);
//         onPriceChange(newPrice, product?.id || 0);
//     };

//     // Callback function to receive selected specification data
//     const handleSpecificationSelect = (specification: SpecificationData) => {
//         setSelectedSpecifications([...selectedSpecifications, specification]);
//         onSpecificationSelect(specification);
//     };

//     // Callback function to receive selected option data
//     const handleOptionSelect = (option: OptionData) => {
//         setSelectedOptions([...selectedOptions, option]);
//         onOptionSelect(option);
//     };

//     const handleImageClick = (index: number) => {
//         setActiveImgIndex(index);
//     };

//     const [amount, setAmount] = useState<number>(1);

//     // Function to handle adding product to cart
//     const handleAddToCart = () => {
       
//     };

//     return (
//         <div className='flex flex-col justify-between lg:flex-row gap-5 lg:items-center bg-secondary-red'>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error}</p>}
//             {product && (
//                 <>
//                     <div className='flex flex-col gap-5 lg:w-3/4 p-3'>
//                         {product.images && product.images.length > 0 && (
//                             <img src={`${apiURL}/${product.images[activeImgIndex]?.image}`} alt="" className='object-contain scale-down aspect-square rounded-xl bg-white p-5'/>
//                         )}
//                         <div className='flex flex-row justify-between h-24 space-x-1'>
//                             {product.images && product.images.map((image, index) => (
//                                 <img key={index} src={`${apiURL}/${image.image}`} alt="" className='w-20 h-24 object-contain rounded-md cursor-pointer bg-white p-1' onClick={() => handleImageClick(index)}/>
//                             ))}
//                         </div>
//                     </div>
//                     <div className='flex flex-col gap-10 lg:w-3/4 p-10'>
//                         <div>
//                             {product && product.category && (
//                                 <>
//                                     <h1 className='text-3xl font-bold'>{product.name}</h1>
//                                 </>
//                             )}
//                         </div>
//                         <div className='text-gray-700'>
//                             <BackendText description={product.description} />
//                         </div>
//                         <VariationModal 
//                             productId={product.id}
//                             onPriceChange={handleProductPriceChange}
//                             onOptionSelect={handleOptionSelect} 
//                             onSpecificationSelect={handleSpecificationSelect}
//                         />
//                         <div className='mt-auto'>
//                             <div>
//                                 {/* Display the product summary */}
//                                 <h3>Your Product Summary:</h3>
//                                 <p>Options:</p>
//                                 <ul>
//                                     {selectedOptions.map((option, index) => (
//                                         <li key={index}>{option.name}</li>
//                                     ))}
//                                 </ul>
//                                 <p>Specifications:</p>
//                                 <ul>
//                                     {selectedSpecifications.map((specification, index) => (
//                                         <li key={index}>{specification.name}</li>
//                                     ))}
//                                 </ul>
//                                 <p>Price: ${selectedPrice}</p>
//                             </div>
                            
//                             <div className='flex flex-row items-center gap-10 mt-10'>
//                                 <div className='flex flex-row items-center'>
//                                     <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount(prev => prev - 1)}>-</button>
//                                     <span className='py-4 px-6 rounded-lg text-gray-700 font-bold'>{amount}</span>
//                                     <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount(prev => prev + 1)}>+</button>
//                                 </div>
//                                 <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15' onClick={handleAddToCart}>Add to Cart</button>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default ProductComponent;



// import React, { useState, useEffect } from 'react';
// import { server_calls, apiURL } from "../api/server";
// import VariationModal from './VariationModal';
// // import AddtoCart from './AddtoCart';

// interface CategoryData {
//     id: number;
//     name: string;
//     slug: string;
//     category_sku: string;
//     is_featured: boolean;
//     ordering: number;
// }

// interface ImageData {
//     id: number;
//     product: number;
//     image: ImageData[];
//     thumbnail: ImageData[];
// }

// interface ProductData {
//     id: number;
//     category: number;
//     name: string;
//     slug: string;
//     product_sku: string;
//     description: string;
//     price: string;
//     is_featured: boolean;
//     images: ImageData[];
// }

// interface ProductComponentProps {
//   productId: number;
//   productSlug: string;
// }

// interface RouteParams {
//     productSlug: string;
// }

// const ProductComponent: React.FC<ProductComponentProps> = ({ productSlug }) => {
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');
//     const [product, setProduct] = useState<ProductData | null>(null);
//     const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
//     const [amount, setAmount] = useState<number>(1);
    

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const productData: ProductData = await server_calls.get<ProductData>(`product/${productSlug}`);
                
//                 console.log(productData, 'du du donuts');
//                 console.log(productSlug, 'laugh, love');
    
//                 if (productData) {
//                     setProduct(productData); // Set the product data

//                     console.log('this is the productData', productData);

//                 } else {
//                     setError('Product not found');
//                 }
//             } catch (error) {
//                 setError(error.message || 'An error occurred while fetching data');
//             } finally {
//                 setLoading(false);
//             }
//         };
    
//         fetchData();
//     }, [productSlug]);

// const handleImageClick = (index: number) => {
//         setActiveImgIndex(index);
//     };


//     return (
//         <div className='flex flex-col justify-between lg:flex-row gap-5 lg:items-center bg-secondary-red'>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error}</p>}
//             {product && (
//                 <>
//                     <div className='flex flex-col gap-5 lg:w-3/4 p-3'>
//                         {product.images && product.images.length > 0 && (
//                             <img src={`${apiURL}/${product.images[activeImgIndex]?.image}`} alt="" className='object-contain scale-down aspect-square rounded-xl bg-white p-5'/>
//                         )}
//                         <div className='flex flex-row justify-between h-24 space-x-1'>
//                             {product.images && product.images.map((image, index) => (
//                                 <img key={index} src={`${apiURL}/${image.image}`} alt="" className='w-20 h-24 object-contain rounded-md cursor-pointer bg-white p-1' onClick={() => handleImageClick(index)}/>
//                             ))}
//                         </div>
//                     </div>
//                     <div className='flex flex-col gap-10 lg:w-3/4 p-10'>

//                         <div>
//                         {product && product.category && (
//                             <>
//                                 <div>
//                                     <h1 className='text-3xl font-bold'>{product.name}</h1>
//                                 </div>
//                             </>
//                         )}
//                         </div>

//                         <div>
//                         <p className='text-gray-700 p-5'>
//                             {product.description}
//                         </p>
//                         </div>



//                         <div>
//                             <VariationModal />
//                         </div>
//                             {/* <AddtoCart /> */}

//                          {/* <div className="summary">Need to make a component to display the variation options and price</div> */}

//                         <h6 className='text-2xl font-semibold'>$ {product.price}</h6>
                        
//                         <div className='flex flex-row items-center gap-12'>
//                             <div className='flex flex-row items-center'>
//                                 <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
//                                 <span className='py-4 px-6 rounded-lg text-gray-700 font-bold'>{amount}</span>
//                                 <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
//                             </div>
//                             <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15'>Add to Cart</button>
//                         </div>

//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default ProductComponent;







// import React, { useState, useEffect } from 'react';
// import { server_calls, apiURL } from "../api/server";
// import VariationModal from './VariationModal';

// interface CategoryData {
//     id: number;
//     name: string;
//     slug: string;
//     category_sku: string;
//     is_featured: boolean;
//     ordering: number;
// }

// interface ImageData {
//     id: number;
//     product: number;
//     image: ImageData[];
//     thumbnail: ImageData[];
// }

// interface ProductData {
//     id: number;
//     category: number;
//     name: string;
//     slug: string;
//     product_sku: string;
//     description: string;
//     price: string;
//     is_featured: boolean;
//     images: ImageData[];
// }

// interface ProductComponentProps {
//   productId: string;
// }

// interface CategoryData {
//     id: number;
//     name: string;
//     slug: string;
//     category_sku: string;
//     is_featured: boolean;
//     ordering: number;
// }

// interface ProductData {
//     id: number;
//     category: number;
//     name: string;
//     slug: string;
//     product_sku: string;
//     description: string;
//     price: string;
//     is_featured: boolean;
//     images: ImageData[];
// }

// interface RouteParams {
//     categorySlug: string;
//     productSlug: string;
// }


// const Product: React.FC = () => {
//     const { productSlug } = useParams<RouteParams>();
//     const [productId, setProductId] = useState<number>(0);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');
//     const [product, setProduct] = useState<ProductData | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const productData: ProductData[] = await server_calls.get<ProductData[]>(`product/${categorySlug}/${productSlug}/`);
//                 const foundProduct = productData.find((product) => product.slug === productSlug);
//                 if (foundProduct) {
//                     setProductId(foundProduct.id);
//                     setProduct(foundProduct);
//                 } else {
//                     setError('Product not found');
//                 }
//             } catch (error) {
//                 setError(error.message || 'An error occurred while fetching data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [productSlug]);





//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const productData: ProductData = await server_calls.get(`product/${productId}`);
//           setProduct(productData);
//           setLoading(false);
//         } catch (error) {
//           setError(error.message || 'An error occurred while fetching data');
//           setLoading(false);
//         }
//       };
  
//       fetchData();
//     }, [productId]);

//     const handleImageClick = (index: number) => {
//         setActiveImgIndex(index);
//     };

//     return (
//         <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center bg-secondary-red'>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error}</p>}
//             {product && (
//                 <>
//                     <div className='flex flex-col gap-6 lg:w-2/4 p-10'>
//                         {product.images && product.images.length > 0 && (
//                             <img src={`${apiURL}/${product.images[activeImgIndex]?.image}`} alt="" className='object-contain scale-down aspect-square rounded-xl bg-white p-5'/>
//                         )}
//                         <div className='flex flex-row justify-between h-24'>
//                             {product.images && product.images.map((image, index) => (
//                                 <img key={index} src={`${apiURL}/${image.image}`} alt="" className='w-24 h-24 object-contain rounded-md cursor-pointer bg-white p-1' onClick={() => handleImageClick(index)}/>
//                             ))}
//                         </div>
//                     </div>
//                     <div className='flex flex-col gap-4 lg:w-2/4'>
//                         {product && product.category && (
//                             <>
//                                 <div>
//                                     <span className='text-primary-purple font-semibold'>{product.category.name}</span>
//                                     <h1 className='text-3xl font-bold'>{product.name}</h1>
//                                 </div>
//                             </>
//                         )}
//                         <p className='text-gray-700'>
//                             {product.description}
//                         </p>
//                         <div>
//                             <VariationModal />
//                         </div>
//                         <h6 className='text-2xl font-semibold'>$ {product.price}</h6>
//                         <div className="summary">Need to make a component to display the variation options and price</div>
//                         <div className='flex flex-row items-center gap-12'>
//                             <div className='flex flex-row items-center'>
//                                 <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount((prev) => prev - 1)}><i className="fa-solid object-contain fa-minus"></i></button>
//                                 <span className='py-4 px-6 rounded-lg text-gray-700 font-bold'>{amount}</span>
//                                 <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount((prev) => prev + 1)}><i className="fa-solid object-contain fa-plus"></i></button>
//                             </div>
//                             <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15'>Add to Cart</button>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default ProductComponent;


