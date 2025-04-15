import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { LanguageContext } from '../context/LanguageContext';

const NotFound = () => {
  const { language } = useContext(LanguageContext);

  const translations = {
    notFound: {
      en: 'Page Not Found',
      hi: 'पेज नहीं मिला',
      mr: 'पृष्ठ सापडले नाही',
      te: 'పేజీ కనబడలేదు',
    },
    message: {
      en: 'The page you are looking for does not exist or has been moved.',
      hi: 'आप जिस पेज की तलाश कर रहे हैं, वह मौजूद नहीं है या स्थानांतरित कर दिया गया है।',
      mr: 'आपण शोधत असलेले पृष्ठ अस्तित्वात नाही किंवा हलवले गेले आहे.',
      te: 'మీరు వెతుకుతున్న పేజీ లేదు లేదా తరలించబడింది.',
    },
    goHome: {
      en: 'Go Back Home',
      hi: 'होम पेज पर वापस जाएं',
      mr: 'होमपेजवर परत जा',
      te: 'హోమ్‌కి తిరిగి వెళ్ళండి',
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <h2 className="text-2xl font-medium text-gray-700 mb-4">
        {translations.notFound[language]}
      </h2>
      <p className="text-gray-600 max-w-md mb-8">
        {translations.message[language]}
      </p>
      <Link to="/">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
          {translations.goHome[language]}
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;