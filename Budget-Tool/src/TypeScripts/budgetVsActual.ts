/**
 * @NScriptName HITC Budget vs. Actual Dataset
 * @NScriptType DataSetBuilderPlugin
 * @NApiVersion 2.1
 */

import {EntryPoints} from "N/types";
import dataset = require('N/dataset');
import datasetLink = require('N/datasetLink');
import workbook = require('N/workbook');

export function createWorkbook( context: EntryPoints.Plugins.WorkbookBuilder.createWorkbookContext){
    const budgetDataset =  dataset.load({id: 'customerscript_hitc_budget_dataset'});
    const actualDataset = dataset.load({id: 'customerscript_hitc_actuals_dataset'});
    const budgetDepartment = budgetDataset.getExpressionFromColumn({alias: 'Department'});
    const expenseDepartment = actualDataset.getExpressionFromColumn({alias: 'Department'});
    const budgetPeriod = budgetDataset.getExpressionFromColumn({alias:'Period'});
    const expensePeriod = actualDataset.getExpressionFromColumn({alias:'Period'});
    const linkedDataset = datasetLink.create({
        datasets: [budgetDataset, actualDataset],
        expressions: [[budgetDepartment, expenseDepartment], [budgetPeriod, expensePeriod]],
        id: 'custdataset_hitc_budget_actual_link'
    });
}