export const  generateRandomString = () => {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return Array.from({length: 5}, () => letras[Math.floor(Math.random() * letras.length)]).join('');
}
