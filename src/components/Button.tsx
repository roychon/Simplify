interface Button {
    text: string,
    style?: React.CSSProperties, // ? is optional; they don't need to pass this 
    className?: string,
    handleClick: () => void; // handleClick is fn that returns nothing
}

const Button = (props: Button) => {
    return <button style={props.style} className={props.className} onClick={props.handleClick}>{props.text}</button>;
}

export default Button;