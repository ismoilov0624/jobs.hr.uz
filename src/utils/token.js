// JWT token'ni decode qilish uchun utility
export const decodeToken = (token) => {
  try {
    if (!token) return null;

    // JWT token 3 qismdan iborat: header.payload.signature
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    // Payload qismini decode qilish
    const payload = parts[1];

    // Base64 URL decode (JWT'da ishlatiladi)
    let decoded = payload.replace(/-/g, "+").replace(/_/g, "/");
    while (decoded.length % 4) {
      decoded += "=";
    }

    const decodedPayload = JSON.parse(atob(decoded));
    return decodedPayload;
  } catch (error) {
    console.error("Token decode qilishda xatolik:", error);
    return null;
  }
};

// Token'dan user ID olish
export const getUserIdFromToken = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return null;

  // Odatda JWT'da user ID quyidagi nomlar bilan bo'ladi
  return (
    decoded.userId ||
    decoded.id ||
    decoded.sub ||
    decoded.user_id ||
    decoded.uid ||
    null
  );
};

// Token'ning amal qilish muddatini tekshirish
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};
