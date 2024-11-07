import { useState, useEffect } from 'react';
import { initDB } from '../db';

export function useDB() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    initDB()
      .then(() => setIsReady(true))
      .catch(err => setError(err));
  }, []);

  return { isReady, error };
}