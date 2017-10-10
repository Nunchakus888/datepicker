<style scoped>
    @import "date-table.css";
</style>

<template>
    <div>
        <owo-input
            @focus="handleFocus"
            @blur="handleBlur"
            @clear="handleClear"
            :value="visibleDate"
            :placeholder="placeholder"
            v-show="!pickerVisible"
            :clearable="clearable"
        />
        <div class="date-list" ref="dateList" v-if="pickerVisible">
            <table class="date-table week-title">
                <thead>
                    <th v-for="week in WEEKS">{{ week }}</th>
                </thead>
            </table>

            <date-table
                v-for="i in monthList"
                @pick="handleDatePick"
                :year="i.year"
                :month="i.month"
                :date="i.date"
            >
            </date-table>
        </div>
    </div>
</template>

<script>
    import dateTable from '@components/datepicker/Datepicker';
    import OwoInput from '@components/datepicker/Input';
    import { formatDate, parseDate } from '../../lib/utils';
    export default {
        name: 'owo-datepicker',
        props: {
            value: [String],
            months: {
                type: Number,
                default: 13 //显示当前月的前一个月，以及后一年，共13个月
            },
            placeholder: String,
            dateFormat: String, //默认：yyyy-MM-dd
            clearable: {
                type: Boolean,
                default: true
            }
        },
        components: {
            dateTable,
            OwoInput,
        },
        computed: {
            WEEKS() {
                return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            },
            visibleDate: {
                get() {
                    this.year = this.datetime.getFullYear();
                    this.month = this.datetime.getMonth();
                    const value = formatDate(this.datetime, this.dateFormat);
                    if (this.currentValue) {
                        this.date = this.datetime.getDate();
                        return value;
                    }
                },

                set(val) {
                    const date = parseDate(val, this.dateFormat);
                    if (!date) {
                        return;
                    }
                    if (typeof this.disabledDate === 'function' && this.disabledDate(date)) {
                        return;
                    }
                    this.datetime = date;
                }
            },

            /*monthList: function() {
                const list = [];
                let year = this.datetime.getFullYear();
                const month = this.datetime.getMonth();
                const date = this.date;
                let months = this.months;
                let calcMonth = month - 1;
                while (months) {
                    if (calcMonth > 11) {
                        calcMonth = 0;
                        year++;
                    } else if (calcMonth < 0) {
                        calcMonth = 11;
                        year--;
                    }
                    list.push(
                        {
                            date: calcMonth === month ? date : '',
                            month: calcMonth,
                            year: year
                        }
                    );
                    calcMonth++;
                    months--;
                }
                return list;
            },*/
        },
        data() {
            return {
                $div: this.$refs.dateList,
                currentValue: this.value,
                datetime: this.value ? new Date(this.value) : new Date(),
                date: null,
                year: null,
                month: null,
                pickerVisible: false,
                readonly: !0,
                bottomReached: false,
                monthList: [],

                minMonth: '',
                maxMonth: '',
                minYear: '',
                maxYear: '',
            }
        },

        mounted() {
            this.initMonth();
            this.bindTouchEvents();
            this.scrollEventTarget = this.getScrollEventTarget(this.$el);

        },
        methods: {
            initMonth() {
                this.monthList = [
                    {
                        date: this.date,
                        month: this.month,
                        year: this.year
                    }
                ];
                this.minMonth = this.maxMonth = this.month;
                this.minYear = this.maxYear = this.year;
                this.calculateMonth(1);
            },
            handleDatePick(value) {
                this.datetime.setFullYear(value.getFullYear());
                this.datetime.setMonth(value.getMonth(), value.getDate());
                this.currentValue = value;
                this.resetDate();
                this.$emit('change', this.visibleDate);
                setTimeout(() => {
                    this.pickerVisible = false;
                    this.initMonth();
                }, 160);
            },

            handleFocus() {
                this.pickerVisible = true;
            },

            handleClear(value) {
                this.date = '';
                this.currentValue = value;
                this.resetDate();
                this.$emit('change', this.visibleDate);
            },

            handleBlur() {
            },

            resetDate() {
                this.datetime = new Date(this.datetime);
            },

            getScrollTop(element) {
                if (element === window) {
                    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
                } else {
                    return element.scrollTop;
                }
            },

            checkBottomReached() {
                if (this.scrollEventTarget === window) {
                    return document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight;
                } else {
                    return this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 1;
                }
            },

            getScrollEventTarget(element) {
                let currentNode = element;
                while (currentNode && currentNode.tagName !== 'HTML' &&
                currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
                    let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
                    if (overflowY === 'scroll' || overflowY === 'auto') {
                        return currentNode;
                    }
                    currentNode = currentNode.parentNode;
                }
                return window;
            },

            bindTouchEvents() {
                this.$el.addEventListener('touchstart', this.handleTouchStart);
                this.$el.addEventListener('touchmove', this.handleTouchMove);
                this.$el.addEventListener('touchend', this.handleTouchEnd);
            },

            handleTouchStart(event) {
                this.startY = event.touches[0].clientY;
                this.screenY = event.touches[0].screenY;
            },

            handleTouchMove(event) {
                if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
                    return;
                }
                this.currentY = event.touches[0].clientY;
                let distance = this.currentY - this.startY;
                if (distance > 0) {
                    this.direction = 'down';
                } else if (distance < 0) {
                    this.direction = 'up';
                }

                if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.calculateMonth(-1);
                }

            },

            handleTouchEnd(event) {
                const clientY = event.changedTouches[0].clientY;
                if (clientY !== this.startY && this.direction === 'up' && this.checkBottomReached()) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.calculateMonth(1);
                }
            },

            calculateMonth(tag) {
                const future = tag > 0;

                let calcMonth = future ? this.maxMonth : this.minMonth;
                let year = future ? this.maxYear : this.minYear;
                calcMonth += tag;

                if (calcMonth > 11) {
                    calcMonth = 0;
                    year++;
                } else if (calcMonth < 0) {
                    calcMonth = 11;
                    year--;
                }

                if (future) {
                    this.monthList.push(
                        {
                            date: null,
                            month: calcMonth,
                            year: year
                        }
                    );
                    this.maxMonth = calcMonth;
                    this.maxYear = year;
                } else {
                    this.monthList.unshift(
                        {
                            date: null,
                            month: calcMonth,
                            year: year
                        }
                    );
                    this.minMonth = calcMonth;
                    this.minYear = year;
                }
            }
        }
    }
</script>