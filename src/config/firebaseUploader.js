const admin = require('firebase-admin');

// Cấu hình kết nối với dự án Firebase
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://baemin-85d9e.appspot.com',
});

// Tải lên ảnh lên Firebase Storage
const uploadImage = async (localFilePath, fileName) => {
    try {
      const bucket = admin.storage().bucket();
  
      await bucket.upload(localFilePath, {
        destination: fileName,
      });
  
      console.log('Tải lên thành công!');
      const file = bucket.file(fileName);
      const downloadURL = await file.getSignedUrl({
        action: 'read',
        expires:'10-06-2040'
      });
      return downloadURL[0];
    } catch (error) {
      console.error('Lỗi:', error);
      throw error;
    }
  };
  

module.exports = {
  uploadImage
};
