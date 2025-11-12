import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Outlet />
    </div>
  );
}

export default App;
