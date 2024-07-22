export const convertBase64ToFile = (base64String, fileName, fileType) => {
  try {
    // Kiểm tra xem chuỗi Base64 có chứa "base64," không
    if (!base64String.includes("base64,")) {
      throw new Error("Chuỗi Base64 không hợp lệ.");
    }

    const base64Part = base64String.split(",")[1]; // Lấy phần Base64
    if (!base64Part) {
      throw new Error("Chuỗi Base64 không chứa dữ liệu hợp lệ.");
    }

    const byteString = atob(base64Part); // Giải mã Base64
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: fileType });
    return new File([blob], fileName, { type: fileType });
  } catch (error) {
    console.error("Lỗi khi chuyển đổi Base64 sang File:", error);
    return null;
  }
};
