const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { db } = require('../config/firestore');

// Registrasi
const register = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;

  // Validasi Input
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref('password'),
    name: Joi.string().required(),
  });

  const { error } = schema.validate({ email, password, confirmPassword, name });
  if (error) {
    console.error('Validation error during registration:', error.details[0].message);
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message,
    });
  }

  try {
    const userRef = db.collection('users').doc(email);

    // Cek apakah email sudah terdaftar
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      console.error('Email already registered:', email);
      return res.status(400).json({
        status: 'fail',
        message: 'Pengguna dengan email ini sudah terdaftar.',
      });
    }

    // Hash password dan simpan data ke Firestore
    const hashedPassword = await bcrypt.hash(password, 10);
    await userRef.set({
      email,
      name,
      password: hashedPassword,
      createdAt: new Date(),
    });

    console.log('User registered successfully:', email);
    res.status(201).json({
      status: 'success',
      message: 'Pendaftaran berhasil.',
    });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validasi Input
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate({ email, password });
  if (error) {
    console.error('Validation error during login:', error.details[0].message);
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message,
    });
  }

  try {
    const userRef = db.collection('users').doc(email);
    const userDoc = await userRef.get();

    // Jika user tidak ditemukan
    if (!userDoc.exists) {
      console.error('User not found:', email);
      return res.status(404).json({
        status: 'fail',
        message: 'Pengguna tidak ditemukan.',
      });
    }

    const user = userDoc.data();
    console.log('User data fetched:', user);

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Password mismatch for user:', email);
      return res.status(400).json({
        status: 'fail',
        message: 'Password salah.',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Login successful:', email);
    res.status(200).json({
      status: 'success',
      message: 'Login berhasil.',
      data: {
        email: user.email,
        name: user.name,
        token,
      },
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};

// Get user data by email
const getUserData = async (req, res) => {
  const { email } = req.params;
  try {
    const userRef = db.collection('users').doc(email.toLowerCase());
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({
        status: 'fail',
        message: 'Pengguna tidak ditemukan.',
      });
    }

    const user = userDoc.data();
    delete user.password;

    if (user.createdAt) {
      user.createdAt = user.createdAt.toDate().toISOString();
    }

    return res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};

// Update Profil
const updateProfile = async (req, res) => {
  const { email, fullName, oldPassword, newPassword, confirmNewPassword } = req.body;

  // Validasi Input
  const schema = Joi.object({
    email: Joi.string().email().required(),
    fullName: Joi.string().optional(),
    oldPassword: Joi.string().optional(),
    newPassword: Joi.string().min(6).optional(),
    confirmNewPassword: Joi.ref('newPassword'),
  });

  const { error } = schema.validate({
    email,
    fullName,
    oldPassword,
    newPassword,
    confirmNewPassword,
  });
  if (error) {
    console.error('Validation error during profile update:', error.details[0].message);
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message,
    });
  }

  try {
    const userRef = db.collection('users').doc(email);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.error('User not found:', email);
      return res.status(404).json({
        status: 'fail',
        message: 'Pengguna tidak ditemukan.',
      });
    }

    const user = userDoc.data();

    // Jika ada permintaan update password
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        console.error('Old password mismatch for user:', email);
        return res.status(400).json({
          status: 'fail',
          message: 'Password lama tidak sesuai.',
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await userRef.update({ password: hashedPassword });
      console.log('Password updated successfully:', email);
    }

    // Update nama jika diperlukan
    if (fullName) {
      await userRef.update({ name: fullName });
      console.log('Name updated successfully:', email);
    }

    res.status(200).json({
      status: 'success',
      message: 'Profil berhasil diperbarui.',
    });
  } catch (error) {
    console.error('Error during profile update:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};

module.exports = { register, login, updateProfile, getUserData };
