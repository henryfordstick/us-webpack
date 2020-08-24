# us-webpack
手写一个简单的webpack

### webpack的基本原理
 1、compiler webpack运行的入口配置都挂到这个对象上面，在启动的时候一次性建立，并配置好所有可操作的设置。
 包括loader，options和plugin
 
 2、compilation 下面最重要的依赖就是chunk和module：
    module生成一个树，将结果交给chunk，chunk根据template生成代码后，又交给compilation，
    最后输出代码。
 3、Parser
    专门用来处理ast之间的关系
    
### 操作
1、将项目克隆到本地

`git clone git@github.com:henryfordstick/us-webpack.git`

2、运行

`npm run dev`

 
