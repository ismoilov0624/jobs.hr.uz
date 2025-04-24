// PersonalInfosPDF.js
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Styles for the PDF
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 15 },
  title: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
  infoItem: { flexDirection: "row", marginBottom: 5 },
  label: { width: "40%", fontWeight: "bold" },
  value: { width: "60%" },
});

// PDF Layout Component
const PersonalInfosPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Profil</Text>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Ism familiya:</Text>
          <Text style={styles.value}>Noma'lum</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>Ishsiz</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Aloqa ma'lumotlari</Text>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Aloqa:</Text>
          <Text style={styles.value}>Noma'lum</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Qo'shimcha aloqa:</Text>
          <Text style={styles.value}>Noma'lum</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>Noma'lum</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Shaxsiy ma'lumotlar</Text>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Jinsi:</Text>
          <Text style={styles.value}>Noma'lum</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Tug'ilgan kuni:</Text>
          <Text style={styles.value}>Noma'lum</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PersonalInfosPDF;
