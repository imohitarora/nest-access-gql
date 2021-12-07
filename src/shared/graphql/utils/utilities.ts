import { Operator } from '../../models';
import type { FilterByString } from '../types';

type FilterByResult = Record<string, string>;

export function getFilterByOperator(operator: Operator, searchValue: string | number | boolean): FilterByResult {
  let operation;

  switch (operator) {
    case Operator.EQ:
      operation = { $eq: searchValue };
      break;
    case Operator.NE:
      operation = { $ne: searchValue };
      break;
    case Operator.GE:
      operation = { $gte: searchValue };
      break;
    case Operator.GT:
      operation = { $gt: searchValue };
      break;
    case Operator.LE:
      operation = { $lte: searchValue };
      break;
    case Operator.LT:
      operation = { $lt: searchValue };
      break;
    case Operator.IN:
      // eslint-disable-next-line no-case-declarations
      const inValues = typeof searchValue === 'string' ? searchValue.split(',') : searchValue;
      operation = { $in: inValues || [] };
      break;
    case Operator.NIN:
      // eslint-disable-next-line no-case-declarations
      const notInValues = typeof searchValue === 'string' ? searchValue.split(',') : searchValue;
      operation = { $nin: notInValues || [] };
      break;
    case Operator.EndsWith:
      operation = { $regex: new RegExp(`.*${searchValue}$`, 'i') };
      break;
    case Operator.StartsWith:
      operation = { $regex: new RegExp(`^${searchValue}.*`, 'i') };
      break;
    case Operator.Contains:
    default:
      operation = { $regex: new RegExp(`.*${searchValue}.*`, 'i') };
      break;
  }

  return operation;
}

export function getFilterByQuery(filterBy: FilterByString[]) {
  const filterObj = {};

  if (Array.isArray(filterBy)) {
    for (const filter of filterBy) {
      filterObj[filter.field] = getFilterByOperator(filter.operator, filter.value);
    }
  }

  return filterObj;
}
