import { useRef, useState } from "react";

type Props = {
  setFile: (f: any) => void,
  img?: string
}

const ImageUploader = (p: Props) => {

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div onClick={() => fileInputRef.current?.click()}>
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="w-20 h-20 border-r-2 border-2 border-white mt-5"
        />
      )
        : p.img ?
          <img
            src={p.img}
            alt="preview"
            className="w-20 h-20 border-r-2 border-2 border-white mt-5"
          />
          :
          <div className="w-20 h-20 border-r-2 border-2 border-white mt-5"></div>
      }
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="mt-2"
        onChange={e => {
          const selected = e.target.files?.[0];
          if (!selected) return;
          p.setFile(selected);
          setPreview(URL.createObjectURL(selected));
        }}
      />
    </div>
  )
}

export default ImageUploader