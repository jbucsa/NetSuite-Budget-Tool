/**
 * @NScriptName HITC Budget Dataset
 * @NScriptType DataSetBuilderPlugin
 * @NApiVersion 2.1
 */
define(["require", "exports", "N/dataset"], function (require, exports, dataset) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createDataset = createDataset;
    // import query = require("N/query");
    function createDataset(context) {
        const budgetLines = dataset.createJoin({ fieldId: 'budgetmachine' });
        context.dataset = dataset.create({
            type: 'budgets',
            name: 'HITC Budget (SDF)',
            columns: [
                dataset.createColumn({ fieldId: 'account', alias: 'Account' }),
                dataset.createColumn({ fieldId: 'department', alias: 'Department' }),
                dataset.createColumn({ fieldId: 'period', join: budgetLines, alias: 'Period' }),
                dataset.createColumn({ fieldId: 'amount', join: budgetLines, alias: 'Amount' })
            ]
        });
    }
});
