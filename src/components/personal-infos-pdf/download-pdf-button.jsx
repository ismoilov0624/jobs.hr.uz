// DownloadPDFButton.js
import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PersonalInfosPDF from "./personal-infos-pdf";

const DownloadPDFButton = () => (
  <PDFDownloadLink
    document={<PersonalInfosPDF />}
    fileName="personal-infos.pdf"
  >
    {({ loading }) =>
      loading ? "Yuklanmoqda..." : <button>PDF yuklab olish</button>
    }
  </PDFDownloadLink>
);

export default DownloadPDFButton;
