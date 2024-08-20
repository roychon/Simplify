import { ChangeEvent, useState } from 'react';
import Agreement from '../components/Agreement';
import Button from '../components/Button';
import HomePageTitle from '../components/HomePageTitle';
import Nav from '../components/Nav';
import TextArea from '../components/TextArea';
import { useNavigate } from 'react-router-dom';
import Simplification from '../components/Simplification';

const SimplifyText = () => {
  const navigate = useNavigate();

  const [text, setText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };

  return (
    <>
      <Nav></Nav>
      <div className='flex'>
        <HomePageTitle title='Simplify scientific texts.' />
        <div className='simplify-text-container'>
          <TextArea
            placeholder='Enter keywords'
            handleChange={handleChange}
            value={text}
          />
          <Simplification />
        </div>
        <Button
          text='Simplify Text'
          handleClick={() => navigate('/simplify-text')}
        />
        <Agreement title="By clicking 'Simplify', you agree to the terms of the service" />
      </div>
    </>
  );
};

export default SimplifyText;
