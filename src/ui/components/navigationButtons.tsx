import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NavigationButtons = () => {
  const navigate = useNavigate();


  const handlePrevious = () => {
      navigate(-1);
  };

  const handleNext = () => {
      navigate(1); // Go forward to the next page in history
  };

  return (
    <div className='flex'>
      <button onClick={handlePrevious}>
        <ChevronLeft />
      </button>
      <button onClick={handleNext}>
        <ChevronRight />
      </button>
    </div>
  );
}

export default NavigationButtons;