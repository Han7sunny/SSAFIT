import logo from './logo.svg';
import './App.css';

function App() {

  const title = ['이름', '전공'];
  const name = ['lee', 'kim'];

  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          SSAFY<br/>
          {title[0]}<br/>
          {title[1]}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
