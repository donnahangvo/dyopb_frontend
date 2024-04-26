import * as React from 'react';
import { useShoppingBag } from '../context/ShoppingBagContext'; 
import { useTaxContext } from '../context/TaxContext';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface InfoProps {
  totalPrice: string;
  subtotal: number;
  taxAmount: number;
  shippingCost: number;
  onInfoChange: (info: any) => void;
}

export default function Info({ totalPrice, subtotal, taxAmount, shippingCost, onInfoChange }: InfoProps) {
  const { bagItems } = useShoppingBag(); // Access bagItems from context
  const { state } = useTaxContext();
  const { taxAmount: taxAmountFromContext } = state;

  // Send information back to parent component
  React.useEffect(() => {
    onInfoChange({
      totalPrice,
      subtotal,
      taxAmount: taxAmountFromContext, // Using taxAmount from context
      shippingCost,
    });
  }, [totalPrice, subtotal, taxAmountFromContext, shippingCost, onInfoChange]);

  return (
    <div>
      <React.Fragment>
        <Typography variant="subtitle2" color="text.secondary">
          Total
        </Typography>
        <Typography variant="h4" gutterBottom>
          {totalPrice}
        </Typography>
        <List disablePadding>
          {/* Iterate over bag items */}
          {bagItems.map((item, index) => (
            <ListItem key={index} sx={{ py: 1, px: 0 }}>
              <ListItemText
                sx={{ mr: 2 }}
                primary={item.product.name} // Assuming product has a 'name' property
                secondary={item.product.sku} 
              />
              <Typography variant="body1" fontWeight="medium">
                {/* Calculate subtotal for each item */}
                ${item.product.price * item.quantity}
              </Typography>
            </ListItem>
          ))}
        </List>

        {/* Display order total, shipping cost, and tax */}
        <p>Order Total: ${totalPrice}</p>
        <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
        <p>Tax: ${taxAmount.toFixed(2)}</p>
      </React.Fragment>
    </div>
  );
}



// import * as React from 'react';
// import { useShoppingBag } from '../context/ShoppingBagContext'; 
// import { useTaxContext } from '../context/TaxContext';

// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Typography from '@mui/material/Typography';

// interface InfoProps {
//   totalPrice: string;
//   subtotal: number; // Add subtotal prop here
//   taxAmount: number;
//   shippingCost: number;
//   onInfoChange: (info: any) => void;
// }

// export default function Info({ totalPrice, subtotal, taxAmount, shippingCost, onInfoChange }: InfoProps) {
//   const { bagItems } = useShoppingBag(); // Access bagItems from context
//   const { state } = useTaxContext();
//   const { taxAmount } = state;

//   // Calculate subtotal for each item
//   const subtotalArray = bagItems.map(item => item.product.price * item.quantity);
//   const subtotal = subtotalArray.reduce((acc, curr) => acc + curr, 0);

//   // Send information back to parent component
//   React.useEffect(() => {
//     onInfoChange({
//       totalPrice: totalPrice,
//       subtotal: subtotal,
//       taxAmount: taxAmount, // Include taxAmount here
//       shippingCost: shippingCost, // Include shippingCost here
//     });
//   }, [totalPrice, subtotal, taxAmount, shippingCost, onInfoChange]);

//   return (
//     <div>
//       <React.Fragment>
//         <Typography variant="subtitle2" color="text.secondary">
//           Total
//         </Typography>
//         <Typography variant="h4" gutterBottom>
//           {totalPrice}
//         </Typography>
//         <List disablePadding>
//           {/* Iterate over bag items */}
//           {bagItems.map((item, index) => (
//             <ListItem key={index} sx={{ py: 1, px: 0 }}>
//               <ListItemText
//                 sx={{ mr: 2 }}
//                 primary={item.product.name} // Assuming product has a 'name' property
//                 secondary={item.product.sku} 
//               />
//               <Typography variant="body1" fontWeight="medium">
//                 {/* Calculate subtotal for each item */}
//                 ${item.product.price * item.quantity}
//               </Typography>
//             </ListItem>
//           ))}
//         </List>

//         {/* Display order total, shipping cost, and tax */}
//         <p>Order Total: ${totalPrice}</p>
//         <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
//         <p>Tax: ${taxAmount.toFixed(2)}</p>
//       </React.Fragment>
//     </div>
//   );
// }






// import * as React from 'react';
// import { useShoppingBag } from '../context/ShoppingBagContext'; 
// // import CouponComponent from './CouponComponent';

// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Typography from '@mui/material/Typography';

// interface InfoProps {
//   totalPrice: string;
// }

// export default function Info({ totalPrice }: InfoProps) {
//   const { bagItems } = useShoppingBag(); // Access bagItems from context

//   return (
//     <div>
//       <React.Fragment>
//         <Typography variant="subtitle2" color="text.secondary">
//           Total
//         </Typography>
//         <Typography variant="h4" gutterBottom>
//           {totalPrice}
//         </Typography>
//         <List disablePadding>
//           {/* Iterate over bag items */}
//           {bagItems.map((item, index) => (
//             <ListItem key={index} sx={{ py: 1, px: 0 }}>
//               <ListItemText
//                 sx={{ mr: 2 }}
//                 primary={item.product.name} // Assuming product has a 'name' property
//                 secondary={item.product.sku} 
//               />
//               <Typography variant="body1" fontWeight="medium">
//                 {/* Calculate subtotal for each item */}
//                 ${item.product.price * item.quantity}
//               </Typography>
//             </ListItem>
//           ))}
//         </List>

//         {/* <CouponComponent/> */}

//       </React.Fragment>
//     </div>
//   );
// }
