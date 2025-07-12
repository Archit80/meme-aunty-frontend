"use client";

import { useCallback, useState } from "react";
import {
  Upload,
  X,
  AlertCircle,
  CheckCircle,
  File,
  Folder,
  FolderArchive,
} from "lucide-react";
import { validateFile, formatFileSize } from "@/utils/fileUtils";

export default function UploadBox({
  onFileSelect,
  selectedFile,
  disabled,
  creditsLeft,
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = useCallback(
    (file) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith("image/"));

      if (imageFile) {
        handleFileSelect(imageFile);
      }
    },
    [handleFileSelect]
  );

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeFile = () => {
    onFileSelect(null);
    setError(null);
  };

  if (selectedFile) {
    return (
      <div>
        <div className="bg-white rounded-2xl px-4 py-3 border-2 border-purple-200 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate text-sm">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatFileSize(selectedFile.size)}
              </p>
              <p className="text-xs text-green-600 font-medium">
                ✓ Ready to generate
              </p>
            </div>
            <button
              onClick={removeFile}
              className="w-7 h-7 bg-gray-200 hover:bg-red-100 hover:text-red-600 rounded-full flex items-center justify-center transition-all duration-200"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!disabled && creditsLeft >= 0) {
    return (
      <div>
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
          border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 bg-white shadow-lg
          ${
            isDragOver
              ? "border-fuchsia-400 bg-fuchsia-50 scale-105 shadow-xl"
              : "border-purple-300 hover:border-fuchsia-300 hover:bg-fuchsia-50/50"
          }
        `}
        >
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Upload className="w-6 h-6 text-yellow-600" />
          </div>

          <h3 className="text-base font-semibold text-gray-900 mb-2">
            Drop your photo here
          </h3>
          <p className="text-gray-500 mb-3 text-sm">
            And let aunty pour her meme magic
          </p>

          <div className="text-xs text-gray-400 mb-3">
            Supports: JPEG, PNG, GIF, WebP • Max size: 10MB
          </div>

          <label className="inline-block">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            <span className="bg-yellow-400 hover:bg-yellow-300 flex gap-2 items-center justify-center text-gray-900 font-semibold px-4 py-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 shadow-lg text-md">
              Choose File
              <Folder className="w-4 h-4" />
            </span>
          </label>
        </div>
      </div>
    );
  }
}
