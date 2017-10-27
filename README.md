🙄️🙄️🙄️npm还没发包，目前还不能愉快的使用，只能手动copy～～
等那天周末有时间了再做优化，发布。

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| v-model | 绑定值 | string | - | - |
| readonly | 移动端日期input，完全只读 | boolean | - | true
| placeholder | 占位内容 | string | — | — |
| date-format | 时间日期格式化 | string | 年 `yyyy`，月 `MM`，日 `dd` | 默认yyyy-MM-dd |
| clearable | 是否可清除 | boolean | boolean | true
| @change | 选中日期回调函数 | string | - | - |

### Demo

```html
<owo-datepicker
    @change="handleChange"
    v-model="date"
    date-format="yyyy/MM/dd HH:mm:ss"
    placeholder="选择日期1"
    :clearable="false"
>
</owo-datepicker>
```

```html
<owo-datepicker
    @change="handleChange"
    v-model="date3"
    placeholder="选择日期3"
>
</owo-datepicker>
```

[项目svg资源](http://www.iconsvg.com/)
## License
MIT😄

