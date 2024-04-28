import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { server_calls } from "../api/server";
import CategoryProduct from "../components/CategoryProduct";

// This component only needs to render the category name and CategoryProduct component will display products on this page

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

// Define the props interface for the CategoryProduct component
export interface ProductComponentProps {
    categorySlug: string; // Add categorySlug to ProductComponentProps
    productSlug: string;
}

const Category: React.FC = () => {
    //@ts-ignore
    const { categorySlug } = useParams<RouteParams>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [category, setCategory] = useState<CategoryData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //@ts-ignore
                const categoryData = await server_calls.get<CategoryData[]>(`category/`);

                const foundCategory = categoryData.find((category: { slug: string | undefined; }) => category.slug === categorySlug);

                if (foundCategory) {
                    setCategory(foundCategory); // Set the found category
                } else {
                    setError('Category not found');
                }
            } catch (error) {
                //@ts-ignore
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
                {category && (
                    <div key={category.id}>
                        <h1 className='bg-primary-purple text-center font-bold text-white'>{category.name}</h1>
                        <div>
                            {/* Render products associated with the category */}
                           <CategoryProduct categorySlug={category.slug} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Category;

