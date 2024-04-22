import Home from '../pages/Home'
import ShoppingBag from '../pages/ShoppingBag'

interface RouteType {
    path: string,
    component: () => JSX.Element,
    name: string
    protected:boolean
}

const routes: RouteType[] = [
    {
      path: "",
      component: Home,
      name: "Home Screen",
      protected: false
    },

    {
      path: "/shoppingbag",
      component: ShoppingBag,
      name: "Shopping Bag",
      protected: false
    },

];


export default routes