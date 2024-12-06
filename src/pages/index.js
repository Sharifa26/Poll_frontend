import React from 'react';

const Home = () => {
  return (
    <div className="container text-center">
      <h1>Welcome to the Polling App</h1>
      <p className="mt-4">
        Create polls, participate in exciting surveys, and view results in real-time.
      </p>
      <div className="mt-4">
        <a href="/register" className="btn btn-primary">Register</a>
        <a href="/login" className="btn btn-secondary ml-4">Login</a>
      </div>
    </div>
  );
};

export default Home;
