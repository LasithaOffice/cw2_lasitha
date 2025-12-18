import React from 'react'
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
    <div className={`w-full mt-${p.mt}`}>
      <Typography type='h3'>{p.title}</Typography>
      <label className="select w-full mt-2">
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