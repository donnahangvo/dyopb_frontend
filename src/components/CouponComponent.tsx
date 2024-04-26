// import React, { useState } from 'react';
// import { server_calls } from "../api/server";

// interface CouponData {
//   amount: number;
// }

// const CouponComponent: React.FC = () => {
//   const [couponCode, setCouponCode] = useState<string>('');
//   const [showCouponCodeError, setShowCouponCodeError] = useState<boolean>(false);
//   const [couponValue, setCouponValue] = useState<number>(0);

//   const applyCoupon = async () => {
//     if (couponCode !== '') {
//       try {
//         const response = await server_calls.get(`/coupon/?coupon_code=${couponCode}`);
//         const data: CouponData = await response.json();
        
//         if (data.amount > 0) {
//           setShowCouponCodeError(false);
//           setCouponValue(data.amount);
//           // You can perform additional logic here based on the coupon value
//         } else {
//           setShowCouponCodeError(true);
//           setCouponValue(0);
//         }
//       } catch (error) {
//         console.error('Error applying coupon:', error);
//         setShowCouponCodeError(true);
//         setCouponValue(0);
//       }
//     } else {
//       setShowCouponCodeError(true);
//     }
//   };

//   return (
//     <div>
//       <h2 className="subtitle">Coupon Code</h2>

//       <div className="field has-addons">
//         <div className="control">
//           <input
//             type="text"
//             value={couponCode}
//             onChange={(e) => setCouponCode(e.target.value)}
//             className="input"
//             placeholder="Enter coupon code"
//           />
//         </div>

//         <div className="control">
//           <button onClick={applyCoupon} className="button is-success">Apply Coupon</button>
//         </div>
//       </div>

//       {showCouponCodeError && (
//         <div className="notification is-warning">
//           <p>This coupon code is not valid! Try another one.</p>
//         </div>
//       )}

//       {couponValue > 0 && (
//         <div className="notification is-success">
//           <p>Coupon applied successfully. Amount: {couponValue}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CouponComponent;

