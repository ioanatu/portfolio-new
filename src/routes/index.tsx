import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

export const TestCredlyBadges = () => {
  const [badges, setBadges] = useState<unknown>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(import.meta.env.VITE_CREDLY_API_URL, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Request failed');
        return response.json();
      })
      .then(setBadges)
      .catch(() => setError(true));
  }, []);

  if (error) return <p>Could not load badges.</p>;
  if (!badges) return <p>Loading badges...</p>;

  return (
    <main id="top">
      <pre>{JSON.stringify(badges, null, 2)}</pre>
    </main>
  );
};

export const Route = createFileRoute('/')({
  component: TestCredlyBadges,
});
