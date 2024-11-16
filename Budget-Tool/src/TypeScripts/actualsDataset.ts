/**
 * @NScriptName HITC Actual Dataset
 * @NScriptType DataSetBuilderPlugin
 * @NApiVersion 2.1
 */

import {EntryPoints} from "N/types";
import dataset = require("N/dataset");
// Query operator is used to create a condition that allows us to use filters.
import query = require("N/query");

export function createDataset(context: EntryPoints.Plugins.DatasetBuilder.createDatasetContext){
    // Creating an Item condition requires a join on transactions lines.
    const lineJoin = dataset.createJoin({fieldId: 'transactionlines'});
    const itemColumn = dataset.createColumn({fieldId:'item', join: lineJoin});
    const itemCondition =  dataset.createCondition({column: itemColumn, operator: query.Operator.ANY_OF_NOT, values:[null]});

    // First step in creating a condition column is creating a type column constant.
    const typeColumn = dataset.createColumn({fieldId: 'type'});
    const typeCondition = dataset.createCondition({column: typeColumn, operator: query.Operator.ANY_OF, values: ['VendBill']});
    // Now we will create a Date range in for the filter. Which is tricky. We are going to use 'TY' for 'This Year'. Again this is a value from the XML file and we did not create it. 

    const dataColumn = dataset.createColumn({fieldId: 'trendate'});
    const dateCondition = dataset.createCondition({
        column: dataColumn,
        operator: query.Operator.WITHIN,
        values: [{ type: 'start', dateId: 'TY'}, {type: 'end', dateId: 'TY'}]
    });
    
    context.dataset = dataset.create({
        type: 'transactions',
        name: 'HITC Actual(SDF)',
        condition: dataset.createCondition({operator: 'AND', children:[typeCondition, dateCondition, itemCondition]}),
        columns:[
            dataColumn,
            dataset.createColumn({fieldId: 'entity'}),
            dataset.createColumn({fieldId: 'trandisplayname'}),
            typeColumn,
            itemColumn,
        ]
    });
}