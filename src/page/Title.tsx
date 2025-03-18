import { useTranslation } from 'react-i18next';

function Title() {
  const { t } = useTranslation();

  return (
    <>
      <h1 style={{ marginBottom: '16px' }}>{t('NICOLE & ANSEL')}</h1>
      <p>{'#NICANS2025'}</p>
    </>
  );
}

export default Title;
