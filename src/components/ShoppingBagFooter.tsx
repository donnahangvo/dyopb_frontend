import React from 'react';
import { Link } from 'react-router-dom';

interface ShoppingBagFooterProps {
  totalAmount: number;
  toggleVisibility: () => void; // Add toggleVisibility prop
}

const ShoppingBagFooter: React.FC<ShoppingBagFooterProps> = ({ totalAmount, toggleVisibility }) => {
  const handleCloseShoppingBag = () => {
    toggleVisibility(); // Call toggleVisibility function to close the shopping bag
  };

  return (
    <div className="bg-secondary-orange text-black text-center absolute bottom-0 h-60  left-0 right-0 p-5 z-index: 30">
      <div className="p-5">
        {/* Subtotal */}
        <p className="font-bold text-2xl p-2">SubTotal: ${totalAmount}</p>
        <p>Taxes and shipping calculated at checkout.</p>
      </div>

      <div className="mt-4">
        {/* Checkout button */}
        <Link to='/checkout'><button onClick={handleCloseShoppingBag} className="bg-primary-purple text-white px-4 py-3  rounded-md">Checkout</button></Link>
      </div>
    </div>
  );
}

export default ShoppingBagFooter;
