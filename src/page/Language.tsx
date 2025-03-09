// import './App.css';
import { useTranslation } from 'react-i18next';

function Language() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <div>
        <h1>{t('Ansel & Nicole')}</h1>
        <p>{'#NICANS2025'}</p>

        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('zh')}>中文</button>
      </div>
    </>
  );
}

export default Language;
