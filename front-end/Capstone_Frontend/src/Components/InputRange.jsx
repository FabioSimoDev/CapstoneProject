import { useState } from "react";

export default function InputRange({ min, max, defValue, onChange }) {
  const [value, setValue] = useState(() => defValue);
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e);
  };
  return (
    <>
      {" "}
      <input
        type="range"
        min={min}
        max={max}
        defaultValue={defValue}
        onChange={handleChange}
        className="appearence-none bg-transparent cursor-pointer focus:outline-none w-full"
      />
      <span>{value}</span>
    </>
  );
}
