export const validators = {
  required: (value) => {
    return value ? "" : "This field is required";
  },

  email: (value) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(value) ? "" : "Invalid email address";
  },

  password: (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(value)) return "Password must contain uppercase letter";
    if (!/[a-z]/.test(value)) return "Password must contain lowercase letter";
    if (!/[0-9]/.test(value)) return "Password must contain number";
    if (/\s/.test(value)) return "Password must not contain spaces";
    return "";
  },

  name: (value) => {
    if (!value) return "Name is required";
    if (value.length < 2) return "Name must be at least 2 characters";
    if (!/[a-zA-Z\s-]/.test(value)) return "Password must contain words";
    return "";
  },

  title: (value) => {

    if (!value) return "Title is required";
    if (value.length < 2) return "Title must be at least 2 characters";
    if (!/[a-zA-Z\s-]/.test(value)) return "Password must contain words";
    return "";
  },

  subTitle: (value) => {
    if (!value) return "SubTitle is required";
    if (value.length < 2) return "Sub title must be at least 2 characters";
    if (!/[a-zA-Z\s-]/.test(value)) return "Password must contain words";
    return "";
  },

  tags: (value) => {
    if (!value) return "Tags is required";
    if (value.length < 2) return "Tags must be at least 2 characters";
    if (!/[a-zA-Z\s-]/.test(value)) return "Password must contain words";
    return "";
  },

  content: (value) => {
    if (!value) return "Content is required";
    if (value.length < 2) return "Tags must be at least 2 characters";
    if (!/[a-zA-Z\s-]/.test(value)) return "Password must contain words";
    return "";
  },

  minLength: (length) => (value) => {
    return value.length >= length
      ? ""
      : `Minimum ${length} characters required`;
  },

  maxLength: (length) => (value) => {
    return value.length <= length ? "" : `Maximum ${length} characters allowed`;
  },
};
