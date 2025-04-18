// 프로젝트 기능 입력 폼 컴포넌트
import React from "react";
import ImageUploader from "./ImageUploader";

interface FeatureFormProps {
  features: {
    title: string;
    description: string;
    imageFile: File | null;
    imagePreview: string;
    imageAlt: string;
  }[];
  handleFeatureChange: (index: number, field: string, value: any) => void;
  handleRemoveFeature: (index: number) => void;
  handleAddFeature: () => void;
  handleFileUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "feature" | "screenshot",
    index: number,
  ) => void;
  setFeatureFileInputRef: (el: HTMLInputElement | null, index: number) => void;
}

const FeatureForm: React.FC<FeatureFormProps> = ({
  features,
  handleFeatureChange,
  handleRemoveFeature,
  handleAddFeature,
  handleFileUpload,
  setFeatureFileInputRef,
}) => {
  return (
    <section className="mb-14">
      <div className="flex justify-between items-center mb-8 pb-3 border-b border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800">주요 기능</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{features.length}/3</span>
          <button
            type="button"
            onClick={handleAddFeature}
            disabled={features.length >= 3}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              features.length >= 3
                ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                : "text-accent-500 bg-accent-50 hover:bg-accent-100"
            } transition-colors`}
          >
            + 기능 추가
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-7 bg-gray-50 rounded-xl relative hover:bg-gray-100/50 transition-all shadow-sm"
          >
            {features.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition-colors"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  기능 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) =>
                    handleFeatureChange(index, "title", e.target.value)
                  }
                  className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                  placeholder="기능 제목"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  기능 설명 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={feature.description}
                  onChange={(e) =>
                    handleFeatureChange(index, "description", e.target.value)
                  }
                  className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors min-h-[120px]"
                  placeholder="기능에 대한 상세 설명"
                  required
                />
              </div>

              <ImageUploader
                imagePreview={feature.imagePreview}
                imageAlt={feature.imageAlt}
                onImageChange={(file) => {
                  handleFeatureChange(index, "imageFile", file);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    handleFeatureChange(
                      index,
                      "imagePreview",
                      reader.result as string,
                    );
                  };
                  reader.readAsDataURL(file);
                }}
                onAltChange={(alt) =>
                  handleFeatureChange(index, "imageAlt", alt)
                }
                inputId={`feature-image-${index}`}
                label="기능 이미지"
                isRequired={true}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureForm;
