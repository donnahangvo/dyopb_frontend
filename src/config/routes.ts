import Home from '../pages/Home'
import Checkout from '../pages/Checkout'
// import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import MyAccount from '../pages/MyAccount'

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
      path: "/checkout",
      component: Checkout,
      name: "Checkout",
      protected: false
    },

    // {
    //   path: "/signup",
    //   component: SignUp,
    //   name: "Sign Up",
    //   protected: false
    // },

    {
      path: "/signin",
      component: SignIn,
      name: "Sign In",
      protected: false
    },

    {
      path: "/myaccount",
      component: MyAccount,
      name: "My Account",
      protected: true
    },


];


export default routes