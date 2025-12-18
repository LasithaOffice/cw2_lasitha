import Typography from './Typography'

type Props = {
  text: string,
  onClick: () => void,
  mt?: number,
  selected?: boolean
}

const BigButton = (p: Props) => {
  return (
    <button onClick={p.onClick} className={`w-full h-36
        flex justify-center items-center mt-${p.mt}
         rounded-2xl hover:bg-base-300 hover:cursor-pointer ${p.selected ? 'bg-base-300' : 'bg-base-200'}`}>
      <Typography type="h2">{p.text}</Typography>
    </button>
  )
}

export default BigButton