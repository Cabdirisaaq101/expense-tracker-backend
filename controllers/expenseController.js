import prisma from "../config/db.js";

export const createExpense = async (req, res) => {
    try {
      const { title, amount, category, date } = req.body;
  
      if (!title || !amount || !category) {
        return res.status(400).json({ message: "Title, amount, and category are required" });
      }
  
      const expense = await prisma.expense.create({
        data: {
          title,
          amount: parseFloat(amount),
          category,
          date: date ? new Date(date) : new Date(), // ✅ use provided date or now
          userId: req.user.id,
        },
      });
  
      res.status(201).json(expense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating expense" });
    }
  };
  

// Get All Expenses for Logged-in User
export const getExpenses = async (req, res) => {
    try {
        const expenses = await prisma.expense.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: "desc" },
        });

        res.json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching expenses" });
    }
};

// Update Expense
export const updateExpense = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, amount, category, date } = req.body;
  
      const expense = await prisma.expense.findUnique({ where: { id } });
  
      if (!expense || expense.userId !== req.user.id) {
        return res.status(404).json({ message: "Expense not found" });
      }
  
      const updatedExpense = await prisma.expense.update({
        where: { id },
        data: {
          title,
          amount: parseFloat(amount),
          category,
          date: new Date(date), // ✅ update date too
        },
      });
  
      res.json(updatedExpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating expense" });
    }
  };
  

// Delete Expense
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const expense = await prisma.expense.findUnique({ where: { id } });

        if (!expense || expense.userId !== req.user.id) {
            return res.status(404).json({ message: "Expense not found" });
        }

        await prisma.expense.delete({ where: { id } });

        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting expense" });
    }
};
