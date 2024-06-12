import React from 'react'

const MenuButton = ({text, url, icon: ComponentToRender}) => {
  return (
    <a
        href={url}
        className="flex items-center gap-x-2 -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 sm:hover:bg-gray"
    >
        {ComponentToRender && <ComponentToRender />}
        {text}
    </a> 
  )
}

export default MenuButton