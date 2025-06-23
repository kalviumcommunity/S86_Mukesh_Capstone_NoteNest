const Button = ({ children, className, onClick, variant, size }) => {
    const baseStyles = "py-2 px-4 rounded-md focus:outline-none";
    const variantStyles = variant === "outline" 
      ? "border border-gray-600 text-gray-600 hover:bg-gray-100"
      : "bg-primary text-white hover:bg-primary-dark";
    const sizeStyles = size === "sm" ? "text-sm" : "text-lg";
    
    return (
      <button 
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`} 
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  
  export default Button;



  
  