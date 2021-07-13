const Button: React.FC<{
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
  icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  iconClassName?: string;
}> = ({ className, children, onClick, icon: Icon, iconClassName }) => {
  return (
    <button
      className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-bright bg-button hover:bg-button-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-light ${className}`}
      onClick={onClick}
    >
      {Icon && (
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <Icon
            className={`h-5 w-5 text-button-light group-hover:text-button-lighter ${iconClassName}`}
            aria-hidden="true"
          />
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
