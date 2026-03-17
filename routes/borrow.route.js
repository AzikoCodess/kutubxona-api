//   - /borrow → kitob olish, qaytarish, o'z kitoblari

const express = require("express")
const router = express.Router()
const { borrowBook, returnBook, myBooks, borrows } = require("../controllers/borrow.controller")
const authMiddleware = require("../middleware/auth.middleware")

/**
 * @swagger
 * /borrow/take:
 *   post:
 *     summary: Kitob olish
 *     tags: [Borrow]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *             properties:
 *               bookId:
 *                 type: string
 *                 example: 69b82dc5ae76a9ec68a5eed4
 *
 *     responses:
 *       200:
 *         description: Kitob olindi
 *
 *       400:
 *         description: Kitob qolmagan yoki oldin olingan
 *
 *       404:
 *         description: Kitob topilmadi
 *
 *       500:
 *         description: Server xatosi
 */
router.post("/take", authMiddleware, borrowBook)

/**
 * @swagger
 * /borrow/return/{id}:
 *   put:
 *     summary: Kitob qaytarish
 *     tags: [Borrow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Borrow ID
 *     responses:
 *       200:
 *         description: Kitob qaytarildi
 *       400:
 *         description: Allaqachon qaytarilgan yoki topilmadi
 *       500:
 *         description: Server xatosi
 */
router.put("/return/:id", authMiddleware, returnBook)

/**
 * @swagger
 * /borrow/my:
 *   get:
 *     summary: Foydalanuvchining olgan kitoblari
 *     tags: [Borrow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kitoblar ro'yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/my", authMiddleware, myBooks)

/**
 * @swagger
 * /borrow/all:
 *   get:
 *     summary: Barcha olingan kitoblarni ko'rish (admin)
 *     tags: [Borrow]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Borrow list
 *
 *       400:
 *         description: Ruxsat yo'q
 *
 *       500:
 *         description: Server xatosi
 */
router.get("/all", authMiddleware, borrows)

module.exports = router;