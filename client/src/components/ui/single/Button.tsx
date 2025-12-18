
type Props = {
  text: string,
  mt?: number,
  highlighted?: boolean,
  type?: "nutral" | "cancel"
  mb?: number,
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
  loading?: boolean
}

const Button = (p: Props) => {
  return (
    <button className={`btn ${p.type == 'cancel' ? 'btn-error' : p.type == 'nutral' ? 'btn-accent' : 'btn-primary'} ${p.highlighted ? 'btn-primary' : 'btn-soft'} mt-${p.mt} mb-${p.mb}`} onClick={p.onClick}>
      {
        p.loading &&
        <span className="loading loading-spinner"></span>
      }
      {p.text}
    </button>
  )
}

export default Button