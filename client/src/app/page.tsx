import UserCreationForm from "@/ui/Forms/UserCreationForm";
import ExpenseReportCreationForm from "@/ui/ExpenseReport/ExpenseReportCreationForm";
import LoginForm from "@/ui/Forms/LoginForm";
import Table from "@/ui/Table/Table";
import ExpenseReport from "@/ui/ExpenseReport/ExpenseReport";

const Home = () => {
  const tableHeadContent = [
    "Author",
    "Title",
    "Type",
    "Amount (CLP)",
    "Date",
    "Details",
  ];
  const tableBodyContent = [
    [
      "Alice Johnson",
      "Understanding AI",
      "Book",
      "450.990.291",
      "2024-02-10",
      "A detailed study on AI",
    ],
    [
      "Bob Smith",
      "Deep Learning Basics",
      "Article",
      "120.50",
      "2023-11-25",
      "Introductory guide to deep learning",
    ],
    [
      "Charlie Brown",
      "Python for All",
      "Report",
      "15.75",
      "2023-06-14",
      "Comprehensive Python tutorial",
    ],
    [
      "Diana Prince",
      "History of Rome",
      "Whitepaper",
      "300.00",
      "2022-12-30",
      "An analysis of Roman history",
    ],
    [
      "Eleanor Rigby",
      "Cybersecurity 101",
      "Blog Post",
      "89.99",
      "2021-09-05",
      "Beginners guide to cybersecurity",
    ],
  ];
  const expenseReportData: ExpenseReportData[] = [
    {
      author: "Alice Johnson",
      date: "2024-02-10" as DateType,
      type: "Otros" as ExpenseType,
      amount: "450.990",
      status: "Pending" as ExpenseReportStatus,
      backupURL: "https://i.ytimg.com/vi/jAmz1gEAJVY/maxresdefault.jpg",
    },
    {
      author: "Alice Johnson",
      date: "2024-02-10" as DateType,
      type: "Otros" as ExpenseType,
      amount: "450.990",
      status: "Pending" as ExpenseReportStatus,
      backupURL: "https://i.ytimg.com/vi/jAmz1gEAJVY/maxresdefault.jpg",
    },
    {
      author: "Alice Johnson",
      date: "2024-02-10" as DateType,
      type: "Otros" as ExpenseType,
      amount: "450.990",
      status: "Closed" as ExpenseReportStatus,
      backupURL: "https://i.ytimg.com/vi/jAmz1gEAJVY/maxresdefault.jpg",
    },
    {
      author: "Alice Johnson",
      date: "2024-02-10" as DateType,
      type: "Otros" as ExpenseType,
      amount: "450.990",
      status: "Accepted" as ExpenseReportStatus,
      backupURL: "https://i.ytimg.com/vi/jAmz1gEAJVY/maxresdefault.jpg",
    },
    {
      author: "Alice Johnson",
      date: "2024-02-10" as DateType,
      type: "Otros" as ExpenseType,
      amount: "450.990",
      status: "Closed" as ExpenseReportStatus,
      backupURL: "https://i.ytimg.com/vi/jAmz1gEAJVY/maxresdefault.jpg",
    },
  ];

  return (
    <main className="flex flex-col">
      <div className="flex w-full flex-col gap-2">
        {expenseReportData.map((report, index) => (
          <ExpenseReport data={report} key={index} />
        ))}
      </div>
      <div className="w-[30rem]">
        <UserCreationForm />
      </div>
      <div className="w-[30rem]">
        <ExpenseReportCreationForm />
      </div>
      <div className="w-[30rem]">
        <LoginForm />
      </div>
      <div className="w-auto">
        <Table
          tableHeadContent={tableHeadContent}
          tableBodyContent={tableBodyContent}
        />
      </div>
    </main>
  );
};

export default Home;
