const cron = require('node-cron')
const FixedModel = require('../models/Fixed-model')
const DebtModel = require('../models/Debt-model')
const ItemModel = require('../models/Item-model')

async function getFixedExpenses() {
    FixedModel
    .find({})
    .then(doc => scheduleDebts(doc))
    .catch(err => console.log(err))
}

function scheduleDebts(fixedExpenses) {
    fixedExpenses.forEach(fixedExpense => {
        return cron.schedule(`1 0 1 * *`, async () => {
            await generateDebtFrom(fixedExpense)
        })
    })
}

function generateDebtFrom(fixedExpense) {
    let newDebt = new DebtModel({
        amount: fixedExpense.amount,
        generatedBy: 'node-cron',
        generatedOn: new Date(),
        isRecurrent: true,
        concept: fixedExpense.concept,
        dueBy: fixedExpense.dueBy
    })

    newDebt.save()
        .then(doc => console.log(doc))
        .catch(err => console.error(err))
}   


function generateDebts() {
    getFixedExpenses()
}

module.exports = generateDebts

// Get fixedExpenses
// Generate debts through cronjob
// 