import React, { useEffect, useRef, useState } from 'react';

type Props = {
  constraint: string;
}

const CameraViewer: React.FC<Props> = props => {
  const el = useRef(document.createElement("video"));
  const [settings, setSettings] = useState("ここにVideoTrackのsettings()が出ます");

  useEffect(() => {
    try{
      if (props.constraint.length === 0) return;
      const constraint = JSON.parse(props.constraint);
      console.log(constraint);
      navigator.mediaDevices.getUserMedia(constraint).then(stream => {
        console.log("Stream opened");
        
        if(el.current.srcObject) {
          (el.current.srcObject as MediaStream).getVideoTracks().forEach(c => c.stop());
          el.current.srcObject = null;
        }
        setSettings(JSON.stringify(stream.getVideoTracks().map(t => t.getSettings()), null, "  "));
        el.current.srcObject = stream;
        el.current.onloadedmetadata = () => {
          el.current.play();
        };
      })
    } catch(e) {
      console.log(e);
      setSettings(`ERROR: ${e}`);
    }

  }, [props.constraint]);

  const videoStyle = {
    object_fit: "scale_down",
    width: 320,
    height: 180
  }

  return (
    <div>
      <video ref={el} style={videoStyle}></video>
      <textarea rows={20} cols={80} contentEditable={false} readOnly={true} value={settings}></textarea>
    </div>
  );
};

export default CameraViewer;
