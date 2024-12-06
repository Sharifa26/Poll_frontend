import withAuth from '../../hoc/withAuth';

const PollsDashboard = () => {
  return (
    <div className="container">
      <h1>Polls Dashboard</h1>
      <p>Here, you can view and manage polls.</p>
    </div>
  );
};

export default withAuth(PollsDashboard);
