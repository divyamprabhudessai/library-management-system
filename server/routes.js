const express = require("express");
const { Book, Issuance,Member, sequelize } = require("./models.js");
const { Op } = require("sequelize");

const router = express.Router();

// 📌 GET all books
router.get("/books", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

// 📌 Add a new book
router.post("/newbook", async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
});

// 📌 Books never borrowed
router.get("/never-borrowed", async (req, res) => {
  const books = await Book.findAll({
    where: {
      book_id: { [Op.notIn]: sequelize.literal("(SELECT book_id FROM issuance)") },
    },
  });
  res.json(books);
});

// 📌 Outstanding books
router.get("/outstanding", async (req, res) => {
    try {
      const books = await Issuance.findAll({
        where: { issuance_status: "Issued" },
        include: [
          { model: Book },  // ✅ Proper model reference
          { model: Member }  // ✅ Proper model reference
        ],
      });
  
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

// 📌 Top 10 most borrowed books
router.get("/top-borrowed", async (req, res) => {
    try {
      const books = await Issuance.findAll({
        attributes: [
          [sequelize.col("Issuance.book_id"), "book_id"],  // ✅ Specify table explicitly
          [sequelize.fn("COUNT", sequelize.col("Issuance.book_id")), "borrow_count"],
        ],
        include: [{ model: Book }], // ✅ Correct relationship
        group: ["Issuance.book_id", "Book.book_id"], // ✅ Ensure full qualification
        order: [[sequelize.literal("borrow_count"), "DESC"]],
        limit: 10,
      });
  
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

module.exports = router;
