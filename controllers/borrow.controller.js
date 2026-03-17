const Book = require("../models/Book.model")
const Borrow = require("../models/Borrow.model")


const borrowBook = async (req, res) => {
    try {
        const { bookId } = req.body
        const book = await Book.findById(bookId)
        if (!book) {
            return res.status(404).json({ error: "Kitob topilmadi" })
        }
        if (book.quantity === 0) {
            return res.status(400).json({ error: "Kitob qolmagan" })
        }

        const already = await Borrow.findOne({
            book: bookId, user: req.user.id, status: "borrowed"
        })
        if (already) {
            return res.status(400).json({ error: "Siz bu kitobni allaqachon olgansiz!!!" })
        }
        const borrow = new Borrow({
            book: bookId,
            user: req.user.id,
            status: "borrowed"
        })
        await borrow.save()
        book.quantity -= 1
        await book.save()
        res.status(200).json({ message: "Kitob olindi" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const returnBook = async (req, res) => {
    try {
        const { id } = req.params
        const borrow = await Borrow.findById(id)
        if (!borrow) {
            return res.status(400).json({ error: "Topilmadi" })
        }
        if (borrow.status === "returned") {
            return res.status(400).json({ error: "Allaqachon qaytarilgan" })
        }
        borrow.status = "returned"
        borrow.returnedAt = new Date()
        await borrow.save()

        const book = await Book.findById(borrow.book)
        book.quantity += 1
        await book.save()

        res.status(200).json({ message: "Kitob qaytarildi" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const myBooks = async (req, res) => {
    try {
        const books = await Borrow.find({ user: req.user.id, status: "borrowed" }).populate("book")
        res.json(books)
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

const borrows = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(400).json({ error: "Siz bu amalni bajarish uchun yetarli rolga ega emansiz" })
        }
        const books = await Borrow.find().populate("book")
        res.json(books)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { borrowBook, returnBook, myBooks, borrows }