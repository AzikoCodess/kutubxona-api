const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { register, login } = require("../controllers/auth.controller");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Foydalanuvchi ro'yxatdan o'tadi
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User yaratildi
 *       500:
 *         description: Server xatosi
 */
router.post("/register", register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Tizimga kirish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Token qaytariladi
 *       404:
 *         description: User topilmadi
 *       500:
 *         description: Server xatosi
 */
router.post("/login", login)

module.exports = router