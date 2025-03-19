// TODO : Fix types

const ExpenseReport = (props: {
  key: string;
  status: string;
  author: string;
  date: string;
  type: string;
  amount: number;
  downloadurl: string;
}) => {
  const { key, author, date, type, amount, downloadurl } = props;

  return (
    <article
      key={key}
      className="flex flex-col rounded-lg border-[.0625rem] border-gray-300 shadow-md"
    >
      <header className="bg-gray-800">
        <p className="pt-1 pr-2 pb-1 pl-2 text-lg text-white">
          <span className="font-bold">Status:</span> Accepted
        </p>
      </header>
      <main className="flex flex-col p-2">
        <div className="mb-4 flex gap-8">
          <p>
            <span className="font-bold">Autor:</span> {author}
          </p>
          <p>
            <span className="font-bold">Fecha:</span> {date}
          </p>
          <p>
            <span className="font-bold">Tipo:</span> {type}
          </p>
          <p>
            <span className="font-bold">Monto:</span> {amount} CLP
          </p>
        </div>
        <button className="w-fit rounded-lg border-[.0625rem] border-gray-800 bg-gray-800 p-2 text-white transition-all duration-150 hover:cursor-pointer hover:bg-white hover:text-gray-800">
          <a download={downloadurl}>Download</a>
        </button>
      </main>
    </article>
  );
};

export default ExpenseReport;
