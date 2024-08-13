import './App.css';
import PostHome from './components/PostHome';

function App() {
  return (
    <>
      <div className="main">
        <div className="container">
          <h1 className="title">React cloudinary upload widget</h1>
        </div>
      </div>
      
      <div className="container">
        <PostHome />
      </div>
    </>
  );
}

export default App;
