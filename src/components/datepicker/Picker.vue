<style scoped>
    @import "date-table.css";
</style>

<template>
    <div>
        <owo-input
            @focus="handleFocus"
            @blur="handleBlur"
            :value="visibleDate"
            :placeholder="placeholder"
            v-show="!pickerVisible"
        />
        <div class="date-list" id="date-list" v-if="pickerVisible">
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
        <!--
            :week="week"
            :disabled-date="disabledDate"
            :selection-mode="selectionMode"
            :first-day-of-week="firstDayOfWeek"
        -->

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
                default: 13
            },
            placeholder: String,
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
            monthList: function() {
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
            },
        },
        data() {
            return {
                $div: undefined,
                currentValue: this.value,
                datetime: this.value ? new Date(this.value) : new Date(),
                date: null,
                year: null,
                month: null,
                pickerVisible: false,
                readonly: !0,
            }
        },
        watch: {
            /*'pickerVisible'(a, b) {
                if (!this.$div) {
                    this.$div = document.getElementById('date-list');
                }
                if (a) {
                    this.$div.addEventListener('scroll', this.onScroll);
                } else {
                    this.$div.removeEventListener('scroll', this.onScroll);
                }
            }*/
        },
        methods: {
            handleDatePick(value) {
                this.datetime.setFullYear(value.getFullYear());
                this.datetime.setMonth(value.getMonth(), value.getDate());
                this.currentValue = value;
                this.resetDate();
                this.$emit('change', this.visibleDate);
                setTimeout(() => {
                    this.pickerVisible = false;
                }, 100);
            },
            handleFocus() {
                this.pickerVisible = true;
            },
            handleBlur() {
            },
            resetDate() {
                this.datetime = new Date(this.datetime);
            },
            onScroll() {
                let $div;
                let windowHeight;
                if (!$div) {
                    $div = this.$div;
                    windowHeight = window.innerHeight;
                }
                const bodyHeight = $div.clientHeight;
                const scrollTop = $div.scrollTop;
                console.log('----offsetTop:', $div.offsetTop);
                console.log('----offsetHeight:', $div.offsetHeight);
                console.log('----height:', $div.clientHeight);
                console.log('----scrollTop:', $div.scrollTop);
                console.log('----innerHeight:', window.innerHeight);
                // 滚动到离 bottom 100px
                //console.log('scrollTop---', window.innerHeight / document.body.offsetHeight);
                if (scrollTop + windowHeight + 100 >= bodyHeight) {
                    this.datetime.setMonth(this.month + 1);
                }
            },
        }
    }
</script>