import { useTranslation } from 'react-i18next';

function Language() {
  const { i18n } = useTranslation();
  const changeLanguage = () => {
    const lang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <button
        style={{
          backgroundColor: 'transparent',
          color: 'var(--button-color)',
          fontSize: '16px',
          border: 'none',
        }}
        onClick={() => changeLanguage()}
      >
        {i18n.language === 'en' ? 'ENG' : '中文'}
      </button>
    </>
  );
}

export default Language;
