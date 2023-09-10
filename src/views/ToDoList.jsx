import { useState, useEffect } from "react";
//import { Form } from "reactstrap";
import { useNavigate, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../GrobalStyle.css';
const { VITE_APP_HOST } = import.meta.env;

function ToDoList() {
  const [activeTab, setActiveTab] = useState(1) // 狀態切換
  const Activing = (tabNumber) =>  {return tabNumber === activeTab ? "active" : null} // 狀態切換

  const [nickName, setNickName] = useState('') // 狀態切換
  const [isDone, setIsDone] = useState(0) // 狀態切換
  const [isLoading, setIsLoading] = useState({content:""}) // 狀態切換
  const [check, setCheck] = useState(false) // 狀態切換
  const [toDoList, setToDoList] = useState([]);
  const [toDoItem, setToDoItem] = useState('');
  const navigate = useNavigate()
  
  useEffect(() => {
    // 取得 Cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    
    // 預設 axios 的表頭
    axios.defaults.headers.common['Authorization'] = cookieValue;
    setIsLoading(true)
    // 驗證登入
    axios.get(`${VITE_APP_HOST}/users/checkout`)
    .then(res => {
      setNickName(res.data.nickname)
      takeToDoList()
    })
    .catch(err => {
      Swal.fire({
        title: "出錯啦!",
        text: `${err.response.data.message}`,
        icon: "error",
        }).then(() => {
          setTimeout(navigate('/login'), 3000)
        })
    }).finally(() => {
      setIsLoading(false) 
    })
    // Todo... AJAX
  }, [])

  useEffect(() => {
    setIsDone(toDoList.filter(x => x.status === true).length)
  }, [toDoList])

  useEffect(() => {
    setActiveTab(activeTab)
  }, [activeTab])

  async function takeToDoList(){
    axios.get(`${VITE_APP_HOST}/todos/`)
    .then(res => {
      //console.log('take ToDoList List:',res.data.data);
      setToDoList(res.data.data)
      console.log('take ToDoList List:',toDoList);
    })
    .catch(err => {
      Swal.fire({
        title: "出錯啦!",
        text: `${err.response.data.message}`,
        icon: "error",
        })
    })
  }

  async function SignOut(){
    await axios.post(
      `${VITE_APP_HOST}/users/sign_out`)
      .then(() => {
        Swal.fire({
          title: "登出成功!",
          text: "轉跳到登入頁面!",
          icon: "success",
          }).then(() => {
            document.cookie = `token=;`;
            setTimeout(navigate('/'), 3000)
          })
      })
  }

  async function addListItem(e){
    e.preventDefault();
    await axios.post(`${VITE_APP_HOST}/todos/`, toDoItem)
    .then(res => {
      Swal.fire({
        title: "新增成功!",
        text: `${res.data.data}`,
        icon: "success",
        })
    }).then(() => {
      takeToDoList()
      setActiveTab(1)
    })
  } 

  async function changeListItem(e){
    e.preventDefault();
    //const idObject = {id: e.target.value};
    await axios.patch(`${VITE_APP_HOST}/todos/${e.target.value}/toggle`)
    .then(res => {
      //console.log('changeListItem:',res);
      if (res.data.status) {
        Swal.fire({
          title: "修改成功!",
          text: `${res.data.message}`,
          icon: "success",
          })
      takeToDoList()
      } else {
        Swal.fire({
          title: "修改失敗!",
          text: `${res.data.message}`,
          icon: "error",
          })
      }
    })
  } 

  async function deleteListItems(e){
    e.preventDefault();
    const deleteList = toDoList.filter(item => (item.status === true))
    let loopCheck = true;
    deleteList.forEach(element => {
      axios.delete(`${VITE_APP_HOST}/todos/${element.id}`)
        .then(res => {
          if (res.data.status=== false) {
            loopCheck = false;
          } 
        }
      )
    });
    if (loopCheck) {
      Swal.fire({
        title: "刪除成功!",
        icon: "success",
      })
    }
    else {
      Swal.fire({
        title: "刪除部分失敗!",
        icon: "error",
      })
    }
    takeToDoList()
  }

  return (
    <>
      <div id="todoListPage" className="bg-half">
        <nav>
            <h1><NavLink></NavLink></h1>
            <ul>
                <li className="todo_sm"><NavLink to='/todo'><span>{nickName}的待辦</span></NavLink></li>
                <li><NavLink onClick={()=>SignOut()}>登出</NavLink></li>
            </ul>
        </nav>
        <div className="conatiner todoListPage vhContainer">
            <div className="todoList_Content">
                <div className="inputBox">
                    <input type="text" id="content" name="content" placeholder="請輸入待辦事項" value={toDoItem.content} onChange={(e)=>{
                        setToDoItem({[e.target.name]: e.target.value});
                      }}/>
                    <a onClick={(e)=>addListItem(e)}><FontAwesomeIcon icon={faPlus} style={{ "color":"#FFF" }}/></a>
                </div>
                <div className="todoList_list">
                    <ul className="todoList_tab">
                        <li><a className={Activing(1)} onClick={()=>setActiveTab(1)}>全部</a></li>
                        <li><a className={Activing(2)} onClick={()=>setActiveTab(2)}>待完成</a></li>
                        <li><a className={Activing(3)} onClick={()=>setActiveTab(3)}>已完成</a></li>
                    </ul>
                    <div className="todoList_items">
                        <ul className="todoList_item">
                          { activeTab===1 ? toDoList.map((item, index) => {
                            return (
                              <li key={index}>
                                <label className="todoList_label">
                                  <input className="todoList_input" type="checkbox" value={item.id} checked={item.status} onChange={e=>changeListItem(e)}/>
                                  <span>{item.content}</span>
                                </label>
                              </li>
                            )
                          }): activeTab===2 ? toDoList.filter(x => x.status === false).map((item, index) => {
                            return (
                              <li key={index}>
                                <label className="todoList_label">
                                  <input className="todoList_input" type="checkbox" value={item.id} checked={item.status} onChange={e=>changeListItem(e)}/>
                                  <span>{item.content}</span>
                                </label>
                              </li>
                            )
                          }): toDoList.filter(x => x.status === true).map((item, index) => {
                            return (
                              <li key={index}>
                                <label className="todoList_label">
                                  <input className="todoList_input" type="checkbox" value={item.id} checked={item.status} onChange={e=>changeListItem(e)}/>
                                  <span>{item.content}</span>
                                </label>
                              </li>
                            )
                          })}
                        </ul>
                        <div className="todoList_statistics">
                            <p>{`${isDone} 個已完成項目`}</p>
                            <NavLink onClick={(e)=>deleteListItems(e)}>清除已完成項目</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
export default ToDoList