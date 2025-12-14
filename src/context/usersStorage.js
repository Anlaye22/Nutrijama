const USERS_KEY = "users";

/**
 * Obtiene usuarios del localStorage
 */
export function getUsers() {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Guarda la lista completa de usuarios
 */
export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Agrega un usuario nuevo
 */
export function addUser(newUser) {
  const users = getUsers();
  users.push(newUser);
  saveUsers(users);
}
