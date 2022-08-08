import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Typography } from '@mui/material';
import moment from 'moment';

const ToDoItem = ({ todoItem, getData }) => {
  const [edited, setEdited] = useState(false);
  const [newText, setNewTest] = useState(todoItem.content);

  const editInputRef = useRef(null);

  useEffect(() => {
    // edit 모드일때 포커싱을 한다.
    if (edited) {
      editInputRef.current.focus();
    }
  }, [edited]);

  const onChangeCheckbox = () => {
    axios.patch("/todo/status/" + todoItem.id).then(() => {
      getData();
    });
  };

  const onClickEditButton = () => {
    setEdited(true);
  };

  const onChangeEditInput = (e) => {
    setNewTest(e.target.value);
  };

  const onClickSubmitButton = (e) => {
      axios.patch("/todo/" + todoItem.id, {content: newText}).then(() => {
        setEdited(false);
        getData();
      });
  };

  const onClickDeleteButton = () => {
    axios.delete("/todo/" + todoItem.id).then(() => {
      getData();
    });
  };
  const createdTime = moment(todoItem.createdAt).format("YYYY년 MM월 DD일")

  return (
    <div>
      <Typography fontSize={12}>
        {createdTime}
      </Typography>

    <li className="todoapp__item">
      {/* 아이템 완료 체크 / 체크 해제를 위한 체크박스 */}
      <input
        type="checkbox"
        className="todoapp__item-checkbox"
        checked={todoItem.isCompleted}
        onChange={onChangeCheckbox}
      />
      {
        // 아이템 내용
        edited ? (
          <input
            type="text"
            className="todoapp__item-edit-input"
            value={newText}
            ref={editInputRef}
            onChange={onChangeEditInput}
          />
        ) : (
          <span
            className={`todoapp__item-ctx ${
              todoItem.isCompleted ? 'todoapp__item-ctx-checked' : ''
            }`}
          >
            {todoItem.content}
          </span>
        )
      }
      {
        // 수정 버튼
        // 완료한 일인 경우에는 null을 반환하여 보이지 않도록 함
        !todoItem.isCompleted ? (
          edited ? (
            <button
              type="button"
              className="todoapp__item-edit-btn"
              onClick={onClickSubmitButton}
            >
              👌
            </button>
          ) : (
            <button
              type="button"
              className="todoapp__item-edit-btn"
              onClick={onClickEditButton}
            >
              ✏
            </button>
          )
        ) : null
      }

      {/* 삭제 버튼 */}
      <button
        type="button"
        className="todoapp__item-delete-btn"
        onClick={onClickDeleteButton}
      >
        🗑
      </button>
    </li>
    </div>
  );
};

ToDoItem.propTypes = {
  todoItem: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string.isRequired,
  }),
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
  setTodoList: PropTypes.func.isRequired,
};

export default ToDoItem;
