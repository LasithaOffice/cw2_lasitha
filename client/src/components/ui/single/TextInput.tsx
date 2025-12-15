import React from 'react'

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
    <fieldset className={`fieldset mt-${mt}`}>
      <legend className="fieldset-legend">{p.title}</legend>
      <input type={p.type} className="input mt-1" placeholder={p.placeHolder} value={p.text} onChange={(e) => p.setText(e.target.value)} />
      {
        p.error &&
        <p className="label text-red-400">{p.error}</p>
      }
    </fieldset>
  )
}

export default TextInput