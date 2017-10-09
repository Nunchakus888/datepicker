import DatePicker from './components/datepicker/Picker.vue';

DatePicker.install = function install(Vue) {
    Vue.component(DatePicker.name, DatePicker);
};

export default DatePicker;
