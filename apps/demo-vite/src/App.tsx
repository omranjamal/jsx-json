import { data } from "./data.tsx";

function App() {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default App;
