import { ChangeEvent, useState } from 'react';
import Agreement from '../components/Agreement';
import Button from '../components/Button';
import HomePageTitle from '../components/HomePageTitle';
import Nav from '../components/Nav';
import TextArea from '../components/TextArea';
import { useNavigate } from 'react-router-dom';
import Simplification from '../components/FileSimplication';

const SimplifyText = () => {
  const MAX_KEYWORDS = 5;
  const navigate = useNavigate();

  const [keywordsText, setKeywordsText] = useState('');
  const [inputText, setInputText] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleKeywordsChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setKeywordsText(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setInputText(e.target.value);
  };

  const handleKeywordsKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent new line
      const trimmedKeyword = keywordsText.trim();
      if (trimmedKeyword) {
        if (keywords.includes(trimmedKeyword)) {
          setError('This keyword is already added.');
        } else if (keywords.length < MAX_KEYWORDS) {
          setKeywords([...keywords, trimmedKeyword]);
          setKeywordsText('');
          setError(null);
        } else {
          setError('You can only add up to 5 keywords.');
        }
      }
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  return (
    <>
      {/* <Nav /> */}
      <div className='flex'>
        <HomePageTitle title='Simplify scientific texts.' />
        <div className='simplify-text-container'>
          <TextArea
            placeholder='Enter keywords'
            handleChange={handleKeywordsChange}
            handleKeyPress={handleKeywordsKeyPress}
            value={keywordsText}
            title='Keywords to keep'
            className='textarea'
            id='keywords'
          />
          {error && <div className='error-message'>{error}</div>}
          {keywords.length > 0 && (
            <div className='keywords-container'>
              {keywords.map((keyword, index) => (
                <div
                  key={index}
                  className='keyword'
                  onMouseUp={() => removeKeyword(keyword)}
                >
                  {keyword}
                </div>
              ))}
            </div>
          )}
          <Simplification />
        </div>
        <TextArea
          placeholder='Enter text'
          handleChange={handleInputChange}
          value={inputText}
          title=''
          className='bigtextarea'
          id='bigkeyword'
        />
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
