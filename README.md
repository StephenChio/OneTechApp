# OneTechApp

OneTechApp是一款仿微信开发的个人练手使用的app 涵盖了微信了许多功能，在线聊天，添加好友，发朋友圈，点赞等等

预览:

登陆使用测试账号: 13900000000 密码登陆: 123456

![Image](https://github.com/StephenChio/img-folder/blob/master/5.png)

朋友信息

![Image](https://github.com/StephenChio/img-folder/blob/master/6.png)

通讯录

![Image](https://github.com/StephenChio/img-folder/blob/master/7.png)

朋友圈信息

![Image](https://github.com/StephenChio/img-folder/blob/master/8.png)


事先准备:

一.安装Visual Studio Code 

下载地址:https://code.visualstudio.com

二.下载node.js

下载地址:https://nodejs.org/en/download/

根据电脑系统，下载安装完后通过命令行工具安装最新版本的 cordova 和 ionic 

Window 和 Linux 上打开命令行工具执行以下命令：

npm install -g cordova ionic

三.运行方法

1.clone下载解压本项目，用Visual Studio Code打开

2.安装依赖 npm install

3.安装平台 ionic cordova platform add ios/android（如果在ios虚拟机上运行需要安装Xcode）建议使用IOS平台,此程序有IOS适应，使用安卓平台可能会导致样式问题。

4.普通运行 ionic serve 后打开浏览器，输入localhost:8100

![Image](https://github.com/StephenChio/img-folder/blob/master/4.png)

5.虚拟机运行（需要分别安装安卓或苹果虚拟机，这里不做详细教程）

Android Run 

ionic cordova run android --prod

iOS Run 

ionic cordova run ios --prod

四.提示

该项目为前后端分离项目，访问本地访问接口需搭建后台环境，搭建请参考后端项目

后端项目OneTech地址：https://github.com/StephenChio/OneTech
