import React, { useState, useEffect, useRef } from 'react';
import CategoryComponent from './CategoryComponent';
import { server_calls } from "../api/server";

interface CategoryData {
  id: number;
  name: string;
  slug: string;
  category_sku: string;
  is_featured: boolean;
  ordering: number;
}

function CategoryDropdown(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryData[]>([]);

  const menuRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await server_calls.get<CategoryData[]>('category');
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && iconRef.current && !menuRef.current.contains(e.target as Node) && !iconRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div 
      className='relative flex flex-col items-center w-[150px] rounded'>
      <button
        ref = {iconRef}
        onClick={() => setIsOpen(prev => !prev)}
        className='bg-primary-red p-4 w-full flex items-center rounded-lg text-white hover:text-primary-purple active:text-primary-purple active:bg-secondary-red'>
        
        {!isOpen ? (
            <i className="fa-solid fa-moon mr-2"></i>
        ) : (
            <i className="fa-regular fa-moon mr-2"></i>
        )}
        Collections
      </button>

      {isOpen && (
        <div 
          ref = {menuRef}
          onClick={(() => setIsOpen(false))}
          className='bg-secondary-red absolute top-20 flex flex-col items-start rounded-lg p-2 w-full'>
          <CategoryComponent categories={categories}/>
        </div>
      )}
    </div>
  );
}

export default CategoryDropdown;









// import React, { useState, useEffect, useRef } from 'react';
// import CategoryComponent from './CategoryComponent';
// import { server_calls } from "../api/server";

// export interface CategoryData {
//   id: string;
//   name: string;
//   slug: string;
//   category_sku: string;
//   is_featured: string;
//   ordering: string;
// }

// function CategoryDropdown(): JSX.Element {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [categories, setCategories] = useState<CategoryData[]>([]);

//   const menuRef = useRef();
//   const iconRef = useRef();

//   window.addEventListener('click', (e) => {
//     if(e.target !== menuRef.current && e.target !== iconRef.current){
//       setIsOpen(false);
//     }
//   })

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const categoryData = await server_calls.get<CategoryData[]>('category');
//         setCategories(categoryData);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div 
//       className='relative flex flex-col items-center w-[150px] rounded'>
//       <button
//         ref = {iconRef}
//         onClick={() => setIsOpen(prev => !prev)}
//         className='bg-primary-red p-4 w-full flex items-center rounded-lg text-white hover:text-primary-purple active:text-primary-purple active:bg-secondary-red'>
//         {!isOpen ? (
//             <i className="fa-solid fa-moon mr-2"></i>
//         ) : (
//             <i className="fa-regular fa-moon mr-2"></i>
//         )}
//         Collections
//       </button>

//       {isOpen && (
//         <div 
//           ref = {menuRef}
//           onClick={( => setIsOpen(false))}
//           className='bg-secondary-red absolute top-20 flex flex-col items-start rounded-lg p-2 w-full'>
//           <CategoryComponent categories={categories}/>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CategoryDropdown;




// import React, { useState } from 'react';
// import CategoryComponent from './CategoryComponent';

// function CategoryDropdown(): JSX.Element {
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   return (
//     <div className='relative flex flex-col items-center w-[150px] rounded'>
//       <button
//         onClick={() => setIsOpen(prev => !prev)}
//         className='bg-primary-red p-4 w-full flex items-center justify-between rounded-lg text-white active:text-primary-purple active:bg-secondary-red'
//       >
//         Shop
//         {!isOpen ? (
//           <i className="fa-solid fa-caret-down"></i>
//         ) : (
//           <i className="fa-solid fa-caret-up"></i>
//         )}
//       </button>

//       {isOpen && (
//         <div className='bg-secondary-red absolute top-20 flex flex-col items-start rounded-lg p-2 w-full'>
//           <CategoryComponent categories={categories}/>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CategoryDropdown;



// tried to separate category items but didn't work
// import React, { useState } from 'react';
// import CategoryComponent from './CategoryComponent';

// function CategoryDropdown(): JSX.Element {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [hoveredCategory, setHoveredCategory] = useState<string>('');

//   const handleMouseEnter = (title: string) => {
//     setHoveredCategory(title);
//   };

//   const handleMouseLeave = () => {
//     setHoveredCategory('');
//   };

//   return (
//     <div className='relative flex flex-col items-center w-[150px] rounded'>
//       <button
//         onClick={() => setIsOpen(prev => !prev)}
//         className='bg-primary-red p-4 w-full flex items-center justify-between rounded-lg text-white active:text-primary-purple active:bg-secondary-red'
//       >
//         Shop
//         {!isOpen ? (
//           <i className="fa-solid fa-caret-down"></i>
//         ) : (
//           <i className="fa-solid fa-caret-up"></i>
//         )}
//       </button>

//       {isOpen && (
//         <div className='bg-secondary-red absolute top-20 flex flex-col items-start rounded-lg p-2 w-full'>
//           <CategoryComponent onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
//         </div>
//       )}

//       {hoveredCategory && typeof hoveredCategory === 'string' && (
//         <p>You hovered over: {hoveredCategory}</p>
//       )}
//     </div>
//   );
// }

// export default CategoryDropdown;




// highlighted all objects rather than just one item
// import React, { useState } from 'react';
// import CategoryComponent from './CategoryComponent';

// function CategoryDropdown(): JSX.Element {
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   return (
//     <div className='relative flex flex-col items-center w-[150px] rounded'>
//       <button
//         onClick={() => setIsOpen(prev => !prev)}
//         className='bg-primary-red p-4 w-full flex items-center justify-between rounded-lg text-white active:text-primary-purple active:bg-secondary-red'
//       >
//         Shop
//         {!isOpen ? (
//           <i className="fa-solid fa-caret-down"></i>
//         ) : (
//           <i className="fa-solid fa-caret-up"></i>
//         )}
//       </button>

//       {isOpen && (
//         <div className='bg-secondary-red absolute top-20 flex flex-col items-start rounded-lg p-2 w-full'>
//           <CategoryComponent />
//         </div>
//       )}
//     </div>
//   );
// }

// export default CategoryDropdown;



// import { useState,} from 'react';
// import CategoryComponent from './CategoryComponent';

// function CategoryDropdown() {
//   const [isOpen, setIsOpen] = useState(false)
//   return (
//     <div className='relative flex flex-col items-center w-[250px] h-[250px] rounded'>
//       <button onClick={() => setIsOpen ((prev) => )} 
//       className='bg-secondary-red p-4 w-full flex items-center justify-between rounded-lg text-white active:text-primary-purple'>
//         Dropdown Title
//         {!isOpen ?(
//           <i className="fa-solid fa-caret-down"></i>
//         ): (
//           <i className="fa-solid fa-caret-up"></i>
//         )}
//         </button>

//         {isOpen && (
//           <div className='bg-secondary-red absolute top-20 flex flex-col items-start rounded-lg p-2 w-full'>
//             {category.map((category, i) => (
//               <div className='flex w-full justify-between p-2 hover:text-primary-purple cursor-pointer rounded-lg' key ={i}>
//                 <p>{category.name}</p>
//               </div>
//             ))}
//           </div>
//         )}
//     </div>
//   )
// }

// export default CategoryDropdown
