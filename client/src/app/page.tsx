import UserCreationForm from "@/ui/UserCreationForm";
import ExpenseReportCreationForm from "@/ui/ExpenseReportCreationForm";
import LoginForm from "@/ui/LoginForm";

const Home = () => {
  return (
    <>
      <main className="flex w-[30rem] flex-col">
        <UserCreationForm />
        <ExpenseReportCreationForm />
        <LoginForm />
      </main>
    </>
  );
};

export default Home;
