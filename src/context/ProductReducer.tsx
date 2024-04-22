import React, { createContext, useContext, useReducer } from 'react';
import { useProduct, ProductContextType } from './ProductContext';

// Interface for ImageData
interface ImageData {
  id: number;
  product: number;
  image: string;
  thumbnail: string;
}

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

// Define the reducer action types
type Action =
  | { type: 'SELECT_PRODUCT'; payload: ProductData }
  | { type: 'SELECT_VARIATION'; payload: VariationData }
  | { type: 'SELECT_OPTION'; payload: OptionData }
  | { type: 'SELECT_SPECIFICATION'; payload: SpecificationData };

const priceReducer = (state: ProductContextType, action: Action): ProductContextType => {
  switch (action.type) {
    case 'SELECT_PRODUCT':
      const productPrice = action.payload.price;

      console.log("product price", productPrice)

      return { ...state, selectedProduct: action.payload, finalPrice: productPrice };

    case 'SELECT_OPTION':
      const optionPrice = action.payload.price;

      console.log("option price", optionPrice)

      return { ...state, selectedOption: action.payload, finalPrice: optionPrice };
    case 'SELECT_SPECIFICATION':
      const specificationPrice = action.payload.price;

      console.log("specification price", specificationPrice)
      return { ...state, selectedSpecification: action.payload, finalPrice: specificationPrice };
    default:
      return state;
  }
};

export const ProductReducerContext = createContext<ProductContextType | undefined>(undefined);

export const ProductReducerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { selectedProduct, selectedVariation, selectedOption, selectedOptionSpecifications, selectedSpecification, setSelectedProduct, setSelectedVariation, setSelectedOption, setSelectedOptionSpecifications, setSelectedSpecification } = useProduct();
  const initialState: ProductContextType = {
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
    finalPrice: null // Initialize finalPrice here
  };
  const [state, dispatch] = useReducer(priceReducer, initialState);

  return (
    <ProductReducerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductReducerContext.Provider>
  );
};

export const useProductReducer = (): ProductContextType => {
  const context = useContext(ProductReducerContext);
  if (!context) {
    throw new Error('useProductReducer must be used within a ProductReducerProvider');
  }
  return context;
};