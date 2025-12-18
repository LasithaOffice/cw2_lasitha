import Typography from "./Typography"

type Props = {
  columns: string[],
  data: string[][],
  allData: any[],
  mt?: number,
  setValue?: (v: any) => void
}

const Table = ({ columns, data, mt, setValue, allData }: Props) => {
  return (
    <div className={`overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-${mt}`}>
      <table className="table">
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
              <tr className={`cursor-pointer hover:bg-base-200 ${(allData[index].isActive) ? 'bg-transparent' : 'bg-red-950'}`} onClick={() => {
                if (setValue) {
                  setValue(allData[index])
                }
              }}>
                <th>{index + 1}</th>
                {
                  d.map(c =>
                    (c + "").startsWith("http") ?
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
      {
        data.length == 0 &&
        <div className="flex p-5 justify-center items-center w-full">
          <Typography>No reocrds found</Typography>
        </div>
      }
    </div>
  )
}

export default Table