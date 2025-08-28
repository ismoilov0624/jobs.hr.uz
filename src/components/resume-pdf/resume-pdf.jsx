import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import logo from "../../assets/logo.png";
import Roboto from "../../fonts/Roboto-Regular.ttf"; // 🔑 TTF faylni shu papkaga qo‘shing

// Kirilcha uchun shriftni ro‘yxatdan o‘tkazish
Font.register({
  family: "Roboto",
  src: Roboto,
});

// PDF uchun stillar
const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 57,
    paddingRight: 57,
    fontSize: 11,
    fontFamily: "Roboto", // 🔑 Shriftni Roboto qilib o‘zgartirdim
    lineHeight: 1.4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  logoSection: {
    width: 80,
    height: 80,
  },
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  titleSection: {
    flex: 1,
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileImageSection: {
    width: 80,
    height: 80,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 5,
  },
  emptyProfileImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  fullName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  currentPosition: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  leftColumn: {
    width: "40%",
    paddingRight: 10,
  },
  rightColumn: {
    width: "60%",
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    marginLeft: 5,
  },
  workExperience: {
    marginBottom: 8,
    paddingLeft: 20,
  },
  workPeriod: {
    fontWeight: "bold",
  },
  workDetails: {
    marginLeft: 20,
    marginTop: 2,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 5,
    paddingBottom: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    paddingRight: 5,
    fontSize: 10,
  },
  tableCellHeader: {
    flex: 1,
    paddingRight: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  relativesTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
    textAlign: "center",
  },
  profileImageInline: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  workExperienceCompact: {
    marginBottom: 8,
    paddingLeft: 0,
  },
});

// Formatlash funksiyalari
const formatDate = (dateString) => {
  if (!dateString) return "Noma'lum";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return "Noma'lum";
  }
};

const formatGender = (gender) => {
  const genderMap = {
    MALE: "Erkak",
    FEMALE: "Ayol",
  };
  return genderMap[gender] || "Noma'lum";
};

const formatStatus = (status) => {
  const statusMap = {
    UNEMPLOYED: "Ishsiz",
    EMPLOYED: "Ishlamoqda",
    SEARCHING: "Ish izlamoqda",
  };
  return statusMap[status] || "Noma'lum";
};

const formatValue = (value) => {
  return value && value !== "" ? value : "Noma'lum";
};

// Avatar URL yaratish funksiyasi
const getAvatarUrl = (avatar, isViewMode = false) => {
  if (!avatar || avatar === "rasm" || avatar === null || avatar === undefined) {
    return null;
  }

  if (isViewMode) {
    if (typeof avatar === "string" && !avatar.startsWith("http")) {
      return `https://api.sahifam.uz/uploads/${avatar}`;
    }
    if (avatar.startsWith("http")) {
      return avatar;
    }
  } else {
    if (typeof avatar === "string" && !avatar.startsWith("http")) {
      return `https://api.sahifam.uz/uploads/${avatar}`;
    }
    if (avatar.startsWith("http")) {
      return avatar;
    }
  }
  return null;
};

