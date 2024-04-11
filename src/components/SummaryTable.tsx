import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useProduct } from '../context/ProductContext';

const SummaryTable: React.FC = () => {
    const { selectedSpecification } = useProduct();

    return (
        <div className='pt-5 pb-5'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>SKU</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedSpecification && (
                            <TableRow>
                                <TableCell>{selectedSpecification.name}</TableCell>
                                <TableCell>{selectedSpecification.specification_sku}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SummaryTable;






// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// function createData(
//   category_name: string,
//   variation1: string,
//   variation2: string,
//   variation3: string,
// ) {
//   return { category_name, variation1, variation2, variation3 };
// }

// const rows = [
//   createData('Live Plant - Design Your Own Plant Baby', 'eye_sku, mouth_sku', 'vessel_sku', 'succulent_sku: '),
// ];

// export default function SummaryTable() {
//   return (
//     <div className='pt-5 pb-5'>
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 500 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Design Your Own Plant Baby</TableCell>
//             <TableCell align="right">MOOD Design</TableCell>
//             <TableCell align="right">Vessel</TableCell>
//             <TableCell align="right">Succulent</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.category_name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.category_name}
//               </TableCell>
//               <TableCell align="right">{row.variation1}</TableCell>
//               <TableCell align="right">{row.variation2}</TableCell>
//               <TableCell align="right">{row.variation3}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     </div>
//   );
// }