import "./App.css";
import Layout from "./app/layout";
import TotalTaskPage from "./app/total-task/page";
import Menu from "./components/Menu";

function App() {
  return (
    <>
      <div className="flex gap-[20px]">
        <Menu />
        <Layout>
          <TotalTaskPage />
        </Layout>
      </div>
    </>
  );
}

export default App;
