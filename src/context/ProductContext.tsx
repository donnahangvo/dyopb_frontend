import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
// import { set } from 'react-hook-form';

// Interface for ImageData
interface ImageData {
  id: number;
  product: number;
  image: string; 
  thumbnail: string; 
}

// Interfaces for other data types
interface ProductData {
  variations: any;
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

// Context type
export interface ProductContextType {
  selectedProduct: ProductData | null;
  selectedVariation: VariationData | null;
  selectedOption: OptionData | null;
  selectedOptionSpecifications: { [key: number]: SpecificationData[] } | null;
  selectedSpecification: SpecificationData | null;
  setSelectedProduct: Dispatch<SetStateAction<ProductData | null>>;
  setSelectedVariation: Dispatch<SetStateAction<VariationData | null>>;
  setSelectedOption: Dispatch<SetStateAction<OptionData | null>>;
  setSelectedOptionSpecifications: Dispatch<SetStateAction<{ [key: number]: SpecificationData[] } | null>>;
  setSelectedSpecification: Dispatch<SetStateAction<SpecificationData | null>>;
  finalPrice: number | null;
  setFinalPrice: React.Dispatch<React.SetStateAction<number | null>>;
}

// Context initialization
export const ProductContext = createContext<ProductContextType>({
  selectedProduct: null,
  selectedVariation: null,
  selectedOption: null,
  selectedOptionSpecifications: null,
  selectedSpecification: null,
  setSelectedProduct: () => {},
  setSelectedVariation: () => {},
  setSelectedOption: () => {},
  setSelectedOptionSpecifications: () => {},
  setSelectedSpecification: () => {},
  finalPrice: null,
  setFinalPrice: () => {}
});

// Provider component

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<VariationData | null>(null);
  const [selectedOption, setSelectedOption] = useState<OptionData | null>(null);
  const [selectedOptionSpecifications, setSelectedOptionSpecifications] = useState<{ [key: number]: SpecificationData[] } | null>(null);
  const [selectedSpecification, setSelectedSpecification] = useState<SpecificationData | null>(null); // Initialize selected specification as null
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  // Calculate final price based on product data
  useEffect(() => {
    if (selectedProduct) {

      console.log(selectedProduct)
        // Check if product has options or specifications
        let priceFromOptions: number | null = null;
        let priceFromSpecifications: number | null = null;

        if (selectedOption && selectedOption.price !== undefined) {
            // Find the lowest price among options

            console.log("selected option",selectedOption)

            priceFromOptions = selectedOption.price;
        }

        if (selectedSpecification && selectedSpecification.price !== undefined) {
            // Find the lowest price among specifications

            console.log('selected specification', selectedSpecification)

            priceFromSpecifications = selectedSpecification.price;
        }

        // Choose the lowest price among options, specifications, and default price
        //@ts-ignore
        const productDefaultPrice = parseFloat(selectedProduct.price);
        if (!isNaN(productDefaultPrice)) {
            // Use the default product price if available
            setFinalPrice(productDefaultPrice);
        } else {
            // Otherwise, use the lowest price from options or specifications
            setFinalPrice(Math.min(priceFromOptions || Infinity, priceFromSpecifications || Infinity));
        }
    } else {
        setFinalPrice(null); // Reset final price if no product is selected
    }
}, [selectedProduct, selectedOption, selectedSpecification]);
    

  return (
    <ProductContext.Provider value={{
      selectedProduct,
      selectedVariation,
      selectedOption,
      selectedOptionSpecifications,
      selectedSpecification,
      setSelectedProduct,
      setSelectedVariation,
      setSelectedOption,
      setSelectedOptionSpecifications,
      setSelectedSpecification,
      finalPrice,
      setFinalPrice
    }}>
      {children}
    </ProductContext.Provider>
  );
};

// // Hook for accessing context
// export const useProduct = (): ProductContextType => useContext(ProductContext);

// Custom hook to access the context
export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};








  // const [finalPrice, setFinalPrice] = useState<number | null>(null);

//   // Calculate final price based on product data
//   useEffect(() => {
//     if (selectedProduct) {
//         // Check if product has options or specifications
//         let priceFromOptions: number | null = null;
//         let priceFromSpecifications: number | null = null;

//         if (selectedOption && selectedOption.price !== undefined) {
//             // Find the lowest price among options
//             console.log("selected option",selectedOption)
//             priceFromOptions = selectedOption.price;
//         }

//         if (selectedSpecification && selectedSpecification.price !== undefined) {
//             // Find the lowest price among specifications

//             console.log('selected specification', selectedSpecification)
//             priceFromSpecifications = selectedSpecification.price;
//         }

//         // Choose the lowest price among options, specifications, and default price
//         const productDefaultPrice = parseFloat(selectedProduct.price);
//         if (!isNaN(productDefaultPrice)) {
//             // Use the default product price if available
//             setFinalPrice(productDefaultPrice);
//         } else {
//             // Otherwise, use the lowest price from options or specifications
//             setFinalPrice(Math.min(priceFromOptions || Infinity, priceFromSpecifications || Infinity));
//         }
//     } else {
//         setFinalPrice(null); // Reset final price if no product is selected
//     }
// }, [selectedProduct, selectedOption, selectedSpecification]);


// import React, { createContext, useState, useContext, ReactNode } from 'react';

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

// interface ProductContextType {
//   selectedProduct: ProductData | null;
//   selectedVariation: VariationData | null;
//   selectedOption: OptionData | null;
//   selectedOptionSpecifications: { [key: number]: SpecificationData[] } | null; // Selected specifications for each option
//   selectedSpecification: SpecificationData | null; // Selected specification
//   setSelectedProduct: (product: ProductData | null) => void;
//   setSelectedVariation: React.Dispatch<React.SetStateAction<VariationData | null>>;
//   setSelectedOption: React.Dispatch<React.SetStateAction<OptionData | null>>;
//   setSelectedOptionSpecifications: React.Dispatch<React.SetStateAction<{ [key: number]: SpecificationData[] } | null>>;
//   setSelectedSpecification: React.Dispatch<React.SetStateAction<SpecificationData | null>>; // Function to set selected specification
// }

// const ProductContext = createContext<ProductContextType>({
//   selectedProduct: null,
//   selectedVariation: null,
//   selectedOption: null,
//   selectedOptionSpecifications: null,
//   selectedSpecification: null, // Initialize selected specification as null
//   setSelectedProduct: () => {},
//   setSelectedVariation: () => {},
//   setSelectedOption: () => {},
//   setSelectedOptionSpecifications: () => {},
//   setSelectedSpecification: () => {}, // Initialize function to set selected specification
// });

// export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
//   const [selectedVariation, setSelectedVariation] = useState<VariationData | null>(null);
//   const [selectedOption, setSelectedOption] = useState<OptionData | null>(null);
//   const [selectedOptionSpecifications, setSelectedOptionSpecifications] = useState<{ [key: number]: SpecificationData[] } | null>(null);
//   const [selectedSpecification, setSelectedSpecification] = useState<SpecificationData | null>(null); // Initialize selected specification as null

//   return (
//     <ProductContext.Provider value={{
//       selectedProduct,
//       selectedVariation,
//       selectedOption,
//       selectedOptionSpecifications,
//       selectedSpecification, // Add selected specification to the value object
//       setSelectedProduct,
//       setSelectedVariation,
//       setSelectedOption,
//       setSelectedOptionSpecifications,
//       setSelectedSpecification, // Add function to set selected specification to the value object
//     }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export const useProduct = (): ProductContextType => useContext(ProductContext);

