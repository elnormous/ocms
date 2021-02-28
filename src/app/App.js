import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import "./App.scss"

export function App() {
    const [state, setState] = useState("Load");

    return <div className="App">
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/tables">Tables</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/">
                        <Home />
                    </Route>
                    <Route path="/tables">
                        <Tables />
                    </Route>
                </Switch>
            </div>
        </Router>

        <button onClick={() => setState("Loading")}>{state}</button>
    </div>;
}

function Home() {
    return <h2>Home</h2>;
}

function Tables() {
    return <h2>Tables</h2>;
}