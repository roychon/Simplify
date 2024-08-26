import { ChangeEvent, useState } from 'react';
import Agreement from '../components/Agreement';
import Button from '../components/Button';
import HomePageTitle from '../components/HomePageTitle';
import TextArea from '../components/TextArea';
import Simplification from '../components/Simplification';
import axios from '../helpers/axios';

const SimplifyText = () => {
  const MAX_KEYWORDS = 5;

  const [selectedOption, setSelectedOption] = useState('');
  const [keywordsText, setKeywordsText] = useState('');
  const [inputText, setInputText] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSimplified, setIsSimplified] = useState<boolean>(false);
  const [data, setData] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSimplificationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

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
      e.preventDefault();
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

  const handleSimplifyClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/simplify-text', {
        text: inputText,
        keywords,
        simplificationAge: selectedOption,
      });
      setData(response.data);
      setIsSimplified(true);
    } catch {
      setError('An error occurred while simplifying the text.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className='loading-page'>
          <div className='loading-indicator'>Loading...</div>
        </div>
      ) : (
        <>
          {!isSimplified ? (
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
                <Simplification
                  className='select'
                  selectedOption={selectedOption}
                  handleChange={handleSimplificationChange}
                />
              </div>
              <TextArea
                placeholder='Enter text'
                handleChange={handleInputChange}
                value={inputText}
                title=''
                className='bigtextarea'
                id='bigkeyword'
              />
              <Button text='Simplify Text' handleClick={handleSimplifyClick} />
              <Agreement title="By clicking 'Simplify', you agree to the terms of the service" />
            </div>
          ) : (
            <div className='is-simplfied-text-container'>
              <div className='simplified-text'>{data}</div>
              <Button
                text='Previous'
                handleClick={() => {
                  setIsSimplified(false);
                  setInputText('');
                  setKeywordsText('');
                  setKeywords([]);
                  setSelectedOption('');
                }}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SimplifyText;
