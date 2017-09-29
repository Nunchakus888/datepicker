<style scoped>
    input {
        height: 36px;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        line-height: 1;
        font-size: 1rem;
        outline: 0;
        padding: 3px 10px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
        display: inline-block;
    }
    input:focus {
        outline: 0;
        outline-offset: -2px;
        border-color: #20a0ff !important; /*Or it will be overwrite by hover attribute*/
    }
    input:hover {
        border-color: #8391a5;
    }
    .date-icon {
        position: absolute;
        width: 35px;
        height: 100%;
        right: 0;
        top: 0;
        text-align: center;
        color: #bfcbd9;
        transition: all .3s;
        font-family: element-icons!important;
        speak: none;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        vertical-align: baseline;
        display: inline-block;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .date-icon:before {
        font-size: 1rem;
        content: "\E611";
    }
    .date-icon:after {
        content: '';
        height: 100%;
        width: 0;
        display: inline-block;
        vertical-align: middle;
    }

</style>

<template>
    <div>
        <div style="position: relative;">
            <i class="date-icon"></i>
            <input
                style=""
                v-bind="$props"
                :autocomplete="autoComplete"
                :value="currentValue"
                :type="type"
                ref="input"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
            />
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: [String, Number],
            placeholder: String,
            size: String,
            resize: String,
            readonly: Boolean,
            autofocus: Boolean,
            icon: String,
            disabled: Boolean,
            type: {
                type: String,
                default: 'text'
            },
            name: String,
            autosize: {
                type: [Boolean, Object],
                default: false
            },
            rows: {
                type: Number,
                default: 2
            },
            autoComplete: {
                type: String,
                default: 'off'
            },
            form: String,
            maxlength: Number,
            minlength: Number,
            max: {},
            min: {},
            step: {},
            validateEvent: {
                type: Boolean,
                default: true
            },
            onIconClick: Function
        },
        data() {
            return {
                currentValue: this.value,
            }
        },
        watch: {
            'value'(val) {
                this.setCurrentValue(val);
            }
        },
        methods: {
            handleInput(event) {
                const value = event.target.value;
                this.$emit('input', value);
                this.setCurrentValue(value);
                this.$emit('change', value);
            },
            handleFocus(event) {
                this.$emit('focus', event);
            },
            handleBlur(event) {
                this.$emit('blur', event);
            },
            setCurrentValue(value) {
                if (value === this.currentValue) return;
                this.currentValue = value;
            }
        }
    }
</script>