import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import HomePageTitle from "../components/HomePageTitle";

const Home = () => {
    const navigate = useNavigate() // navigate is a FUNCTION. useNavigate return type is a function
    return (
        <>
            <HomePageTitle title="Title"/>
            <div className="flex">
                <Button text="Simplify Text" handleClick={() => navigate("/simplify-text")}/>
                <Button text="Simplify File" handleClick={() => navigate("/simplify-file")}/>
            </div>
        </>  
    );
}

export default Home;