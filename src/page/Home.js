import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
/* List */
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ForumIcon from '@material-ui/icons/Forum';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import NoteIcon from '@material-ui/icons/Note';
import DeleteIcon from '@material-ui/icons/Delete';

/* Estilos */
import '../styles/Home.css'


/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, loadTasks } from '../services';
import { openTask } from '../redux/actions'

/* Components */
import EditTask from './EditTask';
import AddTask from './AddTask';
import { useHistory } from 'react-router-dom';


const useStylesButton = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const useStylesList = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    width: '50%',
    backgroundColor: 'white',
    boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.05)',
    borderRadius: '4px',
    padding: '5px 0',
  },
  selected: {
    color: 'red',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));


const Home = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const history = useHistory()

  /* estilos */
  const buttonStyles = useStylesButton();
  const classeslist = useStylesList();

  /* Conexion con redux */
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.data);

  /* Dispara la accion de cargar los usuarios al cargar el Home */
  useEffect(() => {
    dispatch(loadTasks());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Esta funcion valida si estas seguro de que seas borrar un usuario y realiza el dispatch */
  const handleDeleteUser = (id) => {
    if (window.confirm('estas seguro que deseas eliminar este usuario?')) {
      dispatch(deleteTask(id));
    }
  };

  const openEditModalToggle = () => {
    setShowEditModal(!showEditModal);
  };
  const openAddModalToggle = () => {
    setShowAddModal(!showAddModal);
  };

  const handleClick = (task) => (
    dispatch(openTask(task.id))
  );

  return (
    <div>
      <div className={buttonStyles.root}>
        <h1>Prueba Tecnica Coopeuch</h1>
        <Button color="primary" variant="contained" onClick={() => setShowAddModal(true)}>
          A??adir Tarea
        </Button>
      </div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Tareas
          </ListSubheader>
        }
        className={classeslist.root}
      >
        {
          tasks && tasks.map((task) => {
            return <>
              <ListItem button onClick={() => handleClick(task)}>
                <ListItemIcon>
                  <NoteIcon />
                </ListItemIcon>
                <ListItemText >{task.name}</ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUser(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                <ListItemSecondaryAction style={{marginRight: '60px'}}>
                  <IconButton edge="end" aria-label="delete" onClick={() => history.push(`/editTask/${task.id}`)}>
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse in={task.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classeslist.nested}>
                    <ListItemIcon>
                      <ForumIcon />
                    </ListItemIcon>
                    <ListItemText>{task.description}</ListItemText>
                  </ListItem>
                </List>
              </Collapse>
            </>;
          })
        }
      </List>
      {showEditModal && <EditTask onClose={openEditModalToggle} />}
      {showAddModal && <AddTask setShowAddModal={setShowAddModal} onClose={openAddModalToggle} />}
    </div>

  );
};

export default Home;
