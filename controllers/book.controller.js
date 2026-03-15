const Book = require("../models/Book.model")

const createBook = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(404).json({ error: "Admin faqat kitob qo'shish imkoniyati mavjud" })
        }
        const { title, author, genre, quantity } = req.body
        const newBook = new Book({ title, author, genre, quantity })
        await newBook.save()
        res.status(201).json({ message: "Kitob qo'shildi", newBook })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateBook = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(404).json({ error: "Admin faqat kitob o'zgartirish imkoniyati mavjud" })
        }
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!book) {
            return res.status(404).json({ error: "Kitob topilmadi" })
        }
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteBook = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(404).json({ error: "Admin faqat kitob o'chirish imkoniyati mavjud" })
        }
        const book = await Book.findByIdAndDelete(req.params.id)
        if (!book) {
            return res.status(404).json({ error: "Kitob topilmadi" })
        }
        res.status(200).json({ message: "Kitob o'chirildi" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { createBook, getAllBooks, updateBook, deleteBook }