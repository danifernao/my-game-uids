import Card from "./components/Card";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGamepad, faXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faGamepad, faXmark);

function App() {
  return <Card />;
}

export default App;
