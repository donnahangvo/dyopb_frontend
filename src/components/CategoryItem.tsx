import React from 'react';

export interface CategoryItemProps {
  category: {
    id: number;
    name: string;
    slug: string;
    category_sku: string;
    is_featured: boolean;
    ordering: number;
  };
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {

  // Check if the category is featured
  if (!category.is_featured) {
    // If not featured, return null (will not render anything)
    return null;
  }

  return (
    <div>
      {category.name}
    </div>
  );
};

export default CategoryItem;




// import React from 'react';
// import { Link } from 'react-router-dom';

// export interface CategoryItemProps {
//   category: {
//     id: string;
//     name: string;
//     slug: string;
//     sku: string;
//     is_featured: string;
//     ordering: string;
//   };
// }

// const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {

//     const isFeatured = category.is_featured === 'true';


//     return isFeatured ? (
//         <div>
//             <Link to={`${category.slug}`} className="">
//                 {category.name}
//             </Link>
//         </div>
//     ) : null;

// };

// export default CategoryItem;
