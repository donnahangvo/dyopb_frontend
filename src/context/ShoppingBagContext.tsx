import React, { createContext, useState, useContext, ReactNode } from 'react';

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

// Define the type for your bag item
interface BagItem {
    product: any; // Type of selectedProduct
    products: ProductData[];
    options: any; // Type of selectedOption
    specifications: any; // Type of selectedOptionSpecifications
    quantity: number; // Type of amount
    totalPrice: number; // Type of finalPrice
}

// Define the type for the context value
interface ShoppingBagContextType {
    bagItems: BagItem[];
    addToBag: (selectedProduct: any, selectedOption: any, selectedOptionSpecifications: any, amount: number, finalPrice: number) => void;
    removeFromBag: (index: number) => void;
    clearBag: () => void;
    incrementQuantity: (index: number) => void;
    decrementQuantity: (index: number) => void;
    calculateSubtotal: (item: BagItem) => number;
}

interface ShoppingBagProviderProps {
    children: ReactNode;
}

// Create the context with a default value
const ShoppingBagContext = createContext<ShoppingBagContextType>({
    bagItems: [],
    addToBag: () => {},
    removeFromBag: () => {},
    clearBag: () => {},
    incrementQuantity: () => {},
    decrementQuantity: () => {},
    calculateSubtotal: () => 0,
});

export const useShoppingBag = () => useContext(ShoppingBagContext);

export const ShoppingBagProvider: React.FC<ShoppingBagProviderProps> = ({ children }) => {
    const [bagItems, setBagItems] = useState<BagItem[]>([]);

    // const addToBag = (selectedProduct: any, selectedOption: any, selectedOptionSpecifications: any, amount: number, finalPrice: number) => {
    //     if (selectedProduct && selectedOptionSpecifications && Object.keys(selectedOptionSpecifications).length > 0) {
    //         const bagItem: BagItem = {
    //             product: selectedProduct,
    //             options: selectedOption,
    //             specifications: selectedOptionSpecifications,
    //             quantity: amount,
    //             totalPrice: finalPrice
    //         };
    //         setBagItems(prevBagItems => [...prevBagItems, bagItem]);
    //         showConfirmationMessage();
    //     }
    // };

    const addToBag = (selectedProduct: ProductData, selectedOption: OptionData, selectedOptionSpecifications: SpecificationData[], amount: number, finalPrice: number) => {
        if (selectedProduct && selectedOptionSpecifications && Object.keys(selectedOptionSpecifications).length > 0) {
          const newProduct = {
            product: selectedProduct,
            options: selectedOption,
            specifications: selectedOptionSpecifications,
            quantity: amount,
            totalPrice: finalPrice
          };

    const updatedBagItems = [...bagItems, newProduct];
    //@ts-ignore
          setBagItems(updatedBagItems);
        }
      };

    const removeFromBag = (index: number) => {
        const newBagItems = [...bagItems];
        newBagItems.splice(index, 1);
        setBagItems(newBagItems);
    };

    const clearBag = () => {
        setBagItems([]);
    };

    const incrementQuantity = (index: number) => {
        const newBagItems = [...bagItems];
        newBagItems[index].quantity += 1;
        setBagItems(newBagItems);
    };

    const decrementQuantity = (index: number) => {
        const newBagItems = [...bagItems];
        if (newBagItems[index].quantity > 1) {
            newBagItems[index].quantity -= 1;
            setBagItems(newBagItems);
        }
    };

    const calculateSubtotal = (item: BagItem) => {
        return item.product.price * item.quantity;
    };

    return (
        <ShoppingBagContext.Provider value={{ bagItems, addToBag, removeFromBag, clearBag, incrementQuantity, decrementQuantity, calculateSubtotal }}>
            {children}
        </ShoppingBagContext.Provider>
    );
};
