# {{name}}@{{version}}

{{description}}

> Git仓库地址：[GitLab](http://gitlab.zhuanspirit.com/{{line}}/{{name}})
>
> 文档线上地址：[文档](https://fe.zhuanspirit.com/{{line}}/{{name}}/)

## 使用

### npm

```bash
$ npm i {{name}} -S
```

```js
import { Point } from '{{name}}'

console.log(new Point())
```

### CDN

<!-- 需要在 beetle 自行配置业务线和包名 -->

```html
<script src="https://m.zhuanzhuan.com/{{line}}/{{name}}/static/js/{{version}}/index.js"></script>
<script src="https://m.zhuanzhuan.com/{{line}}/{{name}}/static/js/{{version}}/index.min.js"></script>
```

### 按需加载

```bash
$ npm i babel-plugin-import -D
```

此 `npm` 包实现了按需加载，使用时，需要设置 `babel` 配置，如下：

```javascript
// babel.config.js
{
  "plugins": [
    ["import", {
      "libraryName": "{{name}}"
    }]
  ]
}
```

## 开发

### 命令行

```bash
# 统一的 git commit 指令
$ npm run cz

# 单元测试
$ npm run test

# eslint 校验
$ npm run lint

# eslint 校验并修复
$ npm run fix

# eslint 校验暂存区的文件
$ npm run staged

# 本地测试模式，外链形式
$ npm run dev

# 编译es5，es6代码，例如lib，es文件夹
$ npm run compile

# 编译代码，外链形式
$ npm run dist

# 编译代码，分析模式
$ npm run analyz

# 打包编译，集成compile 和 dist
$ npm run build

# 发布npm包，同时gitlab标签
$ npm run pub

# 发布npm的beta包，同时gitlab标签
$ npm run pub-beta

# 删除gitlab及npm包对应版本代码
$ npm run unpub

# 打开开发文档在浏览器中运行
$ npm run doc

# 编译开发文档
$ npm run build-doc

# 上传文档到ftp
$ npm run doc-upload
```

### 文档

新增及修改函数，务必严格按照 `jsdoc` 自动生成文档，语法可查看：《[jsdoc使用](https://www.css88.com/doc/jsdoc/tags-example.html)》 或 [基础库代码规范(即将开源，敬请期待)]()

### 更新日志

每次发正式包时务必更新当前版本的 `changelog`，否则会在 `npm run pub` 这一步被驳回

### 单元测试

基础库的单元测试必不可少，可以参见[单元测试规范(即将开源，敬请期待)]()
