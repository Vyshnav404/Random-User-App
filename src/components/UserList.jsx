import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import UserCard from './UserCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const UserList = ({ users, onDelete }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center">
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.login.uuid}>
            <UserCard user={user} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      login: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
      name: PropTypes.shape({
        first: PropTypes.string.isRequired,
        last: PropTypes.string.isRequired,
      }).isRequired,
      email: PropTypes.string.isRequired,
      location: PropTypes.shape({
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
      }).isRequired,
      picture: PropTypes.shape({
        large: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserList;
