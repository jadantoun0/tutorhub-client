import React, { useState } from 'react';
import { Collapse, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { BiSolidFilePdf } from 'react-icons/bi';
import { FaFileWord, FaFileImage } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useRemoveFileFromWeekMutation } from '../../redux/services/courseSlice';
import { getFileName, getFileType } from '../../utils/fileUtils';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/store/userSlice';

const WeekCard = ({ week, weekIndex, courseId, selectedCourse, setSelectedCourse }) => {
  const [open, setOpen] = useState(false);
  const [removeFile] = useRemoveFileFromWeekMutation();
  const isTutor = useSelector(selectUser)?.role?.toLowerCase() === 'tutor'

  function handleClick() {
    setOpen(!open);
    setSelectedCourse(weekIndex);
  }

  async function handleDeleteFile(index) {
    await removeFile({ courseId, weekNumber: weekIndex, index });
  }

  function handleCloseCollapse() {
    setSelectedCourse(-1);
  }

  return (
    <div
      className={`bg-gray cursor-pointer`}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
      }}
      onClick={handleClick}
    >
      <div
        className={`flex items-center px-5 justify-between  ${
          selectedCourse === weekIndex && 'bg-zinc-400'
        }`}
      >
        <p className='font-bold py-2'>Week {weekIndex + 1}</p>
        <IconButton onClick={() => setOpen(!open)} size='small'>
          {open ? <RemoveIcon style={{ color: 'black' }} /> : <AddIcon style={{ color: 'black' }} />}
        </IconButton>
      </div>

      <Collapse in={open} timeout='auto' unmountOnExit onExited={handleCloseCollapse}>
        <div className='px-5'>
          {week.map((document, index) => (
            <div className='flex justify-between pr-5'>
                <a
                key={index}
                href={document}
                target='_blank'
                rel='noopener noreferrer'
                style={{ textDecoration: 'none' }}
                >
                <div className='flex items-center gap-x-1 py-2'>
                    {getFileType(document) === 'pdf' ? (
                    <BiSolidFilePdf />
                    ) : getFileType(document) === '.docx' ? (
                    <FaFileWord />
                    ) : (
                    <FaFileImage />
                    )}
                    {getFileName(document)}
                </div>
                </a>

                {
                    isTutor && 
                    <button onClick={() => handleDeleteFile(index)}>
                        {/* <MdDelete size={20} /> */}
                        <MdDelete size={20} className="text-black hover:text-zinc-400"/>
                    </button>
                }
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default WeekCard;
