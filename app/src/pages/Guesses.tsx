import React, { useEffect, useState } from 'react';
import GuessTable from '../GuessTable';
import { getGuesses } from '../services/getGuesses';
import { Guess } from '../types';

const Guesses: React.FC = () => {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const results = await getGuesses();
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

  return <GuessTable guesses={guesses} />;
};

export default Guesses;
