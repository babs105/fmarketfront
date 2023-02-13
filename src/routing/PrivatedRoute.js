import {Navigate,Outlet} from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
 
 const PrivatedRoute = ({ isAllowed,redirectPath = '/login',children}) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return(
        <div>
        <header>
        
          <SideBar/>
          <NavBar/>
       </header>
       <main style={{marginTop: "58px"}}>
      <div className="container pt-4">
    { children ? children : <Outlet />}
     </div>
   </main>
  </div>
     );
  };
  export default  PrivatedRoute;