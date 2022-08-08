import React from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';

const ToDoItemList = ({ title, todoList, setTodoList, checkedList, getData }) => (
  <div className="todoapp__list">
    {/* props로 부터 title 값을 전달 받음 */}
    <p className="todoapp__list-tit">{title}</p>

    <ul className="todoapp__list-ul">
      { 
        todoList.map((todoItem) => {

          // checkedList 값에 따라 '할 일 목록' 또는 '완료한 목록'을 출력
          if (checkedList !== todoItem.isCompleted) return null;

          return (
            // map을 이용하여 ToDoItem을 출력
            <ToDoItem
              key={todoItem.id}
              todoItem={todoItem}
              todoList={todoList}
              setTodoList={setTodoList}
              getData={getData}
            />
          );
        })}
    </ul>
  </div>
);

ToDoItemList.propTypes = {
  title: PropTypes.string.isRequired,
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  setTodoList: PropTypes.func.isRequired,
  checkedList: PropTypes.bool.isRequired,
};

export default ToDoItemList;
