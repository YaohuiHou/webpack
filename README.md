# webpack 入门

主要说关于webpack的入门配置，有文档，自己根据文档来了一次，感觉那种神秘牛逼的打包工具也就那样呗！[webpack文档地址：http://www.css88.com/doc/webpack2/](http://www.css88.com/doc/webpack2/)


### 为什要使用WebPack？
现今的很多网页其实可以看做是功能丰富的应用，它们拥有着复杂的JavaScript代码和一大堆依赖包。为了简化开发的复杂度，前端社区涌现出了很多好的实践方法

- 模块化，让我们可以把复杂的程序细化为小的文件;
- TypeScript
- Scss Less CSS预处理器
- JavaScript预处理器（允许我们使用仅在将来版本的JavaScript中可用的功能）和编译为JavaScript的语言（例如CoffeeScript）
- ...

这些改进确实大大的提高了我们的开发效率，但是利用它们开发的文件往往需要进行额外的处理才能让浏览器识别,而手动处理又是非常繁琐的，这就为WebPack类的工具的出现提供了需求。

### 什么是webpack
WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。

## 安装
Webpack可以使用npm安装，新建一个空的练习文件夹（此处命名为webpack sample project），在终端中转到该文件夹后执行下述指令就可以完成安装。

1. Webpack可以通过npm安装。使用全局安装

```
npm install -g webpack
```

2. 或者将其作为依赖项添加到项目中 


```
npm install --save-dev webpack
```
### 正式使用Webpack前的准备工作
1. 在上述练习文件夹中创建一个package.json文件，(这是一个标准的npm说明文件，里面蕴含了丰富的信息，包括当前项目的依赖模块，自定义的脚本任务等等。)在终端中使用npm init命令可以自动创建这个package.json文件


```
npm init
```
> init命令将会询问您有关您的项目的一系列问题（例如项目名称，描述，作者信息等）不要担心 - 问题的答案不是很重要，除非你的项目要发布到npm。

2. package.json文件已经就绪，我们在本项目中安装Webpack作为依赖包


```
// 安装Webpack
npm install --save-dev webpack
```
3. 回到之前的空文件夹，并在里面创建两个文件夹,app文件夹和public文件夹，app文件夹用来存放原始数据和我们将写的JavaScript模块，public文件夹用来存放之后供浏览器读取的文件（包括使用webpack打包生成的js文件以及一个index.html文件）。接下来我们再创建三个文件:


- index.html --放在public文件夹中;
- Greeter.js-- 放在app文件夹中;
- main.js-- 放在app文件夹中;

结构如下:
<html>

-- webpack<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;-- app<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- Greeter.js<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- main.js<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;-- public<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- index.html
</html>

index.html将包含一个非常基本的HTML页面，它在这里目的在于引入打包后的js文件：

```
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Webpack Sample Project</title>
  </head>
  <body>
    <div id='root'>
    </div>
    <script src="bundle.js"></script>
  </body>
</html>

```

## 配置webpack
> Webpack有许多不同的和高级的选项，并允许使用装载程序和插件来对加载的模块应用转换。虽然可能使用webpack与命令行中的所有选项，但是进程往往会变得缓慢而容易出错。一个更好的方法是定义配置文件 - 一个简单的JavaScript模块，您可以在其中放置与构建相关的所有信息。

继续上面的例子来说明如何写这个配置文件，在当前练习文件夹的根目录下新建一个名为webpack.config.js的文件，我们在其中写入如下所示的简单配置代码，目前的配置主要涉及到的内容是入口文件路径和打包后文件的存放路径。


```
module.exports = {
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  }
}

```
###### 注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。

### 添加任务快捷方式
在命令行中输入命令需要代码类似于node_modules/.bin/webpack这样的路径其实是比较烦人的，不过值得庆幸的是npm可以引导任务执行，对npm进行配置后可以在命令行中使用简单的npm start命令来替代上面略微繁琐的命令。在package.json中对scripts对象进行相关设置即可，设置方法如下。


```
{
  "name": "webpack-sample-project",
  "version": "1.0.0",
  "description": "Sample webpack project",
  "scripts": {
    "start": "webpack" // 修改的是这里，JSON文件不支持注释，引用时请清除
  },
  "author": "zhang",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^1.12.9"
  }
}

```

npm的start命令是一个特殊的脚本名称，其特殊性表现在，在命令行中使用npm start就可以执行其对于的命令，如果对应的此脚本名称不是start，想要在命令行中运行时，需要这样用npm run {script name}如npm run build，我们在命令行中输入npm start就可以完成打包文件了。



## 插件

[Plugins.md](./Plugins.md)
> webpack 有一个富插件接口(rich plugin interface)。webpack 自身的多数功能都使用这个插件接口。这个插件接口使 webpack 变得极其灵活。
