import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const UserCard = ({ user, onDelete }) => {
    return(
        <Card>
        <CardMedia
          style={{ height: 0, paddingTop: '56.25%' }}
          image={user.picture.large}
          title={`${user.name.first} ${user.name.last}`}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {`${user.name.first} ${user.name.last}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`${user.location.city}, ${user.location.state}, ${user.location.country}`}
          </Typography>
        </CardContent>
        <IconButton aria-label="delete" onClick={() => onDelete(user)}>
          <Delete />
        </IconButton>
      </Card>
    )
 
    };

UserCard.propTypes = {
  user: PropTypes.shape({
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
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserCard;
