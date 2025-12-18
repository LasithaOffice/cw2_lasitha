import Typography from './Typography'

type Props = {
  title: string,
  error?: string,
  type: "date" | "datetime-local"
  text: string,
  mt?: number
  setText: (text: string) => void
}

const DateTimeInput = ({ mt = 0, ...p }: Props) => {
  return (
    <div className={`mt-${mt}`}>
      <Typography type='h3'>{p.title}</Typography>
      <input value={p.text} type={p.type} className="input mt-2" onChange={(d) => {
        const value = d.target.value;
        p.setText(value)
        console.log(value)
      }} />
      {
        p.error &&
        <p className="label text-red-400">{p.error}</p>
      }
    </div>
  )
}

export default DateTimeInput