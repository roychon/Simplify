import HomePageTitle from "../components/HomePageTitle"
import Button from "../components/button";

const Home = () => {
    return (
        <div>
            <HomePageTitle title="Simplify scientific texts." />
            <Button style={{border: '10px'}} text="Simplify text" className="small-btn" handleClick={() => console.log("test")}/>
            <Button style={{border: '10px'}}  text="Simplify file" className="large-btn"/>
        </div>
    )
}

export default Home;