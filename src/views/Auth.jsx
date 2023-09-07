import { Outlet } from "react-router-dom";
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

function Auth(){
  return(<>
    <div className="container">
      <div className="row col-12">
        <div className="col-sm-12 col-lg-6">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
        </div>
        <div className="col-sm-12 col-lg-6">
          <Outlet />
        </div>
      </div>
    </div>
  </>)
}
export default Auth;