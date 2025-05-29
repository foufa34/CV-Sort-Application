var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
const Select = forwardRef((_a, ref) => {
    var { label, error, helperText, options, className = '', onChange } = _a, props = __rest(_a, ["label", "error", "helperText", "options", "className", "onChange"]);
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };
    return (_jsxs("div", { className: "w-full", children: [label && (_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: label })), _jsx("select", Object.assign({ ref: ref, className: `
            block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 sm:text-sm
            py-2 px-3 border ${error ? 'border-red-500' : 'border-gray-300'} 
            bg-white ${className}
          `, onChange: handleChange }, props, { children: options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) })), error && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: error })), helperText && !error && (_jsx("p", { className: "mt-1 text-sm text-gray-500", children: helperText }))] }));
});
Select.displayName = 'Select';
export default Select;
