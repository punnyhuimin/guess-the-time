import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { getResults } from '../services/getResults';
import { WinnerResults } from '../types';
import { formatMsToString } from '../utils';
import { GuessTableAggrid } from '../components/GuessTableAggrid';

const Results: React.FC = () => {
  const [winnerResults, setWinnerResults] = useState<WinnerResults>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const results = await getResults();
        setWinnerResults(results);
      } catch (error) {
        console.error('Error fetching guesses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading || _.isNil(winnerResults)) return <div>Loading...</div>;

  if (!winnerResults || winnerResults.correct_answer === null) {
    return <div>Results not in yet!</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2>Results</h2>
      <p>Speech Length: {formatMsToString(winnerResults.correct_answer)}</p>
      <GuessTableAggrid
        guesses={winnerResults?.winners}
        isResultsTable={true}
      />
    </div>
  );
};

export default Results;
