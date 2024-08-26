import { ChangeEvent } from 'react';

interface Simplification {
  text?: string;
  style?: React.CSSProperties;
  className?: string;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedOption: string;
}

const Simplification = (props: Simplification) => {
  return (
    <div className='select-area-container'>
      <label htmlFor='select' className='select-label'>
        Simplification Level
      </label>
      <select
        id='select'
        className={props.className}
        value={props.selectedOption}
        onChange={props.handleChange}
      >
        <option value='' disabled>
          Select Level
        </option>
        <option value='6'>1</option>
        <option value='12'>2</option>
        <option value='25'>3</option>
      </select>
    </div>
  );
};
export default Simplification;
