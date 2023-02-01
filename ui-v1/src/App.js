import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Header from './components/header/header';
import Search from './components/search/search';

function App() {
  return (
    <div className="App">
        <Header/>
        <Search/>
    </div>
  );
}

export default App;
