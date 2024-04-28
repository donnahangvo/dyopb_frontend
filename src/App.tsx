import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import routes from './config/routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Category from './pages/Category';
import Product from './pages/Product';
import { ProductProvider } from './context/ProductContext';
import { ProductReducerProvider } from './context/ProductReducer';
import { ShoppingBagProvider } from './context/ShoppingBagContext';
import ShoppingBagComponent from './components/ShoppingBagComponent';
import { TaxContextProvider } from './context/TaxContext';
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Config } from './config/auth0.config';

function App() {
  // State to control the visibility of the shopping bag component
  const [isBagVisible, setIsBagVisible] = useState(false);

  // Function to toggle the visibility of the shopping bag component
  const toggleBagVisibility = () => {
    setIsBagVisible(!isBagVisible);
    // Ensure that isBagVisible is toggled correctly
    // console.log("isBagVisible:", isBagVisible);
  };

  return (
    <Auth0Provider
    domain={auth0Config.domain}
    clientId={auth0Config.clientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <HashRouter>
      <ShoppingBagProvider>
        <Navbar toggleBagVisibility={toggleBagVisibility} />
        {/* Render ShoppingBagComponent only if isBagVisible is true */}
        {isBagVisible && <ShoppingBagComponent isVisible={isBagVisible} toggleVisibility={toggleBagVisibility} />}
        <ProductProvider>
          <ProductReducerProvider>
            {/* Wrap your entire application with TaxContextProvider */}
            <TaxContextProvider>
              <Routes>
                <Route path=":categorySlug/" element={<Category />} />
                <Route path="/product/:productSlug/" element={<Product />} />
                <Route path=":categorySlug/:productSlug/" element={<Product />} />
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}
              </Routes>
            </TaxContextProvider>
          </ProductReducerProvider>
        </ProductProvider>
        <Footer />
      </ShoppingBagProvider>
    </HashRouter>
    </Auth0Provider>
  );
}

export default App;









// redux
// import { HashRouter, Routes, Route, Link } from 'react-router-dom'
// import routes from './config/routes'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// // import { Provider } from 'react-redux'
// // import store from './redux/store'

// function App() {

//   return (
//     <HashRouter>
//       <Navbar />
//       {/* <Provider store={store}> */}
//         <Routes>
//           { routes.map((route: any, index: any) => (
//             <Route
//               key={index}
//               path={route.path}
//               element={
//                 <route.component />
//               }
//               />
//           )) }
//         </Routes>
//         {/* </Provider> */}
//         <Footer />
//     </HashRouter>
//   )
// }

// export default App