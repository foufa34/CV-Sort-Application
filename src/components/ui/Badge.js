import { jsx as _jsx } from "react/jsx-runtime";
const Badge = ({ children, variant = 'default', size = 'md', className = '', }) => {
    const variantStyles = {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-blue-100 text-blue-800',
        secondary: 'bg-teal-100 text-teal-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-amber-100 text-amber-800',
        danger: 'bg-red-100 text-red-800',
    };
    const sizeStyles = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-xs px-2.5 py-0.5',
        lg: 'text-sm px-3 py-1',
    };
    const finalClassName = `inline-flex items-center rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
    return (_jsx("span", { className: finalClassName, children: children }));
};
export default Badge;
