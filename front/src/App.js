import React, { useState } from "react";
import "./css/reset.css";
import "./css/style.scss";
import Create from "./components/Create";
import List from "./components/List";
import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios";

function App() {
  getData();
  function getData() {
    axios.get("/todo").then((res) => {
      setTodos(res.data);
      console.log(res.data);
    });
  }
  const today = moment().format("YYYY-MM-DD");
  const day = moment().format("dddd");

  const [todos, setTodos] = useState([]);
  const [edited, setEdited] = useState(false);

  const handleAddTodo = (text) => {
    if (text === "") {
      return Swal.fire({
        icon: "error",
        text: "내용을 적어주세요",
        confirmButtonColor: "#74b9ff",
      });
    } else {
      const todo = {
        content: text,
      };
      axios.post("/todo", todo).then((res) => {
        console.log(todo);
        getData();
      });
    }
  };

  const handleRemove = (id) => {
    axios.delete("/todo/" + id).then(() => {
      getData();
    });
  };

  const handleChecked = (id) => {
    axios.patch("/todo/status/" + id).then(() => {
      getData();
    });
  };

  const onClickEdit = () => {
    setEdited(true);
  };

  const onClickSubmit = (text, id) => {
    if (text === "") {
      return Swal.fire({
        icon: "error",
        text: "내용을 적어주세요",
        confirmButtonColor: "#74b9ff",
      });
    } else {
      const todo = {
        content: text,
      };
      axios.patch("/todo/" + id, todo).then(() => {
        getData();
      });
    }
  };

  return (
    <div className="App">
      <div>
        <p className="today">{today}</p>
        <p className="day">{day}</p>
      </div>
      <h1>Todo List</h1>
      <div className="line" />
      <Create handleAddTodo={handleAddTodo} />
      <List
        todos={todos}
        edited={edited}
        handleRemove={handleRemove}
        handleChecked={handleChecked}
        onClickEdit={onClickEdit}
        onClickSubmit={onClickSubmit}
      />
    </div>
  );
}

export default App;
