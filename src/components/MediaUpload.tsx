
import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, FilmIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MediaUploadProps {
  maxFiles?: number;
  onChange: (files: File[]) => void;
  value: File[];
}

const MediaUpload: React.FC<MediaUploadProps> = ({ 
  maxFiles = 5, 
  onChange, 
  value = [] 
}) => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const handleFileChange = (fileList: FileList) => {
    if (value.length + fileList.length > maxFiles) {
      toast({
        title: "Upload limit reached",
        description: `You can only upload a maximum of ${maxFiles} files.`,
        variant: "destructive"
      });
      return;
    }

    const newFiles = Array.from(fileList).filter(file => {
      const isValid = file.type.startsWith('image/') || file.type.startsWith('video/');
      if (!isValid) {
        toast({
          title: "Invalid file type",
          description: "Only images and videos are allowed.",
          variant: "destructive"
        });
      }
      return isValid;
    });

    if (newFiles.length > 0) {
      onChange([...value, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  const isImage = (file: File) => file.type.startsWith('image/');
  const isVideo = (file: File) => file.type.startsWith('video/');

  return (
    <div className="w-full space-y-4">
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {value.map((file, index) => (
            <div key={index} className="relative bg-gray-100 rounded-md overflow-hidden aspect-square">
              {isImage(file) && (
                <img 
                  src={URL.createObjectURL(file)} 
                  alt={`Preview ${index}`} 
                  className="w-full h-full object-cover"
                />
              )}
              {isVideo(file) && (
                <div className="flex flex-col items-center justify-center h-full p-2">
                  <FilmIcon className="w-10 h-10 text-gray-500 mb-1" />
                  <span className="text-xs text-center text-gray-700 truncate w-full">
                    {file.name}
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-gray-800 bg-opacity-70 rounded-full p-1 text-white hover:bg-opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {value.length < maxFiles && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 text-center">
            <span className="font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Images or videos (max {maxFiles})
          </p>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*, video/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                handleFileChange(e.target.files);
                e.target.value = '';
              }
            }}
          />
        </div>
      )}
      <p className="text-xs text-gray-500 mt-2">
        {value.length} of {maxFiles} files uploaded
      </p>
    </div>
  );
};

export default MediaUpload;
