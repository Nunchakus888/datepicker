<style scoped>
    @import "date-table.css";
</style>

<template>
    <div class="date-table-container">

        <p class="date-title">
            {{ `${this.year}年${this.month + 1}月` }}
        </p>

        <table @click="handleClick" class="date-table">
            <tbody>
                <tr v-for="row, index in rows">
                    <td
                        v-for="cell in row"
                        :class="cellClass(cell)"
                    >
                        {{ cell.text }}
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import {getFirstDayOfMonth, getDayCountOfMonth, clearHours} from '../../lib/utils';
    export default {
        props: {
            date: {},
            year: {},
            month: {},
            selectionMode: {
                default: 'day'
            },
            showWeekNumber: {
                type: Boolean,
                default: false
            },
            disabledDate: {},
            minDate: {},
            maxDate: {},
            rangeState: {
                default() {
                    return {
                        endDate: null,
                        selecting: false,
                        row: null,
                        column: null
                    };
                }
            }
        },
        data() {
            return {
                tableRows: [[], [], [], [], []], //单月最多5row.
            }
        },
        computed: {
            rows() {
                const rows = this.tableRows;
                const dayCountOfMonth = getDayCountOfMonth(this.year, this.month);
                const now = clearHours(new Date());
                const start = getFirstDayOfMonth(new Date(this.year, this.month, 1)); //本月第一天是周几.
                this.day = 1;
                for (let i = 0; i < 5; i++) { //a month max has 5 row.
                    const row = rows[i];
                    for (let w = 0; w < 7; w++) {
                        row[w] = {
                            row: i,
                            column: w,
                            type: 'blank',
                            text: ''
                        };
                    }
                    this.calcDateOrder(i === 0 ? start : 0, row, i, now, dayCountOfMonth);
                }
                return rows;
            }
        },
        methods: {
            calcDateOrder(start, row, i, now, dayCountOfMonth) {
                for (let j = start; j < 7; j++) { //a row max has 7 day.
                    if (this.day <= dayCountOfMonth) {
                        row[j] = {
                            row: i,
                            column: j,
                            type: 'normal',
                            inRange: false,
                            start: false,
                            end: false,
                            text: this.day
                        };
                        if (new Date(this.year, this.month, this.day).getTime() === now) {
                            row[j].type = 'today';
                        }
                        if (j === 0 || j === 6) {
                            row[j].type = 'week';
                        }
                        if (this.day === this.date) {
                            row[j].type = 'current';
                        }
                        this.day++;
                    }
                }
            },
            handleClick(e) {
                const target = e.target;
                if (target.nodeName !== 'TD') return;
                if (target.className === 'blank') return;
                //if (hasClass(target, 'disabled') || hasClass(target, 'week')) return;
                //Finding cell's object by cellIndex & rowIndex in table Element.
                const cellIndex = target.cellIndex;
                const rowIndex = target.parentNode.rowIndex;
                const cell = this.rows[rowIndex][cellIndex];
                const text = cell.text;
                //const className = target.className;
                const newDate = new Date(+this.year, +this.month, 1);
                newDate.setDate(+text, 10);
                cell.type = 'current';
                this.$emit('pick', newDate);
            },
            cellClass(cell) {
                return cell.type;
            }
        }
    }
</script>