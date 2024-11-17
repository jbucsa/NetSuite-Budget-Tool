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

    const dimensionItem = workbook.createDataDimensionItem({expression: budgetPeriod});
    const periodDimension = workbook.createDataDimension({items: [dimensionItem]});
    const periodSection = workbook.createSection({children:[periodDimension]});
    const budgetAmtExpress = budgetDataset.getExpressionFromColumn({alias:'Amount'});
    const budgetSumTotal = workbook.createDataMeasure({expression: budgetAmtExpress, aggregation: 'SUM', label:'Budget'});
    const actualAmountExp = actualDataset.getExpressionFromColumn({alias: 'Amount'});
    const expensesTotal = workbook.createDataMeasure({expression: actualAmountExp, aggregation: 'SUM', label:'Expenses'});
    const columnSection = workbook.createSection({children:[budgetSumTotal, expensesTotal]});
    const pivotTable = workbook.createPivot({
        id: 'hitc_budget_vs_actual_pivot',
        name: 'HITC Budget Vs Actual (SDF)',
        datasetLink: linkedDataset,
        rowAxis: workbook.createPivotAxis({root: periodSection}),
        columnAxis: workbook.createPivotAxis({root: columnSection})
    });

    context.workbook = workbook.create({name: 'HITC Budget Vs Actual', pivots: [pivotTable]});
}