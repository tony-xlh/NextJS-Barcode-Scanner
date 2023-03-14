import { CameraEnhancer } from "dynamsoft-camera-enhancer";
import React from "react";
import { ReactNode } from "react";

export interface CameraProps{
  isActive?:boolean;
  isPause?:boolean;
  desiredCamera?:string;
  children?: ReactNode;
  onInitialized?: (enhancer:CameraEnhancer) => void;
  onOpened?: () => void;
  onClosed?: () => void;
}

const BarcodeScanner = (props:CameraProps): React.ReactElement => {
  const mounted = React.useRef(false);
  const container = React.useRef(null);
  const enhancer = React.useRef<CameraEnhancer>();
  React.useEffect(()=>{
    const init = async () => {
      enhancer.current = await CameraEnhancer.createInstance();
      await enhancer.current.setUIElement(container.current!);
      enhancer.current.setVideoFit("cover");
      if (props.onInitialized) {
        props.onInitialized(enhancer.current);
      }
      mounted.current = true;
      toggleCamera();
    }
    init();
  },[])

  const toggleCamera = () => {
    if (mounted.current === true) {
      if (props.isActive === true) {
        enhancer.current?.open(true);
      }else{
        enhancer.current?.close();
      }
    }
  }

  React.useEffect(()=>{
    toggleCamera();
  },[props.isActive])

  return (
    <div ref={container} style={{ position:"relative", width:"100%", height:"100%" }}>
      <div className="dce-video-container"></div>
    </div>
  )
}

export default BarcodeScanner;
