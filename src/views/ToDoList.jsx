import { useState, useEffect } from "react";
//import { Form } from "reactstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
const { VITE_APP_HOST } = import.meta.env;

function ToDoList() {
  const [isLoading, setIsLoading] = useState(false) // 狀態切換
  const [isCheck, setIsCheck] = useState(false) // 狀態切換
  const [toDoList, setToDoList] = useState([]);
  const navigate = useNavigate()
  
  useEffect(() => {
    // 取得 Cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    console.log(cookieValue);
    
    // 預設 axios 的表頭
    axios.defaults.headers.common['Authorization'] = cookieValue;
    setIsLoading(true)
    // 驗證登入
    axios.get(`${VITE_APP_HOST}/users/checkout`)
    .then(res => {
      console.log(res);
      setIsCheck(true)
    })
    .catch(err => {
      console.log('登入失敗啦', err);
      setTimeout(() => {
        navigate('/auth/login')
      }, 3000);
    }).finally(() => {
      setIsLoading(false)
    })

    axios.get(`${VITE_APP_HOST}/todos/`)
    .then(res => {
      console.log('take ToDoList List:',res);
    })
    .catch(err => {
      console.log('登入失敗啦', err);
      setTimeout(() => {
        navigate('/auth/login')
      }, 3000);
    })
    // Todo... AJAX
  }, [])
  
  return (
    <>
      <div className="container">
        <div className="row col-12 d-flex justify-content-center">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">編號</th>
                <th scope="col">待辦事項</th>
                <th scope="col">狀態</th>
                <th scope="col">操作</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </>
  )
}
export default ToDoList