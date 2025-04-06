
//TODO: camibiar el mockup por una API real.

const getUsersFromLocalStorage = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };
  
  const saveUsersToLocalStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };
  
  export const registerUser = (user) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsersFromLocalStorage();
        const userExists = users.some(u => u.email === user.email);
        if (userExists) {
          reject('User already exists');
        } else {
          users.push(user);
          saveUsersToLocalStorage(users);
          resolve('User registered successfully');
        }
      }, 1000); // Simula un retraso de 1 segundo
    });
  };
  
  export const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsersFromLocalStorage();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          resolve('Login successful');
        } else {
          reject('Invalid credentials');
        }
      }, 1000); // Simula un retraso de 1 segundo
    });
  };
  
  export const forgotPassword = (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsersFromLocalStorage();
        const user = users.find(u => u.email === email);
        if (user) {
          resolve('Recovery link sent successfully');
        } else {
          reject('Email not registered');
        }
      }, 1000); // Simula un retraso de 1 segundo
    });
  };