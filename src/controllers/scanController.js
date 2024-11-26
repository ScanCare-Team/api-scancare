const axios = require('axios');

const scanDocument = async (req, res) => {
  try {
    // mengirim token JWT di header Authorization
    const token = req.header('Authorization').replace('Bearer ', '');
    
    // Kirimkan file gambar yang diterima ke API Flask OCR
    const formData = new FormData();
    formData.append('file', req.file.buffer, req.file.originalname);

    const response = await axios.post(process.env.FLASK_API_URL, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    res.status(200).json({
      status: 'success',
      text: response.data.text,  
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan saat memproses dokumen.',
      error: error.message,
    });
  }
};

module.exports = { scanDocument };
