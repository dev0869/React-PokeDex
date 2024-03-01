import { Container, Sidebar } from "./components";
const App = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Container />
      </div>
    </>
  );
};

export default App;
