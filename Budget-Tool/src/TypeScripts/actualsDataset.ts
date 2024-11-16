/**
 * @NScriptName HITC Actual Dataset
 * @NScriptType DataSetBuilderPlugin
 * @NApiVersion 2.1
 */

import {EntryPoints} from "N/types";
import dataset = require("N/dataset");
// Query operator is used to create a condition that allows us to use filters.
// import query = require("N/query");

export function createDataset(context: EntryPoints.Plugins.DatasetBuilder.createDatasetContext){
    // const budgetLines =  dataset.createJoin({fieldId: 'budgetmachine'});
    context.dataset = dataset.create({
        type: 'transactions',
        name: 'HITC Actual(SDF)',
        condition: null,
        columns:[
            dataset.createColumn({fieldId: 'entity'}),
            dataset.createColumn({fieldId: 'trandisplayname'}),

        ]
    });
}