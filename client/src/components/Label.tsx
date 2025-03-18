const Label = ({
  htmlFor,
  labelText,
  required = false,
}: {
  htmlFor: string;
  labelText: string;
  required?: boolean;
}) => {
  return (
    <label htmlFor={htmlFor} className="mb-1 ml-2">
      {labelText} {required ? <span className="text-rose-500">*</span> : <></>}
    </label>
  );
};

export default Label;
