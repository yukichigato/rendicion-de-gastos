import UserCreationForm from "@/ui/UserCreationForm";
import ExpenseReportCreationForm from "@/ui/ExpenseReportCreationForm";

const Home = () => {
  return (
    <>
      <main className="flex w-[30rem] flex-col">
        <UserCreationForm />
        <ExpenseReportCreationForm />
      </main>
    </>
  );
};

export default Home;
