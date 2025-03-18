const PasswordInput = ({
  id,
  placeholder = "",
  minLength = 0,
  maxLength = 30,
  required = false,
}: {
  id: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}) => {
  return (
    <input
      type="password"
      name="password"
      id={id}
      className="w-full rounded-md border-[.0625rem] border-gray-300 p-2"
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
    />
  );
};

export default PasswordInput;
