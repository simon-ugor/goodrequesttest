import { useState } from 'react';

//Images
import DogImage from "./images/dogImage.png";

import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import ThirdPage from './pages/ThirdPage';
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  
  const continueButton = (pageNumber:number) => {
    if (pageNumber == 1) {
      setPage(<SecondPage continueClick={continueButton} backClick={backClick} />);
    } else if (pageNumber == 2) {
      setPage(<ThirdPage backClick={backClick} />);
    }
  }

  const backClick = (pageNumber:number) => {
    if (pageNumber == 3) {
      setPage(<SecondPage continueClick={continueButton} backClick={backClick} />);
    } else if (pageNumber == 2) {
      setPage(<FirstPage continueClick={continueButton} />);
    }
  }

  const [page, setPage] = useState(<FirstPage continueClick={continueButton} />);

  return (
    <div className='grid grid-rows-3 max-w-screen h-screen bg-white'>

      <Header />

      <div className='h-full w-full grid grid-cols-4'>
        <div></div>
          <div className="border-b-2">
            {page}
          </div>
        <div className="pl-10 flex justify-center items-center border-b-2">
          <img src={DogImage} alt='Dog Image' />
        </div>
        <div></div>
      </div>

      <Footer />

    </div>
  );
}

export default App;