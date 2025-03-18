const TextInput = ({
  id,
  name,
  placeholder = "",
  minLength = 0,
  maxLength = 255,
  required = false,
}: {
  id: string;
  name: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}) => {
  return (
    <input
      name={name}
      id={id}
      className="w-full rounded-md border-[.0625rem] border-gray-300 p-2"
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
    />
  );
};

export default TextInput;
