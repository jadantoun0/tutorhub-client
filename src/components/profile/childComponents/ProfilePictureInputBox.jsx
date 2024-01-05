import React, { useRef } from 'react'

const ProfilePictureInputBox = ({user, handleFileChange}) => {

  const fileInputRef = useRef(null);

  const handleChangePhoto = () => {
    // Trigger a click on the file input using its ref
    fileInputRef.current.click();
  };

  return (
    <div className='flex justify-center'>
    <div className='relative w-20 h-20'>
      <input name="profilePic" type="file" className='hidden' ref={fileInputRef} onChange={handleFileChange} />
        {
          !user.profilePic? 
            <img src="/images/pp.png" alt="profile pic" className='h-full w-full object-cover rounded-full' /> :
            <img src={`data:image/jpeg;base64,${user.profilePic}`} alt="Preview" className='h-full w-full object-cover rounded-full' />
        }
        <button  onClick={handleChangePhoto} className='absolute bottom-0 right-0 h-5 w-5 rounded-full bg-violet text-white flex justify-center items-center cursor-pointer'>
          +
        </button>
    </div>

  </div>

  )
}

export default ProfilePictureInputBox