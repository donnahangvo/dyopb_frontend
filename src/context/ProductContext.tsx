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
  selectedSpecification: SpecificationData | null;
  setSelectedProduct: (product: ProductData | null) => void;
  setSelectedVariation: React.Dispatch<React.SetStateAction<VariationData | null>>;
  setSelectedOption: React.Dispatch<React.SetStateAction<OptionData | null>>;
  setSelectedSpecification: React.Dispatch<React.SetStateAction<SpecificationData | null>>;
}

const ProductContext = createContext<ProductContextType>({
    selectedProduct: null,
  selectedVariation: null,
  selectedOption: null,
  selectedSpecification: null,
  setSelectedProduct: () => {},
  setSelectedVariation: () => {},
  setSelectedOption: () => {},
  setSelectedSpecification: () => {}
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<VariationData | null>(null);
  const [selectedOption, setSelectedOption] = useState<OptionData | null>(null);
  const [selectedSpecification, setSelectedSpecification] = useState<SpecificationData | null>(null);

  return (
    <ProductContext.Provider value={{
        selectedProduct,
      selectedVariation,
      selectedOption,
      selectedSpecification,
      setSelectedProduct,
      setSelectedVariation,
      setSelectedOption,
      setSelectedSpecification
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductContextType => useContext(ProductContext);
