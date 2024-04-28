import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { apiURL } from "../api/server";
// import { useProduct } from '../context/ProductContext';


// Interface for ImageData
interface ImageData {
  id: number;
  product: number;
  image: string; // Path to retrieve the image data
  thumbnail: string; // Path to retrieve the thumbnail data
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
  images: ImageData[]; // Array of ImageData
}

// interface VariationData {
//   id: number;
//   product: number;
//   name: string;
//   slug: string;
//   variation_sku: string;
//   description: string;
//   image: ImageData[]; // Array of ImageData
//   thumbnail: ImageData[]; // Array of ImageData
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
  image: ImageData[]; // Array of ImageData
  thumbnail: ImageData[]; // Array of ImageData
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
  image: ImageData[]; // Array of ImageData
  thumbnail: ImageData[]; // Array of ImageData
  ordering: number;
}

interface SummaryTableProps {
  selectedProduct: ProductData | null;
  selectedOptionSpecifications: { [key: number]: SpecificationData[] } | null;
  selectedOption: OptionData| null;
}
//@ts-ignore
const SummaryTable: React.FC<SummaryTableProps> = ({ selectedProduct, selectedOption, selectedOptionSpecifications }) => {
  // Check if selected product is available

  // console.log("selected product", selectedProduct)
  // console.log("selectedOption", selectedOption)
  // console.log("array of selectedOptionSpecifications", selectedOptionSpecifications)

      // Check if selected product is available
      if (!selectedProduct) {
        return <div>Start Designing!</div>; // You might want to handle loading state differently
      }

    
      return (
        //@ts-ignore
          <div className='pt-5 pb-5'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Variation</TableCell>
                    <TableCell>Option</TableCell> */}
                    <TableCell>Specification</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell>Image</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/*//@ts-ignore*/}
                  {selectedProduct.variations.map(variation => (
                    <React.Fragment key={variation.id}>
                      {selectedOptionSpecifications?.[variation.id]?.map(specification => (
                        <TableRow key={`${variation.id}-${specification.id}`}>
                          {/* <TableCell>{variation.name}</TableCell>
                          <TableCell>{selectedOption ? selectedOption.name : 'Unknown Option'}</TableCell> */}
                          <TableCell>{specification.name}</TableCell>
                          <TableCell>{specification.specification_sku}</TableCell>
                          <TableCell className='w-10 h-10 object-contain'>
                            <img src={`${apiURL}${specification.image}`} alt={specification.name} />
                            </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );
      };


export default SummaryTable;





// import React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useProduct } from '../context/ProductContext';


// // Interface for ImageData
// interface ImageData {
//     id: number;
//     product: number;
//     image: string; // Path to retrieve the image data
//     thumbnail: string; // Path to retrieve the thumbnail data
//   }
  
//   // Interfaces for other data types
//   interface ProductData {
//     variations: any;
//     id: number;
//     category: number;
//     name: string;
//     slug: string;
//     product_sku: string;
//     description: string;
//     price: string;
//     is_featured: boolean;
//     images: ImageData[]; // Array of ImageData
//   }
  
//   interface VariationData {
//     id: number;
//     product: number;
//     name: string;
//     slug: string;
//     variation_sku: string;
//     description: string;
//     image: ImageData[]; // Array of ImageData
//     thumbnail: ImageData[]; // Array of ImageData
//     ordering: number;
//   }
  
//   interface OptionData {
//     id: number;
//     product: number;
//     variation: number;
//     name: string;
//     slug: string;
//     option_sku: string;
//     description: string;
//     price: number;
//     image: ImageData[]; // Array of ImageData
//     thumbnail: ImageData[]; // Array of ImageData
//     ordering: number;
//   }
  
//   interface SpecificationData {
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
//     image: ImageData[]; // Array of ImageData
//     thumbnail: ImageData[]; // Array of ImageData
//     ordering: number;
//   }

//   interface SummaryTableProps {
//     selectedProduct: ProductData | null;
//     selectedOptionSpecifications: { [key: number]: SpecificationData[] } | null;
//   }
  
//   const SummaryTable: React.FC<SummaryTableProps> = ({ selectedProduct, selectedOptionSpecifications }) => {
//     // Check if selected product is available

//     console.log("selected product", selectedProduct)
//     console.log("array of selectedOptionSpecifications", selectedOptionSpecifications)

//     if (!selectedProduct) {
//       return <div>Start Designing!</div>; // You might want to handle loading state differently
//     }

//   return (
//     <div className='pt-5 pb-5'>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 500 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Variation</TableCell>
//               {/* <TableCell>Option</TableCell> */}
//               <TableCell>Specification</TableCell>
//               <TableCell>SKU</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//           {selectedProduct && selectedProduct.variations.map(variation => (
//               <React.Fragment key={variation.id}>
//                 {selectedOptionSpecifications?.[variation.id]?.map(specification => (
//                   <TableRow key={`${variation.id}-${specification.id}`}>
//                     <TableCell>{variation.name}</TableCell>
//                     {/* <TableCell>{specification.optionName}</TableCell> */}
//                     <TableCell>{specification.name}</TableCell>
//                     <TableCell>{specification.specification_sku}</TableCell>
//                   </TableRow>
//                 ))}
//               </React.Fragment>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default SummaryTable;






// import React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useProduct } from '../context/ProductContext';

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
//   options: OptionData[];
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
//   specifications: SpecificationData[];
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
//   variations: VariationData[];
// }

// interface SummaryTableProps {
//     selectedProduct: ProductData | null;
//   }

// const SummaryTable: React.FC<SummaryTableProps> = () => {
//   const { selectedProduct } = useProduct();

//   // Check if selected product is available
//   if (!selectedProduct) {
//     return <div>Start Designing!</div>; // You might want to handle loading state differently
//   }

//   return (
//     <div className='pt-5 pb-5'>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 500 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Variation</TableCell>
//               <TableCell>Option</TableCell>
//               <TableCell>Specifications</TableCell>
//               <TableCell>SKU</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {selectedProduct.variations.map(variation => (
//               variation.options.map(option => (
//                 option.specifications.map(specification => (
//                   <TableRow key={specification.id}>
//                     <TableCell>{variation.name}</TableCell>
//                     <TableCell>{option.name}</TableCell>
//                     <TableCell>{specification.name}</TableCell>
//                     <TableCell>{specification.specification_sku}</TableCell>
//                   </TableRow>
//                 ))
//               ))
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default SummaryTable;






// import React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useProduct } from '../context/ProductContext';

// interface ImageData {
//     id: number;
//     product: number;
//     image: string;
//     thumbnail: string;
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
//   }

// interface VariationData {
//     id: number;
//     product: number;
//     name: string;
//     slug: string;
//     variation_sku: string;
//     description: string;
//     image: ImageData[];
//     thumbnail: ImageData[];
//     ordering: number;
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
//   }
  
//   interface ProductData {
//     id: number;
//     category: number;
//     name: string;
//     slug: string;
//     product_sku: string;
//     description: string;
//     price: string;
//     is_featured: boolean;
//     images: ImageData[];
//   }
  

// interface SummaryTableProps {
//     selectedOptionSpecifications
// }

// const SummaryTable: React.FC<SummaryTableProps> = ({ }) => {
//     const { sselectedOptionSpecifications } = useProduct();

//     return (
//         <div className='pt-5 pb-5'>
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 500 }} aria-label="simple table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Variation</TableCell>
//                             <TableCell>Name</TableCell>
//                             <TableCell>SKU</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {selectedOptionSpecifications.map ? (
//                             <TableRow>
//                                 <TableCell>{selectedVariation.name}</TableCell>
//                                 <TableCell>{selectedSpecification.name}</TableCell>
//                                 <TableCell>{selectedSpecification.specification_sku}</TableCell>
//                             </TableRow>
//                         ) : (
//                             <TableRow>
//                                 <TableCell colSpan={3}>No choices selected yet.</TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// };

// export default SummaryTable;



// import React, { useEffect, useState } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useProduct } from '../context/ProductContext';

// interface ImageData {
//     id: number;
//     product: number;
//     image: string;
//     thumbnail: string;
//   }
  
//   interface SpecificationData {
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
//   }
  
//   interface OptionData {
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
//   }
  
//   interface VariationData {
//     id: number;
//     product: number;
//     name: string;
//     slug: string;
//     variation_sku: string;
//     description: string;
//     image: ImageData[];
//     thumbnail: ImageData[];
//     ordering: number;
//   }
  
//   interface ProductData {
//     id: number;
//     category: number;
//     name: string;
//     slug: string;
//     product_sku: string;
//     description: string;
//     price: string;
//     is_featured: boolean;
//     images: ImageData[];
//   }
//   interface SummaryTableProps {
//     variation: VariationData | null; // Accepts VariationData or null
// }

// const SummaryTable: React.FC<SummaryTableProps> = ({ variation }) => {
//     const { selectedSpecification } = useProduct();

//     return (
//         <div className='pt-5 pb-5'>
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 500 }} aria-label="simple table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Variation</TableCell>
//                             <TableCell>Name</TableCell>
//                             <TableCell>SKU</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {selectedSpecification && (
//                             <TableRow>
//                                 <TableCell>{variation ? variation.name : '-'}</TableCell>
//                                 <TableCell>{selectedSpecification.name}</TableCell>
//                                 <TableCell>{selectedSpecification.specification_sku}</TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// };

// export default SummaryTable;






// import React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useProduct } from '../context/ProductContext';

// const SummaryTable: React.FC = () => {
//     const { selectedSpecification, selectedVariation } = useProduct();

//     return (
//         <div className='pt-5 pb-5'>
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 500 }} aria-label="simple table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Variation</TableCell>
//                             <TableCell>Name</TableCell>
//                             <TableCell>SKU</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {selectedSpecification && selectedVariation && (
//                             <TableRow>
//                                 <TableCell>{selectedVariation.name}</TableCell>
//                                 <TableCell>{selectedSpecification.name}</TableCell>
//                                 <TableCell>{selectedSpecification.specification_sku}</TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// };

// export default SummaryTable;







