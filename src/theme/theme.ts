const theme = {
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#1d4ed8",
    primaryHover: "#1e40af",
    secondary: "#4b5563",
    warning: "red"
  },
  buttons: {
    primary: {
      color: "background",
      bg: "primary",
      "&:hover": {
        bg: "text"
      }
    },
    secondary: {
      color: "background",
      bg: "secondary"
    }
  }
};

export default theme;
