import { useState } from "react";
import { Form } from "reactstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import Swal from 'sweetalert2';

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
            setTimeout(navigate('/'), 3000)
          })
        })
      .finally(() => {
        setIsLoading(false) // 狀態切換
      })
  }

  return(
    <>
      <Form id="login">
      <div className="form-group row">
        <div className="my-4">
          <label htmlFor="email" className="form-group col-2 me-2 text-end">電子信箱</label>
          <input type="email" id="email" name="email" className="form-group" onChange={(e)=>handleChange(e)}/>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-group col-2 me-2 text-end">密碼</label>
          <input type="password" id="password" name="password" className="form-group" onChange={(e)=>handleChange(e)}/>
        </div>
      </div>
      <div className="form-group d-flex justify-content-end">
        <button type="submit" disabled={isLoading} className="btn btn-primary col-3" onClick={(e)=>handleSubmit(e)}>登入</button>
      </div>
    </Form>
    </>
  )
}
export default Login