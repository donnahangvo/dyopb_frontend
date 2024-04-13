import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useProduct } from '../context/ProductContext';

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

interface SummaryTableProps {
    selectedProduct: ProductData | null;
    selectedVariation: VariationData | null;
    selectedOption: OptionData | null;
    selectedSpecification: SpecificationData | null;
}

const SelectionTable: React.FC<SummaryTableProps> = ({ }) => {
    const { selectedSpecification, selectedVariation } = useProduct();

    return (
        <div className='pt-5 pb-5'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Variation</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>SKU</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedSpecification && selectedVariation ? (
                            <TableRow>
                                <TableCell>{selectedVariation.name}</TableCell>
                                <TableCell>{selectedSpecification.name}</TableCell>
                                <TableCell>{selectedSpecification.specification_sku}</TableCell>
                            </TableRow>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>No choices selected yet.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SelectionTable;



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
//     selectedProduct: ProductData | null; 
//     selectedVariation: VariationData | null; 
//     selectedOption: OptionData | null;
//     selectedSpecification: SpecificationData | null;
// }

// const SelectionTable: React.FC<SummaryTableProps> = ({ }) => {
//     const { selectedProduct, selectedVariation, selectedOption, selectedSpecification } = useProduct();

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
//                         {selectedSpecification && selectedVariation ? (
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

// export default SelectionTable;