import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { UploadCloud, X, File } from 'lucide-react';
import Button from './Button';
const FileUpload = ({ onFileSelect, label = 'Upload File', accept = '.pdf,.doc,.docx', maxSizeMB = 5, error, }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [fileError, setFileError] = useState(null);
    const inputRef = useRef(null);
    const handleClick = () => {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    const validateFile = (file) => {
        var _a;
        // Check file size
        if (file.size > maxSizeMB * 1024 * 1024) {
            setFileError(`File is too large. Maximum size is ${maxSizeMB}MB.`);
            return false;
        }
        // Check file type based on extension
        const fileExtension = (_a = file.name.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        const acceptedExtensions = accept
            .split(',')
            .map(ext => ext.trim().replace('.', '').toLowerCase());
        if (!fileExtension || !acceptedExtensions.includes(fileExtension)) {
            setFileError(`Invalid file type. Accepted formats: ${accept}`);
            return false;
        }
        setFileError(null);
        return true;
    };
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (validateFile(file)) {
                setSelectedFile(file);
                onFileSelect(file);
            }
            else {
                setSelectedFile(null);
            }
        }
    };
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        }
        else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (validateFile(file)) {
                setSelectedFile(file);
                onFileSelect(file);
            }
            else {
                setSelectedFile(null);
            }
        }
    };
    const removeFile = () => {
        setSelectedFile(null);
        setFileError(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };
    const formatFileSize = (bytes) => {
        if (bytes < 1024)
            return bytes + ' bytes';
        if (bytes < 1024 * 1024)
            return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };
    return (_jsxs("div", { className: "w-full", children: [label && _jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: label }), !selectedFile ? (_jsxs("div", { className: `
            border-2 border-dashed rounded-lg p-6 transition-colors
            ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${error || fileError ? 'border-red-500 bg-red-50' : ''}
          `, onDragEnter: handleDrag, onDragOver: handleDrag, onDragLeave: handleDrag, onDrop: handleDrop, onClick: handleClick, children: [_jsx("input", { ref: inputRef, type: "file", className: "hidden", accept: accept, onChange: handleFileChange }), _jsxs("div", { className: "flex flex-col items-center justify-center space-y-2 text-center", children: [_jsx(UploadCloud, { className: "h-10 w-10 text-gray-400" }), _jsxs("div", { className: "text-gray-700", children: [_jsx("span", { className: "font-medium", children: "Click to upload" }), " or drag and drop"] }), _jsxs("p", { className: "text-xs text-gray-500", children: [accept.split(',').join(', '), " (Max size: ", maxSizeMB, "MB)"] })] })] })) : (_jsxs("div", { className: "bg-gray-50 rounded-lg p-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(File, { className: "h-8 w-8 text-blue-500" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-700 truncate max-w-xs", children: selectedFile.name }), _jsx("p", { className: "text-xs text-gray-500", children: formatFileSize(selectedFile.size) })] })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: (e) => {
                            e.stopPropagation();
                            removeFile();
                        }, "aria-label": "Remove file", children: _jsx(X, { className: "h-4 w-4 text-gray-500" }) })] })), (error || fileError) && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: error || fileError }))] }));
};
export default FileUpload;
