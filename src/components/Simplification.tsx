import { useState } from 'react';

const Simplification = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className='select-area-container'>
      <label htmlFor='select' className='select-label'>
        Simplification Level
      </label>
      <select
        id='select'
        className='select'
        value={selectedOption}
        onChange={handleChange}
      >
        <option value='' disabled>
          Select Level
        </option>
        <option value='option1'>1</option>
        <option value='option2'>2</option>
        <option value='option3'>3</option>
      </select>
    </div>
  );
};
export default Simplification;
