const EmailInput = ({
  id,
  placeholder = "",
  required = false,
}: {
  id: string;
  placeholder?: string;
  required?: boolean;
}) => {
  return (
    <input
      type="email"
      name="email"
      id={id}
      className="w-full rounded-md border-[.0625rem] border-gray-300 p-2"
      placeholder={placeholder}
      required={required}
    />
  );
};

export default EmailInput;
