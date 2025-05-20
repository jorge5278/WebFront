import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/usersService"; 
import {
  Container,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "",
  });
  const [newUserData, setNewUserData] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "cliente",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    if (data) {
      const sorted = data.sort((a, b) => a.id - b.id);
      setUsers(sorted);
    } else {
      setUsers([]);
    }
  };

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setEditUserData({
      nombre: user.nombre,
      email: user.email,
      password: "",
      rol: user.rol,
    });
  };

  const handleUpdate = async () => {
    await updateUser({
      id: editUserId,
      ...editUserData,
    });
    setEditUserId(null);
    loadUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  const handleCreate = async () => {
    const { nombre, email, password, rol } = newUserData;
    if (!nombre || !email || !password) {
      alert("Todos los campos son obligatorios");
      return;
    }
    await createUser({ nombre, email, password, rol });
    setNewUserData({ nombre: "", email: "", password: "", rol: "cliente" });
    loadUsers();
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2, color: "black" }}>
        Gestión de Usuarios
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ color: "black" }}>
          Crear Nuevo Usuario
        </Typography>
        <TextField
          fullWidth
          label="Nombre"
          value={newUserData.nombre}
          onChange={(e) =>
            setNewUserData({ ...newUserData, nombre: e.target.value })
          }
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          label="Email"
          value={newUserData.email}
          onChange={(e) =>
            setNewUserData({ ...newUserData, email: e.target.value })
          }
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          value={newUserData.password}
          onChange={(e) =>
            setNewUserData({ ...newUserData, password: e.target.value })
          }
          sx={{ mb: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Crear Usuario
        </Button>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                {editUserId === user.id ? (
                  <>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={editUserData.nombre}
                        onChange={(e) =>
                          setEditUserData({
                            ...editUserData,
                            nombre: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={editUserData.email}
                        onChange={(e) =>
                          setEditUserData({
                            ...editUserData,
                            email: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={editUserData.rol}
                        onChange={(e) =>
                          setEditUserData({
                            ...editUserData,
                            rol: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button color="primary" onClick={handleUpdate}>
                        Guardar
                      </Button>
                      <Button color="error" onClick={() => setEditUserId(null)}>
                        Cancelar
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{user.nombre}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.rol}</TableCell>
                    <TableCell>
                      <Button color="primary" onClick={() => handleEditClick(user)}>
                        Editar
                      </Button>
                      <Button color="error" onClick={() => handleDelete(user.id)}>
                        Eliminar
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Users;
