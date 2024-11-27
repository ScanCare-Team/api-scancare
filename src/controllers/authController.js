const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { db } = require('../config/firestore');

// Registrasi
const register = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref('password'),
    name: Joi.string().required(),
  });

  const { error } = schema.validate({ email, password, confirmPassword, name });
  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message,
    });
  }

  try {
    const userRef = db.collection('users').doc(email);

    const userDoc = await userRef.get();
    if (userDoc.exists) {
      return res.status(400).json({
        status: 'fail',
        message: 'Pengguna dengan email ini sudah terdaftar.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userRef.set({
      email,
      name,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.status(201).json({
      status: 'success',
      message: 'Pendaftaran berhasil.',
    });
  } catch (error) {
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

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate({ email, password });
  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message,
    });
  }

  try {
    const userRef = db.collection('users').doc(email);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({
        status: 'fail',
        message: 'Pengguna tidak ditemukan.',
      });
    }

    const user = userDoc.data();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 'fail',
        message: 'Password salah.',
      });
    }

    const token = jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

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
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  const { email, fullName, oldPassword, newPassword, confirmNewPassword } = req.body;

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
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message,
    });
  }

  try {
    const userRef = db.collection('users').doc(email);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({
        status: 'fail',
        message: 'Pengguna tidak ditemukan.',
      });
    }

    const user = userDoc.data();

    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          status: 'fail',
          message: 'Password lama tidak sesuai.',
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await userRef.update({ password: hashedPassword });
    }

    if (fullName) {
      await userRef.update({ name: fullName });
    }

    res.status(200).json({
      status: 'success',
      message: 'Profil berhasil diperbarui.',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};

module.exports = { register, login, updateProfile };
