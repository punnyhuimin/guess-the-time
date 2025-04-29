import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import GuessTable from '../components/GuessTable';
import { getResults } from '../services/getResults';
import { WinnerResults } from '../types';
import { formatMsToString } from '../utils';

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
    <div>
      <h2>Results</h2>
      <h3>Speech Length: {formatMsToString(winnerResults.correct_answer)}</h3>
      <GuessTable guesses={winnerResults?.winners} isResultsTable={true} />
    </div>
  );
};

export default Results;
