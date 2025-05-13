import { useTranslation } from 'react-i18next';

function Title() {
  const { t } = useTranslation();

  return (
    <div className="child-container">
      <h1>{t('NICOLE & ANSEL')}</h1>
      <p>{'#NICANS2025'}</p>
    </div>
  );
}

export default Title;
