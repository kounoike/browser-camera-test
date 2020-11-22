import React, { useState } from 'react';
import './App.css';
import CameraList from './CameraList';
import CameraViewer from './CameraViewer';

function App() {
  const [constraint, setConstraint] = useState(`{
  "video": {
    "deviceId": "default",
    "width": 1280,
    "height": 720
  }
}`);
  const [actualConstraint, setActualConstraint] = useState(constraint);

  const handleClick = () => {
    setActualConstraint(constraint);
  };
  return (
    <div>
      <header>
        <table>
          <tbody>
            <tr>
              <td><CameraList></CameraList></td>
              <td><textarea value={constraint} onChange={
          (ev) => setConstraint(ev.target.value)}
        rows={20} cols={80}></textarea></td>
              <td><button onClick={handleClick}>反映</button></td>
            </tr>
            <tr><td colSpan={3}><CameraViewer constraint={actualConstraint}></CameraViewer></td></tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
