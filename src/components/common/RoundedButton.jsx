import React from 'react'

const RoundedButton = ({text, onClick}) => {
  return (
    <button onClick={onClick} className="bg-violet text-white rounded-3xl px-4 py-2 mx-auto text-center text-sm font-semibold leading-6 hover:opacity-90">
        {text}
    </button>
  )
}

export default RoundedButton