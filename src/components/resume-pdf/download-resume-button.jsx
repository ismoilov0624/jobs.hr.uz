"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./resume-pdf";
import { Download } from "lucide-react";
import {
  useUserProfile,
  usePrivateInfo,
  useEducations,
  useExperiences,
  useLanguages,
  useRelatives,
} from "../../hooks/useUser";

// Create a function to generate a filename based on user data
const createPdfFilename = (userData) => {
  if (!userData) return "resume.pdf";

  const lastName = userData.lastName || "";
  const firstName = userData.firstName || "";
  const fatherName = userData.fatherName || "";

  // Combine the names, filter out empty strings, and join with underscore
  const nameParts = [lastName, firstName, fatherName].filter(
    (part) => part.trim() !== ""
  );

  if (nameParts.length === 0) return "resume.pdf";

  return `${nameParts.join(" ")} resume.pdf`;
};

const DownloadResumeButton = ({
  // Props for admin view (when viewing other user)
  userData,
  privateInfo,
  educations,
  experiences,
  languages,
  relatives,
  isViewMode = false,
  // Props for regular user view
  userProfile,
}) => {
  // Hooks for current user data (only used when no props are passed)
  const { data: currentUserProfile } = useUserProfile();
  const { data: currentPrivateInfo } = usePrivateInfo();
  const { data: currentEducations } = useEducations();
  const { data: currentExperiences } = useExperiences();
  const { data: currentLanguages } = useLanguages();
  const { data: currentRelatives } = useRelatives();

  // Determine which data to use
  const finalUserData = userData || userProfile || currentUserProfile;
  const finalPrivateInfo = privateInfo || currentPrivateInfo;
  const finalEducations = educations || currentEducations || [];
  const finalExperiences = experiences || currentExperiences || [];
  const finalLanguages = languages || currentLanguages || [];
  const finalRelatives = relatives || currentRelatives || [];

  // Generate the filename based on user data
  const filename = createPdfFilename(finalUserData);

  return (
    <div
      className={`download-resume-container ${isViewMode ? "view-mode" : ""}`}
    >
      <PDFDownloadLink
        document={
          <ResumePDF
            userData={finalUserData}
            privateInfo={finalPrivateInfo}
            educations={finalEducations}
            experiences={finalExperiences}
            languages={finalLanguages}
            relatives={finalRelatives}
            isViewMode={isViewMode}
          />
        }
        fileName={filename}
        style={{ textDecoration: "none" }}
      >
        {({ loading }) => (
          <button
            className="download-resume-button"
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: isViewMode ? "10px 16px" : "12px 20px",
              backgroundColor: isViewMode ? "#10b981" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: isViewMode ? "6px" : "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              opacity: loading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = isViewMode
                  ? "#059669"
                  : "#218838";
                e.target.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = isViewMode
                  ? "#10b981"
                  : "#28a745";
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            <Download size={18} />
            {loading ? "PDF tayyorlanmoqda..." : "Resume yuklab olish"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default DownloadResumeButton;
