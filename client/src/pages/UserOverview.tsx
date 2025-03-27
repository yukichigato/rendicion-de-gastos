import { FormEvent, useEffect, useId, useState } from "react";
import { useUser } from "../hooks/useUser";
import Button from "../components/Button";
import Label from "../components/Label";
import Select from "../components/Select";
import NumberInput from "../components/NumberInput";
import ExpenseReport from "../components/ExpenseReport";
import FileField from "../components/FileField";
import queryString from "query-string";
import { type UserContextType } from "../context/UserContext";
import { type User } from "../types";
import { type Report } from "../types";

const UserOverview = () => {
  const IDs = {
    amount: useId(),
    type: useId(),
    file: useId(),
  };
  const { user = {} as User } = useUser() as UserContextType;
  const [reports, setReports] = useState<Report[]>([]);

  const uploadReport = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Creating the form, appending author_id and file_name
    const formData = new FormData(event.target as HTMLFormElement);
    const fileInput = document.getElementById(IDs.file) as HTMLInputElement;

    if (fileInput && fileInput.files?.length) {
      formData.append("file_name", fileInput.files[0].name);
      formData.append("author_id", user.id);
    } else {
      console.error(
        "There's no files to upload, please add a file and try again.",
      );
      return;
    }

    const response = await fetch("http://localhost:8000/api/expense_report", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Unable to create expense report.");
      return;
    }

    window.location.reload();
  };

  useEffect(() => {
    const fetch_reports = async () => {
      const queryURL = queryString.stringify({
        author_id: user.id,
      });

      const response = await fetch(
        `http://localhost:8000/api/expense_report/?${queryURL}`,
        {
          method: "GET",
        },
      );

      if (!response.ok) {
        console.error(
          "An error fetching your expense reports has just happened.",
        );
        return;
      }

      const reports = await response.json();
      setReports(reports);
    };

    if (reports.length === 0) {
      fetch_reports();
    }
  }, [user.id, reports.length]);

  return (
    <main className="grid h-screen w-screen grid-cols-6 grid-rows-5 gap-4 bg-red-50 p-4">
      <aside className="col-span-2 row-span-5 mr-4 flex w-full flex-col rounded-3xl border-[.0625rem] border-gray-300 bg-white p-8 shadow-md shadow-gray-300">
        <h1 className="mb-8 text-4xl font-semibold text-rose-500">
          Formulario de solicitud de rendición de gastos
        </h1>
        <p className="mb-12">
          <span className="text-rose-500">*</span> Por favor rellene todos los
          campos requeridos.
        </p>

        <form
          onSubmit={uploadReport}
          className="flex flex-col"
          encType="multipart/form-data"
        >
          <div className="mb-4 flex flex-col">
            <Label htmlFor={IDs.type} labelText="Tipo" required />
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

          <div className="mb-4 flex flex-col">
            <Label htmlFor={IDs.amount} labelText="Monto" required />
            <NumberInput
              id={IDs.amount}
              name="amount"
              placeholder="100000 CLP"
              min={0}
              max={9999999}
              required
            />
          </div>

          <div className="mb-8 flex flex-col">
            <Label htmlFor={IDs.file} labelText="File" required />
            <FileField id={IDs.file} name="file" required />
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

export default UserOverview;
