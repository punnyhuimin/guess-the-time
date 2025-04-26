import { FC } from 'react';
import { Guess } from './types';
import { formatMsToString } from './utils';

interface GuessTableProps {
  guesses: Guess[];
}

const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left' as 'left',
  backgroundColor: '#f4f4f4',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left' as 'left',
};

const GuessTable: FC<GuessTableProps> = ({ guesses }) => {
  return (
    <div style={{ margin: '20px' }}>
      <h2>Guesses</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Guessed Time</th>
          </tr>
        </thead>
        <tbody>
          {guesses.map((guess, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{guess.name}</td>
              <td style={tableCellStyle}>
                {formatMsToString(guess.guessedTimeInMs)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuessTable;
