
type Props = {
  columns: string[],
  data: string[][],
  mt?: number,
  setValue?: (v: any) => void
}

const Table = ({ columns, data, mt, setValue }: Props) => {
  return (
    <div className={`overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-${mt}`}>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            {
              columns.map(c =>
                <th>{c}</th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((d, index) =>
              <tr className='cursor-pointer hover:bg-base-200' onClick={() => {
                if (setValue) {
                  setValue(d)
                }
              }}>
                <th>{index + 1}</th>
                {
                  d.map(c =>
                    c.startsWith("http") ?
                      <td>
                        <img className='w-10 h-10 object-cover rounded-full' src={c} />
                      </td>
                      :
                      <td>{c}</td>
                  )
                }
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table