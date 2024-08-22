import { ChangeEvent, useState } from 'react';

interface TextArea {
  placeholder: string;
  title?: string;
  value: string;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyPress?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

function TextArea(props: TextArea) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={`textarea-container ${isFocused ? 'focused' : ''}`}>
      <label htmlFor={props.id} className='label'>
        {props.title}
      </label>
      <textarea
        className={props.className}
        placeholder={props.placeholder}
        id={props.id}
        onChange={props.handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={props.handleKeyPress}
        value={props.value}
      ></textarea>
    </div>
  );
}

export default TextArea;
