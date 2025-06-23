const Card = ({ children, className }) => {
    return (
      <div className={`shadow-lg rounded-lg bg-white p-6 ${className}`}>
        {children}
      </div>
    );
  };
  
  const CardContent = ({ children, className }) => {
    return <div className={`p-4 ${className}`}>{children}</div>;
  };
  
  const CardHeader = ({ children }) => {
    return <div className="border-b pb-4 mb-4">{children}</div>;
  };
  
  const CardTitle = ({ children }) => {
    return <h2 className="text-xl font-semibold">{children}</h2>;
  };
  
  const CardDescription = ({ children }) => {
    return <p className="text-sm text-gray-600">{children}</p>;
  };
  
  const CardFooter = ({ children }) => {
    return <div className="pt-4">{children}</div>;
  };
  
  export { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter };
  