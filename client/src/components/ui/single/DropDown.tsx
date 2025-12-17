import React, { useState } from 'react'

type Props = {
  items: string[],
  title: string
  selected?: string,
  mt?: number,
  setSelected: React.Dispatch<React.SetStateAction<any | undefined>>
}

const DropDown = (p: Props) => {

  const handleClick = () => {
    const elem: any = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  return (
    <details className={`dropdown w-full mt-${p.mt}`}>
      <summary className="btn w-full">{p.selected ? p.selected : p.title}</summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        {
          p.items.map(d =>
            <li key={d}><button onClick={() => {
              p.setSelected(d);
              handleClick();
            }}>{d}</button></li>
          )
        }
      </ul>
    </details>
  )
}

export default DropDown