const Book = require("../models/Book.model")
const Borrow = require("../models/Borrow.model")

const borrowBook = async (req, res) => {
    try {
        const { bookId, userId } = req.body
        const book = await book.findById(bookId)
        if(!book){
            return res.status(404).json({ error: "Kitob topilmadi"})
        }
        if (book.quantity === 0) {
            return res.status(400).json({ error: "Kitob qolmagan"})
        }

        const already = await Borrow.findOne({
            book: bookId, user: userId, status: "borrowed"
        })
        if (already){
            return res.status(400).json({ error: "Siz bu kitobni allaqachon olgansiz!!!"})
        }
        const borrow = new Borrow({
            book: bookId,
            user: userId,
            status: "borrowed"
        })
        await borrow.save()
        book.quantity -= 1
        await book.save()
        return res.status(200).json({ message: "Kitob olindi"})
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}
