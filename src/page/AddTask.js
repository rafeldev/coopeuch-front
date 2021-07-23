import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { addTaskAction } from '../services/index';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}));

const AddTask = ({ onClose, setShowAddModal }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [addUser, setAddUser] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");

  const { name, description } = addUser;

  /* Funcion que escucha los cambios del input */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddUser({ ...addUser, [name]: value });
  };

  /* Funcion que envia el formulario y valida si estan vacios */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      setError("Este campo es obligatorio");
    } else {
      dispatch(addTaskAction(addUser));
      onClose()
      window.location.reload()
      setError("");
    }
  };

  return ReactDOM.createPortal(
    <div className="Background">
      <div className="ModalWrapper">
        <h2>Añadir Tarea</h2>
        {/* {error && <h3 style={{color: "red"}}>{error}</h3>} */}
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            required
            id="name"
            name="name"
            label="Nombre de la tarea"
            value={name}
            type="text"
            onChange={handleInputChange}
            error={error}
            helperText={error}
          />
          <br />
          <TextField
            required
            id="description"
            name="description"
            label="Descripción"
            value={description}
            type="text"
            onChange={handleInputChange}
            error={error}
            helperText={error}
          />
          <br />
          <div className="Button__Container">
            <Button
              style={{ width: "100%", marginBottom: "10px" }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Añadir
            </Button>
            <Button
              style={{ width: "100%" }}
              color="secondary"
              variant="contained"
              onClick={onClose}
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

export default AddTask;
