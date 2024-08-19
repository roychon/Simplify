interface Button {
    text: string,
    style?: React.CSSProperties,
    className?: string // big-btn or small-btn classname
    handleClick?: () => void; 
    // TODO: add a callback function, 'handleClick'
}

const Button = (props: Button) => {
    return ( 
        <button style={props.style} className={props.className} onClick={props.handleClick}>{props.text}</button>
    );
}
 
export default Button;