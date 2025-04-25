import React, { ChangeEvent, useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PageLayout from "../components/layout/PageLayout";
import { api } from "../config/api";
import FeatureForm from "../components/project/form/FeatureForm";
import ScreenshotForm from "../components/project/form/ScreenshotForm";
import ChallengeForm from "../components/project/form/ChallengeForm";

const ProjectUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pin, setPin] = useState(false);

  // 프로젝트 기본 정보
  const [basicInfo, setBasicInfo] = useState({
    title: "",
    summary: "",
    githubUrl: "",
    startDate: "",
    endDate: "",
    role: "",
    pin: false,
  });

  // 기술 스택
  const [technology, setTechnology] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);

  // 기능 목록
  const [features, setFeatures] = useState<
    {
      title: string;
      description: string;
      imageFile: File | null;
      imagePreview: string;
      imageAlt: string;
    }[]
  >([
    {
      title: "",
      description: "",
      imageFile: null,
      imagePreview: "",
      imageAlt: "",
    },
  ]);

  // 실제 구현 화면 목록
  const [screenshots, setScreenshots] = useState<
    {
      imageFile: File | null;
      imagePreview: string;
      imageAlt: string;
      description: string;
    }[]
  >([{ imageFile: null, imagePreview: "", imageAlt: "", description: "" }]);

  // 도전 과제 목록
  const [challenges, setChallenges] = useState<
    {
      number: number;
      title: string;
      description: string;
    }[]
  >([{ number: 1, title: "", description: "" }]);

  // File input refs
  const featureFileInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const screenshotFileInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // 기존 프로젝트 데이터 로드
  useEffect(() => {
    const fetchProjectData = async () => {
      if (!id) {
        navigate("/projects");
        return;
      }

      try {
        const response = await axios.get(api.projectById(id), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        });

        const projectData = response.data;

        // 기본 정보 설정
        setBasicInfo({
          title: projectData.title || "",
          summary: projectData.description || "",
          githubUrl: projectData.githubUrl || "",
          startDate: projectData.periodStart
            ? new Date(projectData.periodStart).toISOString().split("T")[0]
            : "",
          endDate: projectData.periodEnd
            ? new Date(projectData.periodEnd).toISOString().split("T")[0]
            : "",
          role: projectData.role || "",
          pin: projectData.pin || false,
        });

        // 고정 상태 설정
        setPin(projectData.pin || false);

        // 기술 스택 설정
        if (projectData.stack && Array.isArray(projectData.stack)) {
          setTechnologies(projectData.stack);
        }

        // 기능 목록 설정
        if (projectData.features && Array.isArray(projectData.features)) {
          const mappedFeatures = projectData.features.map((feature: any) => ({
            title: feature.title || "",
            description: feature.description || "",
            imageFile: null,
            imagePreview: feature.imageUrl || "",
            imageAlt: feature.imageAlt || "",
          }));
          setFeatures(mappedFeatures.length > 0 ? mappedFeatures : features);
        }

        // 스크린샷 목록 설정
        if (projectData.screenshots && Array.isArray(projectData.screenshots)) {
          const mappedScreenshots = projectData.screenshots.map(
            (screenshot: any) => ({
              imageFile: null,
              imagePreview: screenshot.imageUrl || "",
              imageAlt: screenshot.imageAlt || "",
              description: screenshot.description || "",
            })
          );
          setScreenshots(
            mappedScreenshots.length > 0 ? mappedScreenshots : screenshots
          );
        }

        // 도전 과제 목록 설정
        if (
          projectData.techChallenges &&
          Array.isArray(projectData.techChallenges)
        ) {
          const mappedChallenges = projectData.techChallenges.map(
            (challenge: any, index: number) => ({
              number: index + 1,
              title: challenge.title || "",
              description: challenge.description || "",
            })
          );
          setChallenges(
            mappedChallenges.length > 0 ? mappedChallenges : challenges
          );
        }

        setIsLoading(false);
      } catch (err) {
        console.error(
          "프로젝트 데이터를 불러오는 중 오류가 발생했습니다:",
          err
        );
        setError("프로젝트 데이터를 불러오는 중 오류가 발생했습니다.");
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, [id, navigate]);

  // 날짜 변환 함수
  const formatDateString = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}.${month}`;
  };

  // 프로젝트 기간 문자열 생성
  const getProjectPeriod = (): string => {
    const startDate = formatDateString(basicInfo.startDate);
    const endDate = formatDateString(basicInfo.endDate);

    if (startDate && endDate) {
      return `${startDate} - ${endDate}`;
    } else if (startDate) {
      return `${startDate} - 진행중`;
    }
    return "";
  };

  // 기본 정보 입력 핸들러
  const handleBasicInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBasicInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 고정 상태 변경 핸들러
  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.checked);
  };

  // 기술 스택 추가
  const handleAddTechnology = () => {
    if (technology.trim() !== "" && !technologies.includes(technology.trim())) {
      setTechnologies((prev) => [...prev, technology.trim()]);
      setTechnology("");
    }
  };

  // 기술 스택 제거
  const handleRemoveTechnology = (tech: string) => {
    setTechnologies((prev) => prev.filter((item) => item !== tech));
  };

  // 기능 추가
  const handleAddFeature = () => {
    if (features.length < 3) {
      setFeatures((prev) => [
        ...prev,
        {
          title: "",
          description: "",
          imageFile: null,
          imagePreview: "",
          imageAlt: "",
        },
      ]);
    }
  };

  // 기능 입력 핸들러
  const handleFeatureChange = (index: number, field: string, value: any) => {
    setFeatures((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // 기능 제거
  const handleRemoveFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // 도전 과제 추가
  const handleAddChallenge = () => {
    if (challenges.length < 3) {
      setChallenges((prev) => [
        ...prev,
        {
          number: prev.length + 1,
          title: "",
          description: "",
        },
      ]);
    }
  };

  // 도전 과제 입력 핸들러
  const handleChallengeChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setChallenges((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: field === "number" ? parseInt(value) : value,
      };
      return updated;
    });
  };

  // 도전 과제 제거
  const handleRemoveChallenge = (index: number) => {
    if (challenges.length > 1) {
      const newChallenges = challenges.filter((_, i) => i !== index);
      // 번호 재정렬
      const renumbered = newChallenges.map((challenge, i) => ({
        ...challenge,
        number: i + 1,
      }));
      setChallenges(renumbered);
    }
  };

  // 스크린샷 추가
  const handleAddScreenshot = () => {
    if (screenshots.length < 3) {
      setScreenshots((prev) => [
        ...prev,
        { imageFile: null, imagePreview: "", imageAlt: "", description: "" },
      ]);
    }
  };

  // 스크린샷 입력 핸들러
  const handleScreenshotChange = (index: number, field: string, value: any) => {
    setScreenshots((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // 스크린샷 제거
  const handleRemoveScreenshot = (index: number) => {
    if (screenshots.length > 1) {
      setScreenshots((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // 파일 업로드 핸들러
  const handleFileUpload = (
    event: ChangeEvent<HTMLInputElement>,
    type: "feature" | "screenshot",
    index: number
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (type === "feature") {
          handleFeatureChange(index, "imageFile", file);
          handleFeatureChange(index, "imagePreview", reader.result as string);
        } else {
          handleScreenshotChange(index, "imageFile", file);
          handleScreenshotChange(
            index,
            "imagePreview",
            reader.result as string
          );
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // ref 설정 함수
  const setFeatureFileInputRef = (
    el: HTMLInputElement | null,
    index: number
  ) => {
    featureFileInputRefs.current[index] = el;
  };

  const setScreenshotFileInputRef = (
    el: HTMLInputElement | null,
    index: number
  ) => {
    screenshotFileInputRefs.current[index] = el;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 유효성 검사
      if (basicInfo.title.trim() === "") {
        throw new Error("프로젝트 제목은 필수 항목입니다.");
      }

      if (basicInfo.summary.trim() === "") {
        throw new Error("프로젝트 요약은 필수 항목입니다.");
      }

      if (basicInfo.githubUrl.trim() === "") {
        throw new Error("GitHub URL은 필수 항목입니다.");
      }

      if (basicInfo.startDate === "") {
        throw new Error("시작 날짜는 필수 항목입니다.");
      }

      if (technologies.length === 0) {
        throw new Error("최소한 하나 이상의 기술 스택을 입력해주세요.");
      }

      // 필터링: 빈 항목 제거
      const validFeatures = features.filter(
        (item) =>
          (item.imageFile !== null || item.imagePreview !== "") &&
          item.title.trim() !== ""
      );

      const validScreenshots = screenshots.filter(
        (item) =>
          (item.imageFile !== null || item.imagePreview !== "") &&
          item.imageAlt.trim() !== ""
      );

      const validChallenges = challenges.filter(
        (item) => item.title.trim() !== "" && item.description.trim() !== ""
      );

      if (validFeatures.length === 0) {
        throw new Error("최소한 하나 이상의 기능을 입력해주세요.");
      }

      if (validChallenges.length === 0) {
        throw new Error("최소한 하나 이상의 도전 과제를 입력해주세요.");
      }

      // FormData 생성 및 데이터 추가
      const formData = new FormData();
      formData.append("title", basicInfo.title);
      formData.append("description", basicInfo.summary); // 백엔드는 'description' 필드 사용
      formData.append("githubUrl", basicInfo.githubUrl);
      formData.append("periodStart", basicInfo.startDate); // 백엔드는 'periodStart' 필드 사용
      formData.append("periodEnd", basicInfo.endDate); // 백엔드는 'periodEnd' 필드 사용
      formData.append("period", getProjectPeriod()); // 형식화된 기간 문자열 추가
      formData.append("role", basicInfo.role);
      formData.append("pin", pin.toString()); // 고정 여부 추가

      // 기술 스택 추가 (백엔드는 'stack' 필드 사용)
      technologies.forEach((tech, index) => {
        formData.append(`stack[${index}]`, tech);
      });

      // 기능 추가
      validFeatures.forEach((feature, index) => {
        formData.append(`features[${index}][title]`, feature.title);
        formData.append(`features[${index}][description]`, feature.description);
        formData.append(`features[${index}][imageAlt]`, feature.imageAlt);
        if (feature.imageFile) {
          formData.append(`featureImages[${index}]`, feature.imageFile);
        }
      });

      // 스크린샷 추가
      validScreenshots.forEach((screenshot, index) => {
        formData.append(`screenshots[${index}][imageAlt]`, screenshot.imageAlt);
        formData.append(
          `screenshots[${index}][description]`,
          screenshot.description || ""
        );
        if (screenshot.imageFile) {
          formData.append(`screenshotImages[${index}]`, screenshot.imageFile);
        }
      });

      // 도전 과제 추가 (백엔드는 'techChallenges' 필드 사용)
      validChallenges.forEach((challenge, index) => {
        formData.append(
          `techChallenges[${index}][number]`,
          challenge.number.toString()
        );
        formData.append(`techChallenges[${index}][title]`, challenge.title);
        formData.append(
          `techChallenges[${index}][description]`,
          challenge.description
        );
      });

      // API 호출
      if (!id) {
        throw new Error("프로젝트 ID가 유효하지 않습니다.");
      }

      await axios.put(api.updateProject(id), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      // 성공 시 목록 페이지로 이동
      navigate("/projects");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        console.error("프로젝트 수정 중 오류가 발생했습니다:", err);
        setError(
          "프로젝트를 수정하는 중 오류가 발생했습니다. 다시 시도해주세요."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 엔터 키로 기술 스택 추가
  const handleTechnologyKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-500 mb-4"></div>
            <p className="text-gray-600">프로젝트 데이터를 불러오는 중...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            프로젝트 수정
          </h1>
          <p className="text-gray-500 text-lg">
            프로젝트 정보를 수정할 수 있습니다.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-red-600">
            <p>{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-10 mb-12"
        >
          {/* 기본 정보 섹션 */}
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 pb-3 border-b border-gray-100">
              기본 정보
            </h2>

            <div className="space-y-7">
              <div>
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium mb-2"
                >
                  프로젝트 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={basicInfo.title}
                  onChange={handleBasicInfoChange}
                  className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="summary"
                  className="block text-gray-700 font-medium mb-2"
                >
                  프로젝트 요약 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={basicInfo.summary}
                  onChange={handleBasicInfoChange}
                  className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                  rows={3}
                  required
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="githubUrl"
                  className="block text-gray-700 font-medium mb-2"
                >
                  GitHub URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  value={basicInfo.githubUrl}
                  onChange={handleBasicInfoChange}
                  className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                  placeholder="https://github.com/username/repository"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    시작 날짜 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={basicInfo.startDate}
                    onChange={handleBasicInfoChange}
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    종료 날짜
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={basicInfo.endDate}
                    onChange={handleBasicInfoChange}
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-gray-700 font-medium mb-2"
                >
                  역할 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={basicInfo.role}
                  onChange={handleBasicInfoChange}
                  className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                  placeholder="풀스택 개발자, 프론트엔드 개발자 등"
                  required
                />
              </div>
            </div>
          </section>

          {/* 기술 스택 섹션 */}
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 pb-3 border-b border-gray-100">
              기술 스택
            </h2>

            <div className="space-y-5">
              <div>
                <div className="flex">
                  <input
                    type="text"
                    value={technology}
                    onChange={(e) => setTechnology(e.target.value)}
                    onKeyDown={handleTechnologyKeyDown}
                    className="flex-1 px-5 py-3.5 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                    placeholder="사용한 기술 입력 (예: React, TypeScript, Node.js)"
                  />
                  <button
                    type="button"
                    onClick={handleAddTechnology}
                    className="px-7 py-3.5 bg-accent-500 text-white rounded-r-xl hover:bg-accent-600 transition-colors"
                  >
                    추가
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter 키를 눌러 기술을 추가할 수 있습니다.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-3">
                {technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-50 rounded-full text-accent-700 hover:bg-accent-100 transition-colors"
                  >
                    <span className="text-sm">{tech}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTechnology(tech)}
                      className="text-accent-400 hover:text-red-500 transition-colors"
                    >
                      <i className="fas fa-times-circle"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 주요 기능 섹션 */}
          <FeatureForm
            features={features}
            handleFeatureChange={handleFeatureChange}
            handleRemoveFeature={handleRemoveFeature}
            handleAddFeature={handleAddFeature}
            handleFileUpload={handleFileUpload}
            setFeatureFileInputRef={setFeatureFileInputRef}
          />

          {/* 실제 구현 화면 섹션 */}
          <ScreenshotForm
            screenshots={screenshots}
            handleScreenshotChange={handleScreenshotChange}
            handleRemoveScreenshot={handleRemoveScreenshot}
            handleAddScreenshot={handleAddScreenshot}
            handleFileUpload={handleFileUpload}
            setScreenshotFileInputRef={setScreenshotFileInputRef}
          />

          {/* 도전 과제 섹션 */}
          <ChallengeForm
            challenges={challenges}
            handleChallengeChange={handleChallengeChange}
            handleRemoveChallenge={handleRemoveChallenge}
            handleAddChallenge={handleAddChallenge}
          />

          {/* 고정 프로젝트 체크박스 */}
          <div className="flex items-center mb-8 p-5 bg-accent-50 rounded-xl">
            <input
              type="checkbox"
              id="pin"
              checked={pin}
              onChange={handlePinChange}
              className="w-5 h-5 text-accent-600 border-gray-300 rounded focus:ring-accent-500"
            />
            <label
              htmlFor="pin"
              className="ml-3 block text-gray-700 font-medium"
            >
              이 프로젝트를 프로필에 고정하기
            </label>
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-end gap-4 mt-10 pt-8 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="px-7 py-3.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-7 py-3.5 bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors flex items-center justify-center min-w-[120px] shadow-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>수정 중...
                </>
              ) : (
                "수정하기"
              )}
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default ProjectUpdate;
