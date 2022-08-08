import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputBox from '../components/InputBox';
import ToDoItemList from '../components/ToDoItemList';

const Home = () => {
  const [todoList, setTodoList] = useState([]);

  localStorage.setItem("data", todoList);

  useEffect(()=>{
    const saved = localStorage.getItem("id");
    if (saved !== null){
      todoList(saved);
    }
    else getData();
  },[]);

  function getData() {
    axios.get("/todo").then((res) => {
      setTodoList(res.data);
    });
  }

  return (
    <div className="homepage__container">
      {/* ToDo Item을 추가할 수 있는 input 박스 */}
      <InputBox setTodoList={setTodoList} getData={getData} />

      {/* 할 일 Item 리스트 */}
      <ToDoItemList
        title={'할 일'}
        todoList={todoList}
        setTodoList={setTodoList}
        checkedList={false} // (체크되지 않은) 할 일 목록
        getData={getData}
      />

      {/* 완료한 Item 리스트 */}
      <ToDoItemList
        title={'완료한 항목'}
        todoList={todoList}
        setTodoList={setTodoList}
        checkedList={true} // (체크되어 있는)완료한 목록
        getData={getData}
      />
    </div>
  );
};

export default Home;
