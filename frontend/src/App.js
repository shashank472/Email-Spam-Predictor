import logo from './logo.svg';
import './App.css';
import PostForm from './Component/PostForm';
import Header from './Component/Header';
import Display from './Component/Display';

function App() {
  return (
    <div className="App">
      <Header />
      <PostForm />
      <Display />
    </div>
  );
}

export default App;
