import React, { useEffect, useState } from 'react';

async function getCameraList(): Promise<MediaDeviceInfo[]> {
  await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  }).then(stream => stream.getVideoTracks().forEach(t => t.stop()));
  return navigator.mediaDevices.enumerateDevices();
}

function CameraList() {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [cameraList, setCameraList] = useState([] as any[]);
  
  useEffect(() => {
    getCameraList().then((devices:MediaDeviceInfo[]) => setDevices(devices));
  }, []);
  useEffect(() => {
    setCameraList(devices.filter(d => d.kind === 'videoinput')
      .map(d => 
    <tr key={d.deviceId}>
      <td>{d.label}</td>
      <td><textarea value={`{
  "video": {
    "deviceId": "${d.deviceId}",
    "width": 1280,
    "height": 720
  }
}`} contentEditable={false}></textarea></td>
    </tr>
    ));
  }, [devices])

  return (
    <table>
      <thead><tr><th>ラベル</th><th>deviceId</th></tr></thead>
      <tbody>{cameraList}</tbody>
    </table>
  );
}

export default CameraList;
