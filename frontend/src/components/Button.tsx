interface Button {
  text: string;
  style?: React.CSSProperties;
  className?: string;
  handleClick: () => void;
}

function Button(props: Button) {
  return (
    <button
      style={props.style}
      className={props.className}
      onClick={props.handleClick}
    >
      {props.text}
    </button>
  );
}

export default Button;
