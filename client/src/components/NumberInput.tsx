const NumberInput = ({
  id,
  name,
  placeholder = "",
  required = false,
  min = 0,
  max = 1000,
}: {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
}) => {
  return (
    <input
      type="number"
      name={name}
      id={id}
      className="w-full rounded-md border-[.0625rem] border-gray-300 p-2"
      placeholder={placeholder}
      min={min}
      max={max}
      required={required}
    />
  );
};

export default NumberInput;
