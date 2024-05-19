import { ButtonProps } from "./interface";

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {

    const buttonClasses = `text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${className}`;

  return (
    <button
      {...props}
      type="button"
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;
