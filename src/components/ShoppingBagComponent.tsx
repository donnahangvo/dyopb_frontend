import React, { useRef, useEffect } from 'react';
import Logo from '../assets/images/AELogo.png';
import ShoppingBagFooter from './ShoppingBagFooter';
import { useShoppingBag } from '../context/ShoppingBagContext';

interface ShoppingBagProps {
  isVisible: boolean;
  toggleVisibility: () => void;
}

const ShoppingBagComponent: React.FC<ShoppingBagProps> = ({ isVisible, toggleVisibility }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { bagItems, removeFromBag, incrementQuantity, decrementQuantity, calculateSubtotal } = useShoppingBag();

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      toggleVisibility();
    }
  };

  const handleCloseButtonClick = () => {
    toggleVisibility();
  };

  // Calculate total amount
  const totalAmount = bagItems.reduce((total, item) => total + calculateSubtotal(item), 0);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = 'auto';
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);




  return (
    <>
      {isVisible && <div className="fixed top-0 left-0 w-2/3 h-full bg-gray-500 opacity-65 z-50 z-index: 50"></div>}
      <div className="fixed right-0 top-0 bottom-0 flex" style={{ width: '33%' }}>
        {/* Shopping Bag Component */}
        <div ref={ref} className={`bg-secondary-yellow max-h-80 overflow-y-auto p-3 ${isVisible ? 'block' : 'hidden'}`} style={{ width: '100%', maxWidth: '' }}>

        <div className="absolute top-0 right-0 pt-2 pr-7 ">
            <button onClick={handleCloseButtonClick} className='text-2xl'><i className="fas fa-times"></i></button>
          </div>

          <h1 className='text-black font-bold text-2xl'>Your Shopping Bag</h1>

          {bagItems.length === 0 ? (
            <div className='justify-center mt-20 font-bold text-xl'>
            <p className='text-center'>Your bag is currently empty.</p>
            </div>
          ) : (
            bagItems.map((item, index) => (
              <div key={index} className="">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img className="w-20 h-20 my-4 mb-0 object-contain mr-5" alt={item.product.name} src={item.product.image} />
                    <div className='flex justify-between items-center'>
                    <button onClick={() => decrementQuantity(bagItems.indexOf(item))} className="text-primary-red bg-secondary-red hover:bg-primary-red hover:text-white p-3 rounded">-</button>
                      <p className="text-l font-bold pl-2 pr-2 mt-2">{item.quantity}</p>
                    <button onClick={() => incrementQuantity(bagItems.indexOf(item))} className="text-primary-green bg-secondary-green hover:bg-primary-green hover:text-white p-3 rounded">+</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 font-bold">
                    <button onClick={() => removeFromBag(item.product)} className="text-primary-red bg-secondary-red hover:bg-primary-red hover:text-white p-2 rounded">Remove</button>
                  </div>
                </div>
                <div className="product-details flex items-center space-x-4 italic">
                  <p>{item.product.name}</p>
                  <p>-</p>
                  <p>${item.product.price}</p> 
                </div>
                <div className=''>
                  <p className='font-semibold'>${calculateSubtotal(item)}</p>
                </div>
              </div>
            ))
          )}

          {/* Footer */}
          <ShoppingBagFooter totalAmount={totalAmount} toggleVisibility={toggleVisibility} />
        </div>

        {/* Empty space */}
        <div style={{ flex: '1' }}></div>
      </div>
    </>
  );
}

export default ShoppingBagComponent;














// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useShoppingBag } from '../context/ShoppingBagContext'; // Import the ShoppingBagContext

// const defaultTheme = createTheme();

// const ShoppingBagComponent: React.FC = () => {
//   const { bagItems, removeFromBag } = useShoppingBag(); // Access bagItems and removeFromBag from the context

//   // State to control the visibility of the shopping bag component
//   const [isVisible, setIsVisible] = useState(false);

//   // Function to toggle the visibility of the shopping bag component
//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//   };

//   const handleRemove = (index: number) => {
//     removeFromBag(index); // Call the removeFromBag function from the context
//   };

//   return (
//       <Grid container component="main" className="min-h-screen">
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className="flex justify-end">
//           <Box className="m-8 w-full max-w-md">
//             <Typography component="h1" variant="h5" className="text-2xl font-bold mb-4">
//               Your Shopping Bag
//             </Typography>
//             {/* Display bag items */}
//             {bagItems.map((item, index) => (
//               <Box key={index} className="mt-4 w-full">
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   label={`Product: ${item.product.name}`}
//                   value={`Quantity: ${item.quantity}, Total Price: ${item.totalPrice}`}
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                 />
//                 {/* Button to remove item */}
//                 <Button
//                   onClick={() => handleRemove(index)}
//                   variant="outlined"
//                   color="secondary"
//                   fullWidth
//                   className="mt-2"
//                 >
//                   Remove
//                 </Button>
//               </Box>
//             ))}
//             {/* Button to check out */}
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               className="mt-6"
//             >
//               Check Out
//             </Button>
//             <Typography variant="body2" color="text.secondary" align="center" className="mt-6">
//               {'Copyright © '}
//               <Link color="inherit" href="#">
//                 Adorkable Emporium
//               </Link>{' '}
//               {new Date().getFullYear()}
//               {'.'}
//             </Typography>
//           </Box>
//         </Grid>
//       </Grid>
//   );
// }

// export default ShoppingBagComponent;


