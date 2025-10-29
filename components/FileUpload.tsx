import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, [disabled]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // FIX: Corrected typo from `dataTansfer` to `dataTransfer`.
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect, disabled]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.target.files && e.target.files[0]) {
        onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-slate-600 border-dashed rounded-lg transition-colors duration-300 ${isDragging && !disabled ? 'border-sky-500 bg-slate-700/50' : ''} ${disabled ? 'cursor-not-allowed bg-slate-800/50 opacity-50' : 'cursor-pointer bg-slate-800 hover:bg-slate-700/50'}`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon className={`w-10 h-10 mb-4 ${isDragging && !disabled ? 'text-sky-400' : 'text-slate-500'}`} />
          <p className="mb-2 text-sm text-slate-400">
            <span className={`font-semibold ${disabled ? '' : 'text-sky-400'}`}>Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-slate-500">JSON files only</p>
        </div>
        <input id="dropzone-file" type="file" accept=".json,application/json" className="hidden" onChange={handleChange} disabled={disabled} />
      </label>
    </div>
  );
};

export default FileUpload;