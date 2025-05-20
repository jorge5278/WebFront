// Después: lee de la variable de entorno VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token.trim()}` : "";
};

// Login
const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return { success: true, user: data.user };
  } else {
    return { success: false, message: data.message || "Error en el login" };
  }
};

// Leer usuarios (protegido)
const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  });
  if (!response.ok) return null;
  return await response.json();
};

// Registro de usuario (público)
const createUser = async ({ nombre, email, password, rol }) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password, rol }),
  });
  const data = await response.json();
  if (response.ok) {
    return { success: true, user: data };
  } else {
    return { success: false, message: data.message || "Error al crear usuario" };
  }
};

// Actualizar usuario (protegido)
const updateUser = async (user) => {
  const token = getToken();
  if (!token) return { success: false, message: "No hay token disponible" };

  const payload = {
    nombre: user.nombre,
    email: user.email,
    rol: user.rol,
  };
  if (user.password) payload.password = user.password;

  const response = await fetch(`${API_URL}/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) return { success: true };
  const err = await response.json();
  return { success: false, message: err.message || "Error al actualizar usuario" };
};

// Eliminar usuario (protegido)
const deleteUser = async (id) => {
  const token = getToken();
  if (!token) return { success: false, message: "No hay token disponible" };

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (response.ok) return { success: true };
  const err = await response.json();
  return { success: false, message: err.message || "Error al eliminar usuario" };
};

// Logout
const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export {
  loginUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  logoutUser,
};
