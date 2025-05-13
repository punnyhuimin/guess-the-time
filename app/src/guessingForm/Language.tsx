import LanguageIcon from '@mui/icons-material/Language';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

function Language() {
  const { i18n } = useTranslation();
  const changeLanguage = () => {
    const lang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(lang);
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        variant="text"
        startIcon={<LanguageIcon />}
        onClick={changeLanguage}
        sx={{ color: 'var(--button-color)', fontSize: '16px' }}
      >
        {i18n.language === 'en' ? 'ENG' : '中文'}
      </Button>
    </div>
  );
}

export default Language;
