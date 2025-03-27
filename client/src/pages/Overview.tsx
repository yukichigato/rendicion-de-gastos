import { useEffect, useId, useState } from "react";
import Button from "../components/Button";
import Label from "../components/Label";
import Select from "../components/Select";
import NumberInput from "../components/NumberInput";
import TextInput from "../components/TextInput";
import ExpenseReport from "../components/ExpenseReport";
import { type Report } from "../types";

const Overview = () => {
  const IDs = {
    authorName: useId(),
    order: useId(),
    minAmount: useId(),
    maxAmount: useId(),
    type: useId(),
  };
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetch_reports = async () => {
      const response = await fetch(
        `http://localhost:8000/api/expense_report/`,
        {
          method: "GET",
        },
      );

      if (!response.ok) {
        console.error("An error fetching expense reports has just happened.");
        return;
      }

      const reports = await response.json();
      setReports(reports);
    };

    if (reports.length === 0) {
      fetch_reports();
    }
  });

  return (
    <main className="grid h-screen w-screen grid-cols-6 grid-rows-5 gap-4 bg-red-50 p-4">
      <aside className="col-span-2 row-span-5 mr-4 flex w-full flex-col rounded-3xl border-[.0625rem] border-gray-300 bg-white p-8 shadow-md shadow-gray-300">
        <h1 className="mb-18 text-4xl font-semibold text-rose-500">
          Filtros de búsqueda
        </h1>
        <form className="flex flex-col">
          <div className="mb-4 flex flex-col">
            <Label htmlFor={IDs.authorName} labelText="Nombre del autor" />
            <TextInput
              id={IDs.authorName}
              name="author"
              placeholder="Yukichi Takeda"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <Label htmlFor={IDs.order} labelText="Orden" />
            <Select
              id={IDs.order}
              name="order"
              options={["Más nuevo", "Más viejo"]}
            />
          </div>

          <div className="mb-4 flex flex-col">
            <Label htmlFor={IDs.minAmount} labelText="Monto mínimo" />
            <NumberInput
              id={IDs.minAmount}
              name="minAmount"
              placeholder="0 CLP"
              min={0}
              max={9999999}
            />
          </div>

          <div className="mb-4 flex flex-col">
            <Label htmlFor={IDs.maxAmount} labelText="Monto máximo" />
            <NumberInput
              id={IDs.maxAmount}
              name="maxAmount"
              placeholder="100000 CLP"
              min={0}
              max={9999999}
            />
          </div>

          <div className="mb-8 flex flex-col">
            <Label htmlFor={IDs.type} labelText="Tipo" />
            <Select
              id={IDs.type}
              name="type"
              options={[
                "Otros",
                "Materiales",
                "Social",
                "Estadías",
                "Necesidades",
                "Alimentación",
              ]}
            />
          </div>

          <Button buttonText="Aplicar" />
        </form>
      </aside>

      <section className="col-span-4 col-start-3 row-span-5 w-full rounded-3xl border-[.0625rem] border-gray-300 bg-white p-8 shadow-md shadow-gray-300">
        <header>
          <h1 className="mb-8 text-4xl font-semibold text-rose-500">
            Lista de rendiciones
          </h1>
          <p className="mb-12">
            Estas son las rendiciones actuales del sistema.
          </p>
        </header>
        <main className="flex flex-col gap-4">
          {reports.map((report) => (
            <article
              key={report.id}
              className="flex flex-col rounded-lg border-[.0625rem] border-gray-300 shadow-md"
            >
              <ExpenseReport
                status={report.status}
                author={report.name}
                date={report.created_at.slice(0, 10)}
                type={report.type}
                amount={report.amount}
                downloadurl={""}
              />
            </article>
          ))}
        </main>
      </section>
    </main>
  );
};

export default Overview;
