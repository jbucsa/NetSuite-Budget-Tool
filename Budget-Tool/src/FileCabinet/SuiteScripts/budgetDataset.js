/**
 * @NScriptName HITC Budget Dataset
 * @NScriptType DataSetBuilderPlugin
 * @NApiVersion 2.1
 */
define(["require", "exports", "N/dataset", "N/query"], function (require, exports, dataset, query) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createDataset = createDataset;
    function createDataset(context) {
        const budgetLines = dataset.createJoin({ fieldId: 'budgetmachine' });
        context.dataset = dataset.create({
            type: 'budgets',
            name: 'HITC Budget (SDF)',
            // Note in this example, '358' is the value for query condition that only shows values for 2022. This value may change from company to company. Check XML export of a filter to see what the query condition is set too. 
            condition: dataset.createCondition({ column: dataset.createColumn({ fieldId: 'year' }), operator: query.Operator.ANY_OF, values: ['358'] }),
            columns: [
                dataset.createColumn({ fieldId: 'account', alias: 'Account' }),
                dataset.createColumn({ fieldId: 'department', alias: 'Department' }),
                dataset.createColumn({ fieldId: 'period', join: budgetLines, alias: 'Period' }),
                dataset.createColumn({ fieldId: 'amount', join: budgetLines, alias: 'Amount' })
            ]
        });
    }
});
