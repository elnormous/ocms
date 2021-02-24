import React, { useState } from "react";
import { render } from "react-dom";
import "./style.scss"

function App() {
    const [state, setState] = useState("Load");

    return <button onClick={() => setState("Loading")}>{state}</button>;
}

render(<App />, document.getElementById("root"));
