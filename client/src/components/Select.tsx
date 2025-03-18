const Select = ({
  id,
  name,
  options = ["-"],
}: {
  id: string;
  name: string;
  options: string[];
}) => {
  return (
    <select
      id={id}
      name={name}
      className="rounded-lg border-[.0625rem] border-gray-300 p-2 transition-all duration-100 hover:cursor-pointer hover:bg-gray-100"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
