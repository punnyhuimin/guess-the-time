import React, { useEffect, useState } from 'react';
import { getResults } from '../services/getResults';
import { Guess } from '../types';
import { formatMsToString } from '../utils';

const GuessTable: React.FC = () => {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const results = await getResults();
        setGuesses(results.guesses);
      } catch (error) {
        console.error('Error fetching guesses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ margin: '20px' }}>
      <h2>Guess Results</h2>
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

export default GuessTable;
