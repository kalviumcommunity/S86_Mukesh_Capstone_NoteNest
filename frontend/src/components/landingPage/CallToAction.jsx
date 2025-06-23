import { Link } from "react-router-dom";

// Simple Button component inside this file
const Button = ({ size, variant, className, children, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-white text-primary hover:bg-gray-100 focus:ring-primary",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const CallToAction = () => {
  return (
    <section className="py-16 px-6 md:px-8 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to organize your notes?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Sign up for free and start creating your first note today.
          No credit card required.
        </p>
        <Link to="/login">
          <Button size="lg" variant="secondary" className="text-primary font-medium">
            Get Started Now
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
