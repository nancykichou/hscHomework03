import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import Swal from 'sweetalert2';
import '../GrobalStyle.css';

const { VITE_APP_HOST } = import.meta.env;

function Login(){
  const [isLoading, setIsLoading] = useState(false) // 狀態切換
  const [signInForm, setSignInForm] = useState({email: "", password: ""});
  const navigate = useNavigate() // 把 hook 取出來做使用

  const handleChange = (e) => {
    setSignInForm({...signInForm, [e.target.name]: e.target.value});
  }

  async function handleSubmit(e){
    setIsLoading(true) // 狀態切換
    e.preventDefault();
    await axios.post(
      `${VITE_APP_HOST}/users/sign_in`, signInForm)
      .then(res => {
        document.cookie = `token=${res.data.token}`
        Swal.fire({
          title: "登入成功!",
          text: "轉跳到ToDoList!",
          icon: "success",
          }).then(() => {
            setTimeout(navigate('/todo'), 3000)
          })
        })
      .catch(err => {
        Swal.fire({
          title: "登入失敗啦!",
          text: `[${err.response.data.message}]+跳轉首頁!`,
          icon: "error"
          }).then(() => {
            setTimeout(navigate('/#/login'), 3000)
          })
        })
      .finally(() => {
        setIsLoading(false) // 狀態切換
      })
  }

  return(
    <>
      <form className="formControls" >
        <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
        <label htmlFor="email" className="formControls_label">電子信箱</label>
        <input type="email" id="email" name="email" className="formControls_input" onChange={(e)=>handleChange(e)}/>
        <label htmlFor="password" className="formControls_label">密碼</label>
        <input type="password" id="password" name="password" className="formControls_input" onChange={(e)=>handleChange(e)}/>
        <button type="submit" disabled={isLoading} className="formControls_btnSubmit" onClick={(e)=>handleSubmit(e)}>登入</button>
        <NavLink className="formControls_btnLink" to="/sign_up">註冊帳號</NavLink>
      </form>
    </>
  )
}
export default Login