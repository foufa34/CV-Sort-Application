import React from 'react';
interface FileUploadProps {
    onFileSelect: (file: File) => void;
    label?: string;
    accept?: string;
    maxSizeMB?: number;
    error?: string;
}
declare const FileUpload: React.FC<FileUploadProps>;
export default FileUpload;
