const Expense = require("../models/Expense");

exports.getExp = async (req, res, next) => {
  try {
    const expense = await Expense.findAll();
    res.status(200).json({ allExp: expense });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.addExp = async (req, res, next) => {
  try {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const data = await Expense.create({
      amount: amount,
      description: description,
      category: category,
    });
    res.status(201).json({ newExp: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

exports.deleteExp = async (req, res, next) => {
  try {
    const uId = req.params.expID;
    await Expense.destroy({ where: { id: uId } });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
