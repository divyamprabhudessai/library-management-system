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
          { model: Book },  
          { model: Member }  
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
          [sequelize.col("Issuance.book_id"), "book_id"],  
          [sequelize.fn("COUNT", sequelize.col("Issuance.book_id")), "borrow_count"],
        ],
        include: [{ model: Book }],
        group: ["Issuance.book_id", "Book.book_id"],
        order: [[sequelize.literal("borrow_count"), "DESC"]],
        limit: 10,
      });
  
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// 📌 Members with books pending for return on a given date



router.get("/pending-returns", async (req, res) => {
  try {
    // 📌 Fetch all pending returns (books that are still "Issued")
    const pendingReturns = await Issuance.findAll({
      where: { issuance_status: "Issued" }, // Only issued books
      include: [
        { model: Book, attributes: ["book_name"] },  // Fetch book name only
        { model: Member, attributes: ["mem_name"] }, // Fetch member name only
      ],
      attributes: ["target_return_date"], // Fetch due date
    });

    // 📌 Format response
    const formattedResponse = pendingReturns.map((record) => ({
      member: record.Member?.mem_name || "Unknown", // Avoid null errors
      book: record.Book?.book_name || "Unknown",
      dueDate: record.target_return_date.toISOString().split("T")[0], // Extract 'YYYY-MM-DD'
    }));

    res.json(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 Total number of members
router.get("/total-members", async (req, res) => {
  try {
    const totalMembers = await Member.count();
    res.json({ totalMembers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 Total books that have been issued at least once
router.get("/total-issued-books", async (req, res) => {
  try {
    const totalIssuedBooks = await Issuance.count({
      distinct: true,
      col: "book_id",
    });
    res.json({ totalIssuedBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 Total number of pending returns
router.get("/total-pending-returns", async (req, res) => {
  try {
    const totalPendingReturns = await Issuance.count({
      where: { issuance_status: "Issued" },
    });
    res.json({ totalPendingReturns });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




  

module.exports = router;
