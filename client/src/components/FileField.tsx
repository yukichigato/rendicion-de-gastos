const FileField = (props: { id: string; name: string; required?: boolean }) => {
  const { id, name, required = false } = props;
  return (
    <>
      <input
        id={id}
        name={name}
        type="file"
        className="rounded-lg border-[.0625rem] border-gray-300 file:mr-6 file:border-none file:border-rose-500 file:bg-rose-500 file:p-4 file:text-sm file:text-white hover:cursor-pointer file:hover:border-rose-500 file:hover:bg-white file:hover:text-red-500 file:hover:transition-all file:hover:duration-150"
        required={required}
      />
      <p className="mt-1 ml-[.5rem] text-sm text-gray-500">
        SVG, PNG, JPG or GIF (MAX. 1mb).
      </p>
    </>
  );
};

export default FileField;
