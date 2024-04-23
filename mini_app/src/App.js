import logo from './logo.svg';
import './App.css';
import { Sidebar } from './component/Sidebar';
import { Main } from './component/Main';
import { AllRoutes } from './Routes/AllRoutes';



function App() {

  return (
    <div className='main'>
      
      {/* <div>
        <Sidebar />
      </div> */}

      {/* <div>
        <Main userData={userData} />
      </div> */}

      <AllRoutes />
    </div>
  );
}

export default App;
