import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FaCamera, FaMicrophone } from "react-icons/fa";
import { BiSolidCameraOff, BiSolidMicrophoneOff } from "react-icons/bi";
import ScreenShareIcon from '@mui/icons-material/ScreenShare';


const BottomBar = ({
  clickChat,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  screenShare,
  videoDevices,
  showVideoDevices,
  setShowVideoDevices
  
}) => {
  const handleToggle = useCallback(
    (e) => {
      setShowVideoDevices((state) => !state);
    },
    [setShowVideoDevices]
  );
  
  return (
    <Bar>
      <Left>
        <CameraButton onClick={toggleCameraAudio} data-switch='video'>
          <div className='grid place-items-center'>
            {userVideoAudio.video ? (
              <FaCamera size={20}/>
            ) : (
              <BiSolidCameraOff size={20}/>
            )}
          Camera
          </div>
        </CameraButton>
        {showVideoDevices && (
          <SwitchList>
            {videoDevices.length > 0 &&
              videoDevices.map((device) => {
                console.log(device);
                return <div>{device.label}</div>;
              })}
            <div>Switch Camera</div>
          </SwitchList>
        )}
        <SwitchMenu onClick={handleToggle}>
          <i className='fas fa-angle-up'></i>
        </SwitchMenu>
        <CameraButton onClick={toggleCameraAudio} data-switch='audio'>
          <div className='grid place-items-center'>
            {userVideoAudio.audio ? (
              <FaMicrophone size={20}/>
            ) : (
              <BiSolidMicrophoneOff size={20} />
            )}
          Audio
          </div>
        </CameraButton>
      </Left>
      <Center>
        {/* <ChatButton onClick={clickChat}>
          <div>
            <FaIcon className='fas fa-comments'></FaIcon>
          </div>
          Chat
        </ChatButton> */}
        <ScreenButton onClick={clickScreenSharing}>
          <div className='grid place-items-center'>
            <ScreenShareIcon/>
          Share Screen
          </div>
        </ScreenButton>
      </Center>
      <Right>
        <StopButton onClick={goToBack} style={{backgroundColor: "red", borderRadius: "4", display: "grid", placeItems: "center", cursor: "pointer"}}>Leave</StopButton>
        {/* <MyButton onClick={goToBack} text="Stop" style={{backgroundColor: "red", marginRight: 15}}/> */}
      </Right>
    </Bar>
  );
};

const Bar = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  background-color: #333;
`;
const Left = styled.div`
  display: flex;
  align-items: center;

  margin-left: 15px;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Right = styled.div``;


const ScreenButton = styled.div`
  width: auto;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    cursor: pointer;
    border-radius: 15px;
  }

  .sharing {
    color: #ee2560;
  }
`;

const StopButton = styled.div`
  width: 75px;
  height: 30px;
  border: none;
  font-size: 0.9375rem;
  line-height: 30px;
  margin-right: 15px;
  background-color: #ee2560;
  border-radius: 15px;

  :hover {
    cursor: pointer;
  }
`;

const CameraButton = styled.div`
  position: relative;
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }

`;

const SwitchMenu = styled.div`
  display: flex;
  position: absolute;
  width: 20px;
  top: 7px;
  left: 80px;
  z-index: 1;

  :hover {
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }

  > i {
    width: 90%;
    font-size: calc(10px + 1vmin);
  }
`;

const SwitchList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -115px;
  left: 80px;
  color: white;
  padding-top: 5px;
  padding-right: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  text-align: left;

  > div {
    font-size: 0.85rem;
    padding: 1px;
    margin-bottom: 5px;

    :not(:last-child):hover {
      cursor: pointer;
    }
  }

  > div:last-child {
    border-top: 1px solid white;
    cursor: context-menu !important;
  }
`;

export default BottomBar;