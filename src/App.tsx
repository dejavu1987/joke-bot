import { useState } from 'react';
import reactLogo from '/react.svg';
import viteLogo from '/vite.svg';
import tailWindLogo from '/tailwind.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-10">
      <div className="flex">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://tailwindcss.com" target="_blank">
          <img src={tailWindLogo} className="w-12 h-8" alt="Tailwind logo" />
        </a>
      </div>
      <h1>Vite + React + Tailwind</h1>
      <div className="card py-10">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
