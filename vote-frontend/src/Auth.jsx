// src/Auth.jsx
export const isAuthenticated = () => {
    return !!localStorage.getItem('user');
};

export const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.role === 'Admin';
};

export const isNormalUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.role === 'Normal';
};
