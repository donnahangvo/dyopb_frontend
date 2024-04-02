import React from 'react';
import { Link } from 'react-router-dom';

export interface CategoryData {
  id: number;
  name: string;
  slug: string;
  category_sku: string;
  is_featured: boolean;
  ordering: number;
}

interface CategoryComponentProps {
  categories: CategoryData[];
}

const CategoryComponent: React.FC<CategoryComponentProps> = ({ categories }) => {
  // Filter categories to only include those that are featured
  const featuredCategories = categories.filter(category => category.is_featured);

  return (
    <div>
      {/* Map through the filtered featured categories */}
      {featuredCategories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

interface CategoryItemProps {
  category: CategoryData;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  return (
    <div>
      <Link to={`${category.slug}`} className="hover:text-primary-purple p-1 display: inline-block">
        {category.name}
      </Link>
    </div>
  );
};

export default CategoryComponent;






// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { server_calls } from "../api/server";

// interface CategoryData {
//   id: string;
//   title: string;
//   slug: string;
//   sku: string;
// }

// const CategoryComponent: React.FC = () => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>('');
//   const [categories, setCategories] = useState<CategoryData[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const categoryData = await server_calls.get<CategoryData[]>('category');
//         setCategories(categoryData);
//       } catch (error) {
//         setError(error.message || 'An error occurred while fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       {categories.map((category) => (
//         <CategoryItem key={category.id} category={category} />
//       ))}
//     </>
//   );
// };

// interface CategoryItemProps {
//   category: CategoryData;
// }

// const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
//   return (
//     <div>
//       <Link to={`/category/${category.slug}`}>{category.title}</Link>
//     </div>
//   );
// };

// export default CategoryComponent;

// tried to separate by mousing over but didn't work
// import React, { useState, useEffect } from 'react';
// import { server_calls } from "../api/server";

// interface CategoryData {
//   id: string;
//   title: string;
//   slug: string;
//   sku: string;
// }

// interface CategoryComponentProps {
//   onMouseEnter: () => void;
//   onMouseLeave: () => void;
// }

// const CategoryComponent: React.FC<CategoryComponentProps> = ({ onMouseEnter, onMouseLeave }) => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>('');
//   const [categories, setCategories] = useState<CategoryData[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const categoryData = await server_calls.get<CategoryData[]>('category');
//         setCategories(categoryData);
//       } catch (error) {
//         setError(error.message || 'An error occurred while fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       {categories.map((category) => (
//         <div key={category.id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
//           {category.title}
//         </div>
//       ))}
//     </>
//   );
// };

// export default CategoryComponent;

// all objects highlighted
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { server_calls } from "../api/server";

// interface CategoryData {
//   id: string;
//   title: string;
//   slug: string;
//   sku: string;
// }

// const CategoryComponent: React.FC = () => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>('');
//   const [categories, setCategories] = useState<CategoryData[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const categoryData = await server_calls.get<CategoryData[]>('category');
//         setCategories(categoryData);
//       } catch (error) {
//         setError(error.message || 'An error occurred while fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       {categories.map((category) => (
//         <div key={category.id}>
//           <Link to={`/category/${category.slug}`}>{category.title}</Link>
//         </div>
//       ))}
//     </>
//   );
// };

// export default CategoryComponent;









// import React, { useState, useEffect } from 'react';
// import { server_calls } from "../api/server";

// interface CategoryData {
//   id: string;
//   title: string;
//   slug: string;
//   sku: string;
// }


// const CategoryComponent: React.FC = () => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>('');
//   const [categories, setCategories] = useState<CategoryData[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const categoryData = await server_calls.get<CategoryData[]>('category');
//         setCategories(categoryData);
//       } catch (error) {
//         setError(error.message || 'An error occurred while fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       {categories.map((category) => (
//         <div key={category.id}>{category.title}</div>
//       ))}
//     </>
//   );
// };

// export default CategoryComponent;