const ResumePDF = ({
  userData,
  privateInfo,
  educations = [],
  experiences = [],
  languages = [],
  relatives = [],
  isViewMode = false,
}) => {
  const fullName = [
    formatValue(userData?.lastName),
    formatValue(userData?.firstName),
    formatValue(userData?.fatherName),
  ]
    .filter((name) => name !== "Noma'lum")
    .join(" ");

  const currentPosition =
    experiences && experiences.length > 0
      ? experiences.find((exp) => exp.isPresent)?.position ||
        experiences[0]?.position
      : "Noma'lum";

  const currentOrganization =
    experiences && experiences.length > 0
      ? experiences.find((exp) => exp.isPresent)?.organization ||
        experiences[0]?.organization
      : "Noma'lum";

  const avatarUrl = getAvatarUrl(userData?.avatar, isViewMode);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Image style={styles.logo} src={logo || "/placeholder.svg"} />
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.title}>MA'LUMOTNOMA</Text>
            <Text style={styles.fullName}>{fullName}</Text>
            {currentPosition !== "Noma'lum" && (
              <Text style={styles.currentPosition}>
                {new Date().getFullYear()} yildan: "{currentOrganization}"{" "}
                {currentPosition}
              </Text>
            )}
          </View>
          <View style={styles.profileImageSection}>
            {avatarUrl ? (
              <Image
                style={styles.profileImage}
                src={avatarUrl || "/placeholder.svg"}
              />
            ) : (
              <View style={styles.emptyProfileImage} />
            )}
          </View>
        </View>

        {/* Shaxsiy ma'lumotlar */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <Text style={styles.label}>Tug‘ilgan yili:</Text>
              <Text>{formatDate(privateInfo?.birthDate)}</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.label}>Tug‘ilgan joyi:</Text>
              <Text>{formatValue(privateInfo?.birthPlace)}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <Text style={styles.label}>Millati:</Text>
              <Text>{formatValue(userData?.nationality)}</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.label}>Jinsi:</Text>
              <Text>{formatGender(privateInfo?.gender)}</Text>
            </View>
          </View>

          {educations && educations.length > 0 && (
            <View style={styles.row}>
              <View style={styles.leftColumn}>
                <Text style={styles.label}>Ma’lumoti:</Text>
                <Text>{formatValue(educations[0]?.degree)}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.label}>Tamomlagan:</Text>
                <Text>
                  {formatDate(educations[0]?.endDate)}{" "}
                  {formatValue(educations[0]?.schoolName)}
                </Text>
              </View>
            </View>
          )}

          {educations && educations.length > 0 && (
            <View style={styles.row}>
              <View style={styles.leftColumn}>
                <Text style={styles.label}>
                  Ma’lumoti bo‘yicha mutaxassisligi:
                </Text>
                <Text>{formatValue(educations[0]?.fieldOfStudy)}</Text>
              </View>
            </View>
          )}

          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <Text style={styles.label}>Yashash manzili:</Text>
              <Text>{formatValue(userData?.address)}</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.label}>Qaysi chet tillarni biladi:</Text>
              <Text>
                {languages && languages.length > 0
                  ? languages.map((lang) => lang.language).join(", ")
                  : "Noma'lum"}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <Text style={styles.label}>Telefon:</Text>
              <Text>{formatValue(userData?.phoneNumber)}</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.label}>Telegram:</Text>
              <Text>{formatValue(userData?.telegramUsername)}</Text>
            </View>
          </View>
        </View>

        {/* Mehnat faoliyati */}
        {experiences && experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>MEHNAT FAOLIYATI</Text>
            {experiences
              .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
              .map((exp, index) => (
                <View key={index} style={styles.workExperienceCompact}>
                  <Text>
                    {formatDate(exp.startDate)} -{" "}
                    {exp.isPresent ? "hozir" : formatDate(exp.endDate)}:{" "}
                    {formatValue(exp.organization)}, {formatValue(exp.position)}{" "}
                    - {formatValue(exp.responsibilities)}
                  </Text>
                </View>
              ))}
          </View>
        )}

        {/* Ta’lim */}
        {educations && educations.length > 1 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>TA’LIM</Text>
            {educations.map((edu, index) => (
              <View key={index} style={styles.workExperience}>
                <Text style={styles.workPeriod}>
                  {formatDate(edu.startDate)} -{" "}
                  {edu.isPresent ? "hozir" : formatDate(edu.endDate)}
                </Text>
                <View style={styles.workDetails}>
                  <Text>{formatValue(edu.schoolName)}</Text>
                  <Text>
                    {formatValue(edu.degree)} - {formatValue(edu.fieldOfStudy)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>

      {/* Qarindoshlar ma’lumoti */}
      {relatives && relatives.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.relativesTitle}>
              {fullName}ning yaqin qarindoshlari haqida MA’LUMOT
            </Text>

            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableCellHeader}>Qarindoshligi</Text>
                <Text style={styles.tableCellHeader}>
                  Familiyasi, ismi va otasining ismi
                </Text>
                <Text style={styles.tableCellHeader}>
                  Tug‘ilgan yili va joyi
                </Text>
                <Text style={styles.tableCellHeader}>Ish joyi</Text>
                <Text style={styles.tableCellHeader}>Turar joyi</Text>
              </View>

              {relatives.map((relative, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>
                    {formatValue(relative.relativeType)}
                  </Text>
                  <Text style={styles.tableCell}>
                    {formatValue(relative.fullName)}
                  </Text>
                  <Text style={styles.tableCell}>
                    {formatDate(relative.birthDate)},{" "}
                    {formatValue(relative.birthPlace)}
                  </Text>
                  <Text style={styles.tableCell}>
                    {formatValue(relative.workPlace)}
                  </Text>
                  <Text style={styles.tableCell}>
                    {formatValue(relative.address)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      )}
    </Document>
  );
};

export default ResumePDF;
