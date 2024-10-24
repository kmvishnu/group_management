import { useState } from "react";
import './AddChild.css';

function AddChild({ setIsVisible, handleAddNode }){
  const [childName, setChildName] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    handleAddNode(childName);
    setIsVisible(false); }

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Add Node</h2>
        <form onSubmit={onSubmit}>
          <label>
            Node Name:
            <input
              type="text"
              value={childName}
              onChange={e => setChildName(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setIsVisible(false)}>Close</button>
      </div>
    </div>
  );
}

export default AddChild;
