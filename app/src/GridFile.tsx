import './App.css';
import Language from './page/Language';
import Survey from './page/Survey';
import Title from './page/Title';

function GridFile() {
  return (
    <div className="container">
      <div
        style={{
          display: 'flex',
          paddingTop: '32px',
          justifyContent: 'flex-end',
        }}
      >
        <Language />
      </div>
      <div style={{ paddingTop: '32px' }}>
        <Title />
      </div>
      <div>
        <Survey />
      </div>
    </div>
  );
}

export default GridFile;
