import { useState } from 'react'
import type { ScanRequest } from '../../interfaces/ScanRequest'

const ScanImageList = ({ sr }: { sr: ScanRequest }) => {

  const [selected, setSelected] = useState("");

  return (
    <dialog id="scan_images_model" className="modal">
      <div className="modal-box w-max min-w-max">
        <img className='w-full h-full' src={selected} />
        <div className='flex gap-2 overflow-x-auto whitespace-nowrap w-11/12 mt-5'>
          {
            sr.scanImages.map(s =>
              <img onClick={() => {
                setSelected(s);
              }} width={100} src={s} className="shrink-0 rounded cursor-pointer"
              />
            )
          }
        </div>
        <form method="dialog" className="modal-action">
          <button className="btn">Close</button>
        </form>
      </div>
    </dialog>

  )
}

export default ScanImageList