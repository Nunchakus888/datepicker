/**
 * return 当前月第一天是星期几.
 */
export const getFirstDayOfMonth = function(date) {
    const temp = new Date(date.getTime());
    temp.setDate(1);
    return temp.getDay();
    // return temp.getDay() === 0 ? 7 : temp.getDay();
};

/**
 * month start at 0.
 */
export const getDayCountOfMonth = function(year, month) {
    if (month === 3 || month === 5 || month === 8 || month === 10) {
        return 30;
    }

    if (month === 1) {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            return 29;
        } else {
            return 28;
        }
    }

    return 31;
};

export const clearHours = function(time) {
    const cloneDate = new Date(time);
    cloneDate.setHours(0, 0, 0, 0);
    return cloneDate.getTime();
};

export const getWeekNumber = function(src) {
    const date = new Date(src.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

export const toDate = function(date) {
    return isDate(date) ? new Date(date) : null;
};

export const isDate = function(date) {
    if (date === null || date === undefined) return false;
    if (isNaN(new Date(date).getTime())) return false;
    return true;
};

import dateUtil from './dateFormat';

export const formatDate = function(date, format) {
    date = toDate(date);
    if (!date) return '';
    return dateUtil.format(date, format || 'yyyy-MM-dd');
};

export const parseDate = function(string, format) {
    return dateUtil.parse(string, format || 'yyyy-MM-dd');
};