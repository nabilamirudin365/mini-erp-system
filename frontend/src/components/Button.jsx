function Button({ children, color = "bg-black", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${color} text-white px-4 py-2 brutal-btn`}
    >
      {children}
    </button>
  );
}

export default Button;