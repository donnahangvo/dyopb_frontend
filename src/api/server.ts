export const apiURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_CLIENT_ID;

export const server_calls = {
    get: async (endpoint: string, requireToken: boolean = true) => {
        const url = `${apiURL}/api/${endpoint}`;
        
        const headers: Record<string, string> = {};

        if (requireToken) {
            headers['Authorization'] = `Token ${token}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from the server');
        }

        return await response.json();
    },

    post: async (endpoint: string, requireToken: boolean = true, data: any) => {
        const url = `${apiURL}/api/${endpoint}`;

        const headers: Record<string, string> = {
            'Content-Type': 'application/json', // Specify JSON content type for POST request
        };

        if (requireToken) {
            headers['Authorization'] = `Token ${token}`;
        }

        const response = await fetch(url, {
            method: 'POST', 
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from the server');
        }

        return await response.json();
    },

    delete: async (endpoint: string, requireToken: boolean = true) => {
        const url = `${apiURL}/api/${endpoint}`;

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };
        
        if (requireToken) {
            headers['Authorization'] = `Token ${token}`;
        }

        const response = await fetch(url, {
            method: 'DELETE',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from the server');
        }

        return await response.json();
    },
};









// const apiURL = import.meta.env.VITE_API_URL;
// const token = import.meta.env.VITE_CLIENT_ID;

// export const server_calls = {
//     get: async (endpoint: string, requireToken: boolean = true) => {
//         const url = `${apiURL}/api/${endpoint}`;

//         const headers: Record<string, string> = {};

//         if (requireToken) {
//             headers['Authorization'] = `Token ${token}`;
//         }

//         const response = await fetch(url, {
//             method: 'GET',
//             headers: headers,
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch data from the server');
//         }

//         const data = await response.json();

//         // Extract image and thumbnail URLs if they exist
//         const { image, thumbnail, ...restData } = data;
//         const newData = image && thumbnail ? { ...restData, image, thumbnail } : restData;

//         return newData;
//     },

//     post: async (endpoint: string, requireToken: boolean = true, data: any) => {
//         const url = `${apiURL}/api/${endpoint}`;

//         const headers: Record<string, string> = {
//             'Content-Type': 'application/json',
//         };

//         if (requireToken) {
//             headers['Authorization'] = `Token ${token}`;
//         }

//         const response = await fetch(url, {
//             method: 'POST',
//             headers: headers,
//             body: JSON.stringify(data),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch data from the server');
//         }

//         const responseData = await response.json();

//         // Extract image and thumbnail URLs if they exist
//         const { image, thumbnail, ...restResponseData } = responseData;
//         const newResponseData = image && thumbnail ? { ...restResponseData, image, thumbnail } : restResponseData;

//         return newResponseData;
//     },

//     delete: async (endpoint: string, requireToken: boolean = true) => {
//         const url = `${apiURL}/api/${endpoint}`;

//         const headers: Record<string, string> = {
//             'Content-Type': 'application/json',
//         };

//         if (requireToken) {
//             headers['Authorization'] = `Token ${token}`;
//         }

//         const response = await fetch(url, {
//             method: 'DELETE',
//             headers: headers,
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch data from the server');
//         }

//         const responseData = await response.json();

//         // Extract image and thumbnail URLs if they exist
//         const { image, thumbnail, ...restResponseData } = responseData;
//         const newResponseData = image && thumbnail ? { ...restResponseData, image, thumbnail } : restResponseData;

//         return newResponseData;
//     },
// };










// export const server_calls = {
//     get: async (endpoint: string, requireToken: boolean = true) => {
//         const url = `${apiURL}/api/${endpoint}`;

//         const headers: Record<string, string> = {};

//         if (requireToken) {
//             headers['Authorization'] = `Token ${token}`;
//         }

//         const response = await fetch(url, {
//             method: 'GET',
//             headers: headers,
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch data from the server');
//         }

//         const data = await response.json();

//         // Extract image and thumbnail URLs
//         const { image, thumbnail } = data;

//         return { ...data, image, thumbnail }; // Merge with original data
//     },

//     post: async (endpoint: string, requireToken: boolean = true, data: any) => {
//         const url = `${apiURL}/api/${endpoint}`;

//         const headers: Record<string, string> = {
//             'Content-Type': 'application/json',
//         };

//         if (requireToken) {
//             headers['Authorization'] = `Token ${token}`;
//         }

//         const response = await fetch(url, {
//             method: 'POST',
//             headers: headers,
//             body: JSON.stringify(data),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch data from the server');
//         }

//         const responseData = await response.json();

//         // Extract image and thumbnail URLs
//         const { image, thumbnail } = responseData;

//         return { ...responseData, image, thumbnail }; // Merge with original response data
//     },

//     delete: async (endpoint: string, requireToken: boolean = true) => {
//         const url = `${apiURL}/api/${endpoint}`;

//         const headers: Record<string, string> = {
//             'Content-Type': 'application/json',
//         };

//         if (requireToken) {
//             headers['Authorization'] = `Token ${token}`;
//         }

//         const response = await fetch(url, {
//             method: 'DELETE',
//             headers: headers,
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch data from the server');
//         }

//         const responseData = await response.json();

//         // Extract image and thumbnail URLs
//         const { image, thumbnail } = responseData;

//         return { ...responseData, image, thumbnail }; // Merge with original response data
//     },
// };



