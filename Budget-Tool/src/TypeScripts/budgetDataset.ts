/**
 * @NScriptName HITC Budget Dataset
 * @NScriptType DataSetBuilderPlugin
 * @NApiVersion 2.1
 */

import {EntryPoints} from "N/types";
import dataset = require("N/dataset");
// import query = require("N/query");

export function createDataset(context: EntryPoints.Plugins.DatasetBuilder.createDatasetContext){
    context.dataset = dataset.create({
        type: 'budgets',
        name: 'HITC Budget (SDF)',
        columns:[
        dataset.createColumn({fieldId:'account', alias:'Account'}),
        dataset.createColumn({fieldId:'department', alias:'Department'}),
        ]
    });
}