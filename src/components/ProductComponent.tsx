import React, { useState, useEffect } from 'react';
import { server_calls, apiURL } from "../api/server";
import VariationModal from './VariationModal';
import BackendText from './BackendText';
// import AddtoCart from './AddtoCart';

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
    price: string;
    is_featured: boolean;
    images: ImageData[];
}

interface ProductComponentProps {
    productId: number;
    productSlug: string;
}

const ProductComponent: React.FC<ProductComponentProps> = ({ productSlug }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [product, setProduct] = useState<ProductData | null>(null);
    const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
    const [amount, setAmount] = useState<number>(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData: ProductData = await server_calls.get<ProductData>(`product/${productSlug}`);

                if (productData) {
                    setProduct(productData);
                } else {
                    setError('Product not found');
                }
            } catch (error) {
                setError(error.message || 'An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [productSlug]);


const [productPrice, setProductPrice] = useState<number | null>(null);

    // Callback function to receive price from VariationModal
const handleProductPriceChange = (newPrice: number, productId: number) => {
    if (productId === product.id) {
      setProductPrice(newPrice);
    }
  };

const handleImageClick = (index: number) => {
        setActiveImgIndex(index);
    };

    return (
        <div className='flex flex-col justify-between lg:flex-row gap-5 lg:items-center bg-secondary-red'>
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
                            <p className='text-gray-700'>
                                <BackendText description={product.description} />
                            </p>
                        </div>
                        
                        <VariationModal productId={product.id} onPriceChange={handleProductPriceChange} />
                        {/* Display the product price */}



                        <div>

                            {/* Display the product summary */}
                            <h3>Your Product Summary:</h3>
                                <p>Options:</p>
                             <ul>
                                  {/* {selectedOptions.map((option, index) => (
                                       <li key={index}>{option.name}</li>))} */}
                             </ul>
                             <p>Specifications:</p>
                               <ul>
                                   {/* {selectedSpecifications.map((specification, index) => (
                                      <li key={index}>{specification.name}</li>
                                  ))} */}
                              </ul>
                         <p>Price:</p> 
                        <h6 className='text-2xl font-semibold'>$ {productPrice !== null ? productPrice : product.price}</h6>
                        </div>


                        <div className='flex flex-row items-center gap-12'>
                            <div className='flex flex-row items-center'>
                                <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                                <span className='py-4 px-6 rounded-lg text-gray-700 font-bold'>{amount}</span>
                                <button className='bg-primary-red py-2 h-15 w-15 px-5 rounded-lg text-white text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                            </div>
                            <button className='bg-primary-purple text-white font-bold py-3 px-16 rounded-xl h-15'>Add to Cart</button>
                        </div>

                    </div>
                </>
            )}
        </div>
    );
}

export default ProductComponent;










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


