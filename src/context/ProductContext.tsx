import React, { createContext, useState, useContext, ReactNode } from 'react';

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

interface ProductContextType {
  selectedProduct: ProductData | null;
  selectedVariation: VariationData | null;
  selectedOption: OptionData | null;
  selectedOptionSpecifications: { [key: number]: SpecificationData[] } | null; // Selected specifications for each option
  selectedSpecification: SpecificationData | null; // Selected specification
  setSelectedProduct: (product: ProductData | null) => void;
  setSelectedVariation: React.Dispatch<React.SetStateAction<VariationData | null>>;
  setSelectedOption: React.Dispatch<React.SetStateAction<OptionData | null>>;
  setSelectedOptionSpecifications: React.Dispatch<React.SetStateAction<{ [key: number]: SpecificationData[] } | null>>;
  setSelectedSpecification: React.Dispatch<React.SetStateAction<SpecificationData | null>>; // Function to set selected specification
}

const ProductContext = createContext<ProductContextType>({
  selectedProduct: null,
  selectedVariation: null,
  selectedOption: null,
  selectedOptionSpecifications: null,
  selectedSpecification: null, // Initialize selected specification as null
  setSelectedProduct: () => {},
  setSelectedVariation: () => {},
  setSelectedOption: () => {},
  setSelectedOptionSpecifications: () => {},
  setSelectedSpecification: () => {}, // Initialize function to set selected specification
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<VariationData | null>(null);
  const [selectedOption, setSelectedOption] = useState<OptionData | null>(null);
  const [selectedOptionSpecifications, setSelectedOptionSpecifications] = useState<{ [key: number]: SpecificationData[] } | null>(null);
  const [selectedSpecification, setSelectedSpecification] = useState<SpecificationData | null>(null); // Initialize selected specification as null

  return (
    <ProductContext.Provider value={{
      selectedProduct,
      selectedVariation,
      selectedOption,
      selectedOptionSpecifications,
      selectedSpecification, // Add selected specification to the value object
      setSelectedProduct,
      setSelectedVariation,
      setSelectedOption,
      setSelectedOptionSpecifications,
      setSelectedSpecification, // Add function to set selected specification to the value object
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductContextType => useContext(ProductContext);

