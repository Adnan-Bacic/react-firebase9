import './App.css';
import AddBook from './components/AddBook';
import Auth from './components/Auth';
import Books from './components/Books';
import BooksRealtime from './components/BooksRealtime';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='container-auth'>
          <Auth></Auth>
        </div>
        <div className='container-books'>
          <AddBook></AddBook>
          <Books></Books>
          <BooksRealtime></BooksRealtime>
        </div>
      </header>
    </div>
  );
}

export default App;
