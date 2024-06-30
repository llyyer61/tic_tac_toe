import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    // 特别注意：
    // 直接使用 setIsEditing(!isEditing) 可能会导致状态更新不一致的问题，
    // 特别是在高并发情况下，因为 isEditing 的值在更新时可能已经变化。
    // 而使用状态更新函数 (editing) => !editing 确保了你总是基于最新的状态进行更新
    // editing是在调用 setIsEditing 时使用的状态更新函数的参数
    // 参数 editing 会自动传入当前的状态值（即 isEditing 的当前值）
    setIsEditing((editing) => !editing);
  }

  //   event.target获取使用这个function的dom的数据
  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  //点击修改，改变DOM元素，修改姓名，名字存在useState的memory中
  let editablePlayerName = isEditing ? (
    <input
      type="text"
      required
      placeholder="Name"
      value={playerName}
      onChange={handleChange}
    />
  ) : (
    <span className="player-name">{playerName}</span>
  );
  let btnCatiopn = isEditing ? "Save" : "Edit";

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCatiopn}</button>
    </li>
  );
}
