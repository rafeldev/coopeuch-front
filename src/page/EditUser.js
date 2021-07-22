import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, updateUser } from '../services';

/* CSS */
import '../styles/EditUser.css';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}));

const EditUser = ({ onClose }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [addUser, setAddUser] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });
  const [error, setError] = useState("");

  const { id } = useParams();
  const { name, email, contact, address } = addUser;
  const { user } = useSelector(state => state.data);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddUser({ ...addUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !contact || !email) {
      setError("Porfavor llena todos los inputs");
    } else {
      dispatch(updateUser(addUser, id));
      history.push("/");
      setError("");
    }
  };

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, []);

  useEffect(() => {
    if (user) {
      setAddUser({ ...user });
    }
  }, [user]);



  return ReactDOM.createPortal(
    <div className='Background'>
      <div className='ModalWrapper' onClose={onClose}>
        <h2>Editar usuario</h2>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="name"
            name="name"
            label="Nombre"
            value={name || ""}
            type="text"
            onChange={handleInputChange}
          />
          <br />
          <TextField
            id="email"
            name="email"
            label="Correo electronico"
            value={email || ""}
            type="email"
            onChange={handleInputChange}
          />
          <br />
          <TextField
            id="contact"
            name="contact"
            label="Contact"
            value={contact || ""}
            type="text"
            onChange={handleInputChange}
          />
          <br />
          <TextField
            id="address"
            name="address"
            label="Dirección"
            value={address || ""}
            type="text"
            onChange={handleInputChange}
          />
          <br />
          <div className="Button__Container">
            <Button
              style={{ width: "100%", marginBottom: "10px" }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Actualizar
            </Button>
            <Button
              style={{ width: "100%" }}
              color="secondary"
              variant="contained"
              onClick={() => history.push('/')}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default EditUser;
