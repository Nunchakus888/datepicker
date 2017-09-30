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
    }
    .date-icon:after {
        /*content: "\E611";*/
        font-size: 1rem;
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
            <!--<i class="date-icon"></i>-->
            <svg class="date-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                <polygon points="38.48,29.193 38.48,32.5 40.48,32.5 40.48,29.193 66.137,29.193 66.137,32.5 68.137,32.5 68.137,29.193
                    78.882,29.193 78.882,38.833 28.019,38.833 28.019,29.193 "/>
                <path d="M28.019,40.833v39.221h50.863V40.833H28.019z M52.008,68.578H39.48v-1.629l2.083-2.023c5.01-4.768,7.274-7.304,7.304-10.26
                    c0-1.993-0.966-3.834-3.893-3.834c-1.781,0-3.26,0.904-4.166,1.659l-0.845-1.87c1.359-1.148,3.291-1.993,5.554-1.993
                    c4.227,0,6.006,2.897,6.006,5.704c0,3.622-2.625,6.552-6.761,10.536l-1.569,1.448v0.061h8.814V68.578z M59.983,68.91
                    c-2.202,0-4.134-0.693-5.099-1.327l0.723-2.052c0.755,0.482,2.507,1.236,4.347,1.236c3.411,0,4.465-2.172,4.436-3.802
                    c-0.03-2.748-2.504-3.925-5.07-3.925H57.84v-1.991h1.479c1.932,0,4.377-0.995,4.377-3.32c0-1.57-0.998-2.959-3.441-2.959
                    c-1.57,0-3.079,0.695-3.925,1.298l-0.693-1.932c1.025-0.754,3.018-1.509,5.129-1.509c3.863,0,5.616,2.295,5.616,4.679
                    c0,2.023-1.209,3.743-3.622,4.618v0.061c2.413,0.482,4.377,2.293,4.377,5.038C67.137,66.164,64.691,68.91,59.983,68.91z"/>
            </svg>
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