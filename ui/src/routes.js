import MainLayout from "./components";
import AuthLayout from "./components/auth";
import SignIn from "./components/auth/signin";
import SignUp from "./components/auth/signup";

const routes = [
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      // { path: 'dashboard', element: <DashboardView /> },
      // { path: 'products', element: <ProductListView /> },
      // { path: 'settings', element: <SettingsView /> },
      // { path: '*', element: <Navigate to="/404" /> }
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    // children: [
    //   { path: 'login', element: <LoginView /> },
    //   { path: 'register', element: <RegisterView /> },
    //   { path: '404', element: <NotFoundView /> },
    //   { path: '/', element: <Navigate to="/app/dashboard" /> },
    //   { path: '*', element: <Navigate to="/404" /> }
    // ]
  },
];

export default routes;
