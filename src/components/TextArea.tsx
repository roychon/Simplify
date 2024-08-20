import { ChangeEvent, useState } from 'react';

interface TextArea {
  placeholder: string;
  value: string;
  style?: React.CSSProperties;
  className?: string;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea(props: TextArea) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={`textarea-container ${isFocused ? 'focused' : ''}`}>
      <label htmlFor='keywords' className='label'>
        Keywords to keep
      </label>
      <textarea
        className='textarea'
        placeholder={props.placeholder}
        id='keywords'
        onChange={props.handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={props.value}
      ></textarea>
    </div>
  );
}

export default TextArea;
