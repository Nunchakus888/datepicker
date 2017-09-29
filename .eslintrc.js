module.exports = {
  "parserOptions": {
    "ecmaVersion": 2016,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "impliedStrict": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "amd": false
  },
  "globals": {
    "wx": false,
    "BMap": false,
    "BMAP_STATUS_SUCCESS": false,
    "AMap": false,
    "DIST_ENV": false
  },
  "plugins": [ "html", "vue"],
  "settings": {
    "html/html-extensions": [".html", ".vue"]
  },
  "rules": {
    'vue/jsx-uses-vars': 2
  }
};