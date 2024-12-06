import withAuth from '../../hoc/withAuth';

const NewPoll = () => {
  return (
    <div className="container">
      <h1>Create a New Poll</h1>
      <p>Poll creation functionality coming soon.</p>
    </div>
  );
};

export default withAuth(NewPoll);
