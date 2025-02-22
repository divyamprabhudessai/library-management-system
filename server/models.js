const { DataTypes } = require("sequelize");
const { sequelize } = require("./db.js");

//Member Table
const Member = sequelize.define(
  "Member",
  {
    mem_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mem_name: { type: DataTypes.STRING, allowNull: false },
    mem_phone: { type: DataTypes.STRING, allowNull: false },
    mem_email: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "member", timestamps: false }
);

// Membership Table
const Membership = sequelize.define(
  "Membership",
  {
    membership_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    member_id: { 
      type: DataTypes.INTEGER, 
      references: { model: Member, key: "mem_id" } 
    },
    status: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "membership", timestamps: false }
);

// Book Table
const Book = sequelize.define(
  "Book",
  {
    book_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    book_name: { type: DataTypes.STRING, allowNull: false },
    book_cat_id: { type: DataTypes.INTEGER, allowNull: false },
    book_collection_id: { type: DataTypes.INTEGER, allowNull: false },
    book_launch_date: { type: DataTypes.DATE, allowNull: false },
    book_publisher: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "book", timestamps: false }
);

// Issuance Table
const Issuance = sequelize.define(
  "Issuance",
  {
    issuance_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    book_id: { 
      type: DataTypes.INTEGER, 
      references: { model: Book, key: "book_id" } 
    },
    issuance_member: { 
      type: DataTypes.INTEGER, 
      references: { model: Member, key: "mem_id" } 
    },
    issued_by: { type: DataTypes.STRING, allowNull: false },
    target_return_date: { type: DataTypes.DATE, allowNull: false },
    issuance_status: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "issuance", timestamps: false }
);

// Relationships (Fixed Foreign Keys)
Member.hasOne(Membership, { foreignKey: "member_id" });
Membership.belongsTo(Member, { foreignKey: "member_id" });

Member.hasMany(Issuance, { foreignKey: "issuance_member" });
Issuance.belongsTo(Member, { foreignKey: "issuance_member" });

Book.hasMany(Issuance, { foreignKey: "book_id" });
Issuance.belongsTo(Book, { foreignKey: "book_id" });

// Function to Fetch Member with Membership Status
const getMembersWithMembership = async () => {
  return await Member.findAll({
    include: [{ model: Membership, attributes: ["status"] }],
  });
};

module.exports = { Member, Membership, Book, Issuance, sequelize, getMembersWithMembership };
