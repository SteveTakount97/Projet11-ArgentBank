import Footer from './component/footer/footer';
import NavBar from './component/navigation/navbar';
import Home from './pages/home';
import SignUp from './pages/singup';
import User from './pages/User';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/SignUp',
        element: <SignUp />
      }, 
      {
        path: '/User',
        element: <User />
      }
    ]
  },
 
])

function Root (){
  return <>
      <NavBar />  
       <Outlet />
     <Footer />
  </>
}

function App() {
  return <RouterProvider router={router}/>
  
}

export default App;
