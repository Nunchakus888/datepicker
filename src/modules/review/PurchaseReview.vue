<style scoped="mdzz">
    div {
        margin-top: 30px;
        height: 100%;
        overflow-y: scroll;
    }
    body {
        font-size: 14px;
    }
</style>

<template>
    <div>

        <owo-datepicker
            @change="handleChange"
            v-model="date"
            placeholder="选择日期1"
        >
        </owo-datepicker>

        <h1>hello</h1>
        <h1>world</h1>
        <h1>hi</h1>
        <h1>😄😄િ😄ીિ🙄ીિ😇ી😄</h1>
        <h1>datepicker</h1>

        <owo-datepicker
            @change="handleChange"
            v-model="date2"
            placeholder="选择日期2"
        >
        </owo-datepicker>

        <owo-datepicker
            @change="handleChange"
            v-model="date3"
            placeholder="选择日期3"
        >
        </owo-datepicker>

    </div>
</template>

<script>
    import owoDatepicker from '@components/datepicker/Picker';
    export default {
        components: {
            owoDatepicker,
        },
        data() {
            return {
                date: '',
                date2: '',
                date3: '',
            }
        },
        methods: {
            handleChange(value) {
                console.log('----', value);
            }
        }
    }
</script>