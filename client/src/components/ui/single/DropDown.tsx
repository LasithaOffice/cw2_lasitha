import React, { useState } from 'react'
import Typography from './Typography'

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
    // <details className={`dropdown w-full mt-${p.mt}`}>
    //   <summary className="btn w-full">{p.selected ? p.selected : p.title}</summary>
    //   <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    //     {
    //       p.items.map(d =>
    //         <li key={d}><button onClick={() => {
    //           p.setSelected(d);
    //           handleClick();
    //         }}>{d}</button></li>
    //       )
    //     }
    //   </ul>

    // </details>
    <div className='mt-5 w-full'>
      <Typography type='h3'>{p.title}</Typography>
      <label className="select w-full mt-1">
        {/* <span className="label">{p.title}</span> */}
        <select>
          {
            p.items.map(d =>
              <option selected={d == p.selected} key={d} onClick={() => {
                p.setSelected(d);
                handleClick();
              }}>{d}</option>
            )
          }
        </select>
      </label>
    </div>

  )
}

export default DropDown