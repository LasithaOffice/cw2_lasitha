type Props = {
  type?: "h1" | "h2" | "h3" | "h4",
  children: string,
  mt?: number,
  mb?: number,
  color?: "error" | "gray"
}

const Typography = ({ type = 'h4', ...p }: Props) => {
  return (
    <p className={`text-${type == 'h1' ? '3xl' : type == 'h2' ? '2xl'
      : type == 'h3' ? 'xl' : 'sm'} mt-${p.mt} mb-${p.mb} 
      ${(p.color == 'error') ? 'text-red-500' : (p.color == 'gray') ? 'text-gray-500' : 'text-white'}`}>{p.children}</p>
  )
}

export default Typography