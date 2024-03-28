import Home from '../pages/Home'
// import Product from '../pages/Product'

interface RouteType {
    path: string,
    component: () => JSX.Element,
    name: string
}

const routes: RouteType[] = [
    {
      path: "",
      component: Home,
      name: "Home Screen",
    },

    // only for development
    // {
    //   path: "product",
    //   component: Product,
    //   name: "Product Page",
    // },

];

export default routes