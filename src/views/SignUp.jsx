import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import Swal from 'sweetalert2';
import '../GrobalStyle.css';

const { VITE_APP_HOST } = import.meta.env;

function SignUp(){
  const [isLoading, setIsLoading] = useState(false) // 狀態切換
  const [signUpForm, setSignUpForm] = useState({email: "", password: "", nickname: ""});
  const [pwdr, setPwdr] = useState(false) // 狀態切換
  const navigate = useNavigate() // 把 hook 取出來做使用

  const handleChange = (e) => {
    setSignUpForm({...signUpForm, [e.target.name]: e.target.value});
  }

  const checkPwd = (e) => {
    if(signUpForm.password !== e.target.value){
      setPwdr(true)
    }
  }
  async function handleSubmit(e){
    setIsLoading(true) // 狀態切換
    e.preventDefault();
    await axios.post(
      `${VITE_APP_HOST}/users/sign_up`, signUpForm)
      .then(res => {
        document.cookie = `token=${res.data.token}`
        Swal.fire({
          title: "註冊成功!",
          text: "請直接登入",
          icon: "success",
          }).then(() => {
            setTimeout(navigate('/#/login'), 3000)
          })
        })
      .catch(err => {
        Swal.fire({
          title: "註冊失敗啦!",
          text: `[${err.response.data.message}]`,
          icon: "error"
          })
        })
      .finally(() => {
        setIsLoading(false) // 狀態切換
      })
  }

  return(<>
    <form id="signup" className="formControls">
      <h2 className="formControls_txt">註冊帳號</h2>
      <label htmlFor="email" className="formControls_label">電子信箱</label>
      <input type="email" id="email" name="email" className="formControls_input" onChange={(e)=>handleChange(e)}/>
      <label htmlFor="nickname" className="formControls_label">您的暱稱</label>
      <input type="nickname" id="nickname" name="nickname" className="formControls_input" onChange={(e)=>handleChange(e)}/>
      <label htmlFor="password" className="formControls_label">密碼</label>
      <input type="password" id="password" name="password" className="formControls_input" onChange={(e)=>handleChange(e)}/>
      <label className="formControls_label" htmlFor="pwdr">再次輸入密碼</label>
      <input className="formControls_input" type="password" 
        name="pwd" id="pwdr" placeholder="請再次輸入密碼" required 
        onChange={(e)=>checkPwd(e)} />
      {pwdr  &&  <span className="text-danger"></span>}
      <button type="submit" disabled={isLoading} className="formControls_btnSubmit" onClick={(e)=>handleSubmit(e)}>註冊</button>
      <NavLink className="formControls_btnLink" to="/login">登入</NavLink>
    </form>
  </>)
}
export default SignUp