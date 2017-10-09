# owo-datepicker


## Installation
```shell
    todo..
```

## Usage

A:
```javascript
import Vue from 'vue'
import OwoDatePicker from 'owo-datepicker'

Vue.use(OwoDatePicker)
```

B:
```javascript
import Vue from 'vue'
import { DatePicker } from 'owo-datepicker'

Vue.component(DatePicker.name, DatePicker);
```

C:
```html
<script src="xxx/vue/dist/vue.js"></script>
<script src="xxx/owo-datepicker/index.js"></script>
<script>
  Vue.use(OwoDatePicker);
</script>
```

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| readonly | 移动端日期input，完全只读，防止键盘弹出
| placeholder | 占位内容 | string | — | — |
| type | 显示类型 | string | year/month/date/week/ datetime/datetimerange/daterange | date |
| format | 时间日期格式化 | string | 年 `yyyy`，月 `MM`，日 `dd` | 默认yyyy-MM-dd |

## License
MIT
