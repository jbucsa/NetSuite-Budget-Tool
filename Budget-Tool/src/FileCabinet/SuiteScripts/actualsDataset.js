/**
 * @NScriptName HITC Actual Dataset
 * @NScriptType DataSetBuilderPlugin
 * @NApiVersion 2.1
 */
define(["require", "exports", "N/dataset", "N/query"], function (require, exports, dataset, query) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createDataset = createDataset;
    function createDataset(context) {
        // Creating an Item condition requires a join on transactions lines.
        const lineJoin = dataset.createJoin({ fieldId: 'transactionlines' });
        const itemColumn = dataset.createColumn({ fieldId: 'item', join: lineJoin });
        const itemCondition = dataset.createCondition({ column: itemColumn, operator: query.Operator.ANY_OF_NOT, values: [null] });
        // First step in creating a condition column is creating a type column constant.
        const typeColumn = dataset.createColumn({ fieldId: 'type' });
        const typeCondition = dataset.createCondition({ column: typeColumn, operator: query.Operator.ANY_OF, values: ['VendBill'] });
        // Now we will create a Date range in for the filter. Which is tricky. We are going to use 'TY' for 'This Year'. Again this is a value from the XML file and we did not create it. 
        const dataColumn = dataset.createColumn({ fieldId: 'trendate' });
        const dateCondition = dataset.createCondition({
            column: dataColumn,
            operator: query.Operator.WITHIN,
            values: [{ type: 'start', dateId: 'TY' }, { type: 'end', dateId: 'TY' }]
        });
        context.dataset = dataset.create({
            type: 'transactions',
            name: 'HITC Actual(SDF)',
            condition: dataset.createCondition({ operator: 'AND', children: [typeCondition, dateCondition, itemCondition] }),
            columns: [
                dataColumn,
                dataset.createColumn({ fieldId: 'entity' }),
                dataset.createColumn({ fieldId: 'trandisplayname' }),
                typeColumn,
                itemColumn,
                dataset.createColumn({ fieldId: 'department', join: lineJoin, alias: 'Department' }),
                dataset.createColumn({ fieldId: 'postingperiod', alias: 'Period' }),
                dataset.createColumn({ formula: 'ABS(TO_NUMBER({transactionlines.foreignamount})', label: 'Amount', type: 'Float', alias: 'Amount' }),
            ]
        });
    }
});
