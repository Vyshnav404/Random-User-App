
import { CircularProgress } from '@material-ui/core';

const Spinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <CircularProgress />
    </div>
  );
};

export default Spinner;
