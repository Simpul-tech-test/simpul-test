import Sidebar from './component/Sidebar';
import Navbar from './component/Navbar';
import Main from './component/Main';

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <Main />
      </div>
    </div>
  );
}

export default App;
