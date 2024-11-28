import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p>{count}</p>
    </div>
  );
}

export default App;
