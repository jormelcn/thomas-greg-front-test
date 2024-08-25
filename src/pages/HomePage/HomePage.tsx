import { useState } from "react";
import reactLogo from "src/assets/react.svg";
import viteLogo from "src/assets/vite.svg";
import style from "./HomePage.module.css";
import classes from "classnames";

export function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className={style.logo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className={classes(style.logo, style.react)}
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={style.card}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={style.readTheDocs}>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
