import  { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import Dexie from 'dexie';
import UserList from './components/UserList';
import Spinner from './components/Spinner';

const db = new Dexie('RandomUserDatabase');

db.version(1).stores({
  users: 'id',
});

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}));

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const classes = useStyles();

  const getUsers = async () => {
    const response = await fetch('https://randomuser.me/api/?results=50');
    const data = await response.json();
    const newUsers = data.results.map((user) => ({
      id: uuidv4(),
      ...user,
    }));
    setUsers(newUsers);
    setTotal(newUsers.length);
    setLoading(false);
    db.users.bulkPut(newUsers);
  };

  const deleteUser = async (userToDelete) => {
      console.log("user  ====",userToDelete.login.uuid);
    await db.users.delete(userToDelete.login.uuid).then((res)=>{
      console.log("user deleted ",res);
      setUsers(users.filter((user) => user.id !== userToDelete.id));
    setTotal(total - 1);
    });
    
  };

  const refreshUsers = () => {
    setLoading(true);
    getUsers();
  };

  useEffect(() => {
    db.users.toArray().then((data) => {
      if (data.length === 0) {
        getUsers();
      } else {
        setUsers(data);
        setTotal(data.length);
        setLoading(false);
      }
    });
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" align="center" className={classes.header}>
        Random User Generator
      </Typography>
      <Button variant="contained" color="primary" onClick={refreshUsers} className={classes.button}>
        Refresh
      </Button>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <Typography variant="h5" component="h2">
            {total} Users
          </Typography>
          <UserList users={users} onDelete={deleteUser} />
        </div>
      )}
    </Container>
  );
};

export default App;
