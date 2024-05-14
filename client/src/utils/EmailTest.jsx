// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function checkEmail(email) {
  return emailRegex.test(email);
}
