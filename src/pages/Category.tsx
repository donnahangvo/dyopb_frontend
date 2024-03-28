import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { server_calls } from "../api/server";
import CategoryProduct from "../components/CategoryProduct";

interface CategoryData {
    id: string;
    name: string;
    slug: string;
    sku: string;
    is_featured: boolean;
    ordering: string;
}

interface RouteParams {
    categorySlug: string;
}

const Category: React.FC = () => {
    const { categorySlug } = useParams<RouteParams>(); // Access categorySlug from route params
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [category, setCategory] = useState<CategoryData | null>(null); // Store the selected category

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryData = await server_calls.get<CategoryData[]>('category');
                const foundCategory = categoryData.find((category: { slug: string | undefined; }) => category.slug === categorySlug);
                if (foundCategory) {
                    setCategory(foundCategory); // Set the found category
                } else {
                    setError('Category not found');
                }
            } catch (error) {
                setError(error.message || 'An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categorySlug]); // Fetch data whenever categorySlug changes

    return (
        <div className='bg-secondary-purple'>
        <div className=''>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {category && ( // Render only if category is found
                <div key={category.id}>
                    <h1 className='bg-primary-purple text-center font-bold text-white'>{category.name}</h1>
                    <div>
                        {/* Render products associated with the category */}
                        <CategoryProduct categoryId={category.id} />
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default Category;



// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { server_calls } from "../api/server";
// // import CategoryProduct from "../components/CategoryProduct";

// interface CategoryData {
//     id: string;
//     name: string;
//     slug: string;
//     sku: string;
//     is_featured: string;
//     ordering: string;
// }

// const Category: React.FC = () => {
//   const { categorySlug } = useParams<{ categorySlug: string }>(); // Access categorySlug from route params
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
//     <div>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       {categories.map(category => (
//         <div key={category.id}>
//           <h1 className='bg-secondary-purple text-center font-extrabold text-white'>{category.name}</h1>
//           <div>
//             Category Products rendered here
//           {/* <CategoryProduct categorySlug={category.slug} /> */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Category;
