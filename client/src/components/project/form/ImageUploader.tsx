import React from "react";

interface ImageUploaderProps {
  imagePreview: string;
  imageAlt: string;
  description: string;
  hasDescription?: boolean;
  isDescriptionRequired?: boolean;
  onImageChange: (file: File) => void;
  onAltChange: (alt: string) => void;
  onDescriptionChange?: (description: string) => void;
  inputId: string;
  label: string;
  isRequired?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imagePreview,
  imageAlt,
  description,
  hasDescription = false,
  isDescriptionRequired = false,
  onImageChange,
  onAltChange,
  onDescriptionChange,
  inputId,
  label,
  isRequired = true,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-col gap-4">
        <div className="w-full">
          {imagePreview ? (
            <div className="relative group">
              <img
                src={imagePreview}
                alt={imageAlt || "이미지"}
                className="w-full h-auto rounded-lg border border-gray-200"
              />
              <div
                className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg cursor-pointer"
                onClick={() => {
                  const fileInput = document.getElementById(inputId);
                  if (fileInput) fileInput.click();
                }}
              >
                <span className="text-white text-sm font-medium">
                  이미지 변경
                </span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                const fileInput = document.getElementById(inputId);
                if (fileInput) fileInput.click();
              }}
              className="w-full aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
            >
              <i className="fas fa-cloud-upload-alt text-gray-400 text-2xl mb-2"></i>
              <span className="text-gray-500 text-sm font-medium">
                이미지 업로드
              </span>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, GIF 파일 (최대 5MB)
              </p>
            </div>
          )}
          <input
            type="file"
            id={inputId}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        {imagePreview && (
          <>
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2">
                이미지 설명{" "}
                {isRequired && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => onAltChange(e.target.value)}
                className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                placeholder="이미지에 대한 간단한 설명"
                required={isRequired}
              />
            </div>
            {hasDescription && onDescriptionChange && (
              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-2">
                  상세 설명
                  {isDescriptionRequired && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => onDescriptionChange(e.target.value)}
                  className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors min-h-[100px]"
                  placeholder="이미지에 대한 상세 설명"
                  required={isDescriptionRequired}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
