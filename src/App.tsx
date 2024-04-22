import React, { useState } from 'react';
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

function App() {
  // State to control the visibility of the shopping bag component
  const [isBagVisible, setIsBagVisible] = useState(false);

  // Function to toggle the visibility of the shopping bag component
  const toggleBagVisibility = () => {
    setIsBagVisible(!isBagVisible);
    // Ensure that isBagVisible is toggled correctly
    console.log("isBagVisible:", isBagVisible);
  };

  return (
    <HashRouter>
      <ShoppingBagProvider>
        <Navbar toggleBagVisibility={toggleBagVisibility} />
        {/* Render ShoppingBagComponent only if isBagVisible is true */}
        {isBagVisible && <ShoppingBagComponent isVisible={isBagVisible} toggleVisibility={toggleBagVisibility} />}
        <ProductProvider>
          <ProductReducerProvider>
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
          </ProductReducerProvider>
        </ProductProvider>
        <Footer />
      </ShoppingBagProvider>
    </HashRouter>
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