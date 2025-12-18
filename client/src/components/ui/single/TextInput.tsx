import React from 'react'
import Typography from './Typography'

type Props = {
  title: string,
  error?: string,
  placeHolder: string,
  type: React.HTMLInputTypeAttribute | undefined
  text: string,
  mt?: number
  setText: (text: string) => void
}

const TextInput = ({ mt = 0, ...p }: Props) => {
  return (
    <div className={`mt-${mt}`}>
      <Typography type='h3'>{p.title}</Typography>
      <input type={p.type} className="input mt-2 w-full" placeholder={p.placeHolder} value={p.text} onChange={(e) => p.setText(e.target.value)} />
      {
        p.error &&
        <p className="label text-red-400">{p.error}</p>
      }
    </div>
  )
}

export default TextInput