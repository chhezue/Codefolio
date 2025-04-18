// 프로젝트 스크린샷 입력 폼 컴포넌트
import React from "react";
import ImageUploader from "./ImageUploader";

interface ScreenshotFormProps {
  screenshots: {
    imageFile: File | null;
    imagePreview: string;
    imageAlt: string;
    description: string;
  }[];
  handleScreenshotChange: (index: number, field: string, value: any) => void;
  handleRemoveScreenshot: (index: number) => void;
  handleAddScreenshot: () => void;
  handleFileUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "feature" | "screenshot",
    index: number
  ) => void;
  setScreenshotFileInputRef: (
    el: HTMLInputElement | null,
    index: number
  ) => void;
}

const ScreenshotForm: React.FC<ScreenshotFormProps> = ({
  screenshots,
  handleScreenshotChange,
  handleRemoveScreenshot,
  handleAddScreenshot,
  handleFileUpload,
  setScreenshotFileInputRef,
}) => {
  return (
    <section className="mb-14">
      <div className="flex justify-between items-center mb-8 pb-3 border-b border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800">실제 구현 화면</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{screenshots.length}/3</span>
          <button
            type="button"
            onClick={handleAddScreenshot}
            disabled={screenshots.length >= 3}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              screenshots.length >= 3
                ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                : "text-accent-500 bg-accent-50 hover:bg-accent-100"
            } transition-colors`}
          >
            + 이미지 추가
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {screenshots.map((screenshot, index) => (
          <div
            key={index}
            className="p-7 bg-gray-50 rounded-xl relative hover:bg-gray-100/50 transition-all shadow-sm"
          >
            {screenshots.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveScreenshot(index)}
                className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition-colors"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            )}

            <ImageUploader
              imagePreview={screenshot.imagePreview}
              imageAlt={screenshot.imageAlt}
              description={screenshot.description}
              hasDescription={true}
              onImageChange={(file) => {
                handleScreenshotChange(index, "imageFile", file);
                const reader = new FileReader();
                reader.onloadend = () => {
                  handleScreenshotChange(
                    index,
                    "imagePreview",
                    reader.result as string
                  );
                };
                reader.readAsDataURL(file);
              }}
              onAltChange={(alt) =>
                handleScreenshotChange(index, "imageAlt", alt)
              }
              onDescriptionChange={(desc) =>
                handleScreenshotChange(index, "description", desc)
              }
              inputId={`screenshot-image-${index}`}
              label="스크린샷 이미지"
              isRequired={true}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScreenshotForm;
