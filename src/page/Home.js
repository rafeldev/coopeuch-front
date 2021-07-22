import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

/* Router */
import { useHistory } from 'react-router';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, loadUsers } from '../services';
import EditUser from './EditUser';
import AddUser from './AddUser';

/* Estilos de Material UI */
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    marginTop: 100,
    minWidth: 900,
  },
});

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

const Home = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /* History */
  const history = useHistory()

  /* Estilos de material UI */
  const classes = useStyles();
  const buttonStyles = useStylesButton();

  /* Conexion con redux */
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.data);

  /* Dispara la accion de cargar los usuarios al cargar el Home */
  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  /* Esta funcion valida si estas seguro de que seas borrar un usuario y realiza el dispatch */
  const handleDeleteUser = (id) => {
    if (window.confirm('estas seguro que deseas eliminar este usuario?')) {
      dispatch(deleteUser(id));
    }
  };

  const openEditModalToggle = () => {
    setShowEditModal(!showEditModal)
  }
  const openAddModalToggle = () => {
    setShowAddModal(!showAddModal)
  }
  const openDeleteModalToggle = () => {
    setShowDeleteModal(!showDeleteModal)
  }
  return (
    <div>
      <div className={buttonStyles.root}>
        <h1>Prueba Tecnica Coopeuch</h1>
        <Button color="primary" variant="contained" onClick={() => setShowAddModal(true)}> 
          Añadir usuario
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell align="center">Correo electronico</StyledTableCell>
              <StyledTableCell align="center">Contacto</StyledTableCell>
              <StyledTableCell align="center">Dirección</StyledTableCell>
              <StyledTableCell align="center">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">{user.contact}</StyledTableCell>
                <StyledTableCell align="center">{user.address}</StyledTableCell>
                <StyledTableCell align="center">
                  <div className={buttonStyles.root}>
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                      <Button
                        style={{ marginRight: '10px' }}
                        color="secondary"
                        onClick={() => handleDeleteUser(user.id)}
                      >Eliminar</Button>
                      <Button color="primary" onClick={() => history.push(`/editUser/${user.id}`)}>Editar</Button>
                    </ButtonGroup>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showEditModal && <EditUser onClose={openEditModalToggle} />}
      {showAddModal && <AddUser setShowAddModal={setShowAddModal} onClose={openAddModalToggle} />}
    </div>

  );
};

export default Home;
