import { useState, useEffect } from 'react';
import { server_calls } from "../api/server";

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

interface AddSubscriberResponse {
  success?: boolean;
  error?: Record<string, string[]>;
}

const Newsletter: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    // Reset success state when the component mounts or email changes
    setSuccess(false);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
        // Make API request to add subscriber
        await server_calls.post('newsletter', false, { email });

        // Handle successful response
        setSuccess(true);
        setEmail(''); // Clear email input
    } catch (error) {
        // Handle error
        console.error('Failed to subscribe:', error);
        setError('Failed to subscribe. Please try again later.');
    } finally {
        setLoading(false);
    }
};


  return (
    <>
    <Container className="p-5 flex" component="main">
      <Typography variant="h6" className='text-primary-green font- font-bold'>Sign Up for Our Newsletter</Typography>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Please enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading || success} // Disable input while loading or after success
        />
        <button className='bg-primary-green text-white p-1 rounded' type="submit" disabled={loading || success}>Subscribe</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Consistent error handling */}
      {success && <p style={{ color: 'green' }}>Subscription Successful!</p>}
    </Container>
    </>
  );
};

export default Newsletter;
