const Button = (props: { buttonText: string }) => {
  const { buttonText } = props;

  return (
    <button
      type="submit"
      className="w-full rounded-lg border-[.0625rem] bg-rose-500 p-4 font-semibold text-white transition-all duration-150 hover:cursor-pointer hover:border-rose-500 hover:bg-white hover:text-rose-500"
    >
      {buttonText}
    </button>
  );
};

export default Button;
