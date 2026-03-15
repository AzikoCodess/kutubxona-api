//   - /books → CRUD (admin), ko'rish (hammaga)

const express = require("express");
const router = express.Router();
const { createBook, getAllBooks, updateBook, deleteBook } = require("../controllers/book.controller");
const authMiddleware = require("../middleware/auth.middleware");

/**
 * @swagger
 * /books/create:
 *   post:
 *     summary: Kitob qo'shish (admin)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *                 enum: [badiiy, ilmiy, tarix, biografiya, texnologiya, bolalar]
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Kitob qo'shildi
 *       404:
 *         description: Ruxsat yo'q
 *       500:
 *         description: Server xatosi
 */
router.post("/create", authMiddleware, createBook)

/**
 * @swagger
 * /books/allBooks:
 *   get:
 *     summary: Barcha kitoblarni olish
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Kitoblar ro'yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/allBooks", getAllBooks)

/**
 * @swagger
 * /books/update/{id}:
 *   put:
 *     summary: Kitobni o'zgartirish (admin)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - genre
 *               - quantity
 *             properties:
 *
 *               title:
 *                 type: string
 *                 example: Alkimyogar
 *
 *               author:
 *                 type: string
 *                 example: Paulo Coelho
 *
 *               genre:
 *                 type: string
 *                 enum:
 *                   - badiiy
 *                   - ilmiy
 *                   - tarix
 *                   - biografiya
 *                   - texnologiya
 *                   - bolalar
 *                 example: badiiy
 *
 *               quantity:
 *                 type: number
 *                 example: 5
 *
 *     responses:
 *       200:
 *         description: Kitob o'zgartirildi
 *
 *       404:
 *         description: Kitob topilmadi
 *
 *       500:
 *         description: Server xatosi
 */
router.put("/update/:id", authMiddleware, updateBook)

/**
 * @swagger
 * /books/delete/{id}:
 *   delete:
 *     summary: Kitobni o'chirish (admin)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kitob o'chirildi
 *       404:
 *         description: Kitob topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/delete/:id", authMiddleware, deleteBook)

module.exports = router;