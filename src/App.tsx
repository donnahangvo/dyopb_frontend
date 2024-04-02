import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import routes from './config/routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Category from './pages/Category';
import Product from './pages/Product';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path=":categorySlug/" element={<Category />} />
        <Route path=":categorySlug/:productSlug/" element={<Product />} />
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
      <Footer />
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
