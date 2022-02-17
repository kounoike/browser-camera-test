import React, { useEffect, useState } from 'react'

async function getCameraList (): Promise<MediaDeviceInfo[]> {
  await navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false
    })
    .then(stream => stream.getVideoTracks().forEach(t => t.stop()))
  return navigator.mediaDevices.enumerateDevices()
}

function CameraList () {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [cameraList, setCameraList] = useState([] as any[])

  useEffect(() => {
    setCameraList(
      devices
        .filter(d => d.kind === 'videoinput')
        .map(d => (
          <tr key={d.deviceId}>
            <td>{d.label}</td>
            <td>
              <textarea
                value={`{
  "video": {
    "deviceId": "${d.deviceId}",
    "width": 1280,
    "height": 720
  }
}`}
                readOnly={true}
                contentEditable={false}
              ></textarea>
            </td>
          </tr>
        ))
    )
  }, [devices])

  const enumerateDevices = () => {
    getCameraList()
      .then((devices: MediaDeviceInfo[]) => setDevices(devices))
      .catch(e => {
        console.log(e)
      })
  }

  const handleClick = () => {
    enumerateDevices()
  }

  useEffect(() => {
    enumerateDevices()
  }, [])

  return (
    <div>
      <button onClick={handleClick}>列挙</button>
      <table>
        <thead>
          <tr>
            <th>ラベル</th>
            <th>制約</th>
          </tr>
        </thead>
        <tbody>{cameraList}</tbody>
      </table>
    </div>
  )
}

export default CameraList
