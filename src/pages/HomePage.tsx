import Button from '../components/Button';
import HomePageTitle from '../components/HomePageTitle';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';
import Agreement from '../components/Agreement';

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Nav></Nav>
      <div className='flex'>
        <HomePageTitle title='Simplify scientific texts.' />
        <Button
          text='Simplify Text'
          handleClick={() => navigate('/simplify-text')}
        />
        <Button text='Simplify File' handleClick={() => console.log('test')} />
        <Agreement title="By clicking 'Simplify', you agree to the terms of the service" />
      </div>
    </>
  );
}

export default HomePage;
