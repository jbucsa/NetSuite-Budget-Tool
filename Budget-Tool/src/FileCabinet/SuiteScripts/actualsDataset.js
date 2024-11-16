/**
 * @NScriptName HITC Actual Dataset
 * @NScriptType DataSetBuilderPlugin
 * @NApiVersion 2.1
 */
define(["require", "exports", "N/dataset"], function (require, exports, dataset) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createDataset = createDataset;
    // Query operator is used to create a condition that allows us to use filters.
    // import query = require("N/query");
    function createDataset(context) {
        // const budgetLines =  dataset.createJoin({fieldId: 'budgetmachine'});
        context.dataset = dataset.create({
            type: 'transactions',
            name: 'HITC Actual(SDF)',
            condition: null,
            columns: [
                dataset.createColumn({ fieldId: 'entity' }),
                dataset.createColumn({ fieldId: 'trandisplayname' }),
            ]
        });
    }
});
