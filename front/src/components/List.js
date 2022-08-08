import React, { useRef } from "react";
import "../css/list.scss";
import {
  CheckCircleFilled,
  CheckOutlined,
  DeleteFilled,
  EditFilled,
} from "@ant-design/icons";
import { useEffect } from "react";
import { useState } from "react";

function List({
  todos,
  edited,
  handleRemove,
  handleChecked,
  onClickEdit,
  onClickSubmit,
}) {
  const [newText, setNewText] = useState("");

  const editInputRef = useRef(null);

  useEffect(() => {
    // edit 모드일때 포커싱을 한다.
    if (edited) {
      editInputRef.current.focus();
    }
  }, [edited]);

  const onChangeEditInput = (e) => {
    setNewText(e.target.value);
  };

  return (
    <ul>
      {todos.map((todo) => {
        return (
          <li key={todo.id} className="list-container">
            <div className="list-con">
              {!edited ? (
                <p className={`${todo.isCompleted ? "checked" : ""}`}>
                  {todo.content}
                </p>
              ) : (
                <input
                  type="text"
                  className={`${todo.isCompleted ? "checked" : ""}`}
                  value={newText}
                  ref={editInputRef}
                  onChange={onChangeEditInput}
                />
              )}
              <div className="list-btn">
                {!edited ? (
                  <EditFilled
                    className="edit-icon"
                    onClick={() => {
                      onClickEdit();
                      setNewText(todo.content);
                    }}
                  />
                ) : (
                  <CheckCircleFilled
                    className="edit-icon"
                    onClick={onClickSubmit}
                  />
                )}
                <CheckOutlined
                  className="checked-icon"
                  onClick={() => handleChecked(todo.id)}
                />
                <DeleteFilled
                  className="delete-icon"
                  onClick={() => handleRemove(todo.id)}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default List;
