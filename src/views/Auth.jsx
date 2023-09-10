import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { logoIcon ,workingIcon } from '../assets/GrobalString';
import '../GrobalStyle.css';

function Auth(){
  return(<>
    <div id="loginPage" className="bg-yellow">
        <div className="conatiner loginPage vhContainer ">
            <div className="side">
                <a href="#"><img className="logoImg" src={logoIcon} alt="" /></a>
                <img className="d-m-n" src={workingIcon} alt="workImg" />
            </div>
            <Outlet />
        </div>
    </div>
  </>)
}
export default Auth;