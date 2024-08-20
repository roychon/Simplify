function Simplification() {
  return (
    <div className='select-area-container'>
      <label htmlFor='select' className='select-label'>
        Simplification Level
      </label>
      <select id='select' className='select'>
        <option value='' disabled selected>
          Select Level
        </option>
        <option value='option1'>1</option>
        <option value='option2'>2</option>
        <option value='option3'>3</option>
      </select>
    </div>
  );
}

export default Simplification;
