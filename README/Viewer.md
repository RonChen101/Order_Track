# [1 关于Viewer SDK](https://aps.autodesk.com/en/docs/viewer/v7/developers_guide/overview/)

APS Viewer SDK可以让你在自己的网站上查看、分享、操作你的模型。Viewer可以打开[AutoCAD]()、[Fusion 360]()、[Revit]()等相关的文件。有了这个JS库，开发者可以用商业方向的数据开发出结合了2D和3D的可视化应用。

Viewer SDK提供一个扩展框架，开发者可以做到：

- 客制化Viewer的外观、控件、行为。
- 客制化Viewer工具栏的内容和位置。
- 编写自定义的扩展，以做到更客制化用户体验。

## 一般用法

一般的使用了这个SDK的应用程序可以是，但不限于：

- 项目看板
- 数字孪生
- 展示规划与时间进度表
- 汇总并协调模型变更
- 生成二维与三维标注

## Try it out

略。

## 下一步

你必须把你的模型转换成SVF或SCF2格式，才能在Viewer中显示。有两种办法可以转换：

- 如果使用BIM 360或Forma workspace，SVF/SVF2文件会自动生成。
- 上传模型到Object Storage Service (OSS)，然后你可以调用这个模型衍生API的[POST Start Translation Job]()来执行转换。

查看模型衍生教程[Prepare a File for the Viewer]()，以了解更多。

使用模型衍生服务前需要认证。该教程会一步一步教你怎么获得访问令牌。你也可以查看[Authentication Documentation]()。

注意

- Viewer SDK JS库必须从Autodesk的URL获取。
- 在你开始前，推荐再看一遍Viewer的核心内容和高级选项章节。

## Terms of Service

略。

# 2 例子

# [2.1 控制Viewer的状态](https://aps.autodesk.com/en/docs/viewer/v7/developers_guide/interactive_examples/example_1/)

这个例子中有一个叫Toggle Explode的按钮。这个按钮可以让分解值在0和第二个预设值之间切换。这个例子使用50%作为第二个值。

这是通过添加点击事件到explodeButton实现的，点击事件中调用了viewer.explode()方法。这个点击事件可以切换特定的分解值。

提示 略

# [2.2 处理Viewer事件](https://aps.autodesk.com/en/docs/viewer/v7/developers_guide/interactive_examples/example_2/)

这个例子展示了监听事件——SELECTION_CHANGED_EVENT。

选择一个对象将会调用一个内联方法，该函数异步获取所选对象ID，并在弹窗中提示：用户已选中带对应ID的对象。然后弹窗会展示获取到的对象ID。

提示 略

# [2.3 查询模型属性](https://aps.autodesk.com/en/docs/viewer/v7/developers_guide/interactive_examples/example_3/)

这个例子展示了如何用属性名查询模型中的内容，然后孤立对应的元素，同时自动聚焦到那个元素。尝试一下：

1. 在左上角的下拉列表中，选择01_rac_basic_sample_project.rvt。
2. 在下拉列表边上的输入框中，输入Single-Flush \[422466\]。
3. 点击搜索。指定门扇将清晰展示，其余元素自动隐藏。

这个脚本首先获取输入框中的文本。然后，查询模型的属性，获取该文本对应元素的节点ID。然后，使用这个ID来孤立那个元素，并聚焦它。

# [2.4 客制化Viewer的UI](https://aps.autodesk.com/en/docs/viewer/v7/developers_guide/interactive_examples/example_4/)

这个例子展示了添加一个自定义的按钮到Viewer工具栏。该按钮的点击事件可以将Viewer的预设光照改成Snow Field (16)。

提示 略

# [2.5 客制化Viewer的场景](https://aps.autodesk.com/en/docs/viewer/v7/developers_guide/interactive_examples/example_5/)

这个例子展示了如何添加一个自定义对象到场景，该对象会和模型一样渲染。

左上角的按钮——Add Sphere，有一个相关事件监听器。当它被点击后，事件处理器检查名为custom-scene的存在，如果没有就新建custom-scene。然后，随机在该场景中放一些球。

# [2.6 并和的视图](https://aps.autodesk.com/en/docs/viewer/v7/developers_guide/interactive_examples/example_6/)

这个例子展示了通过合并一个Revit模型和一个Fusion 360模型在同一视图中，来创建一个并和的视图。

这个例子实现了addViewable方法，可以指定viewable的URN作为参数，来渲染一个模型。然后，调用该方法，将两个模型渲染到同一个Viewer对象中。

查看[Advanced Options]()和[API Reference]()章节，以了解更多。

# 3 Viewer基础

# [3.1 快速上手](https://aps.autodesk.com/en/docs/viewer/v7/developers_guide/viewer_basics/starting-html/)

## 开始前的准备

如果你想创建一个Viewer应用，有一些事你需要准备。

1. 创建一个APS账号。
2. 等级一个APP。
3. 获取客户端ID和密钥。
4. 开通其他产品访问权限。

查看APS [Getting Started]()教程，以了解更多。

### 添加Viewer到HTMl页面

下面的HTML片段中的`<script>`标签会在运行时加载打包好的Viewer SDK，并创建一个覆盖整个HTML页面的Viewer实例。

`forgeViewer`标识的`div`会初始化一个Viewer实例。了解如何初始化一个Viewer实例，看第二节：[Initialize Viewer]()。

注意：Viewer强依赖three.js R71版本。

**包大小**

我们推荐`<script>`标签尽量晚的加载Viewer库。这样浏览器可以先渲染静态HTML内容。

**Viewer版本**

`<script>`标签指定Viewer库的位置和版本。下面的HTML例子中，指定的版本是`7.*`，意思是在7的版本号中，下载最新的版本。

比如，版本`7.0`、`7.1`、`7.2`可用，则会下载`7.2`。

同理，指定版本也可以包括次版本号或者补丁号。以下的URL都可用：

**LMV_VIEWER_VERSION**

可通过[global variable LMV_VIEWER_VERSION]()校验已加载的Viewer版本。

### 初始化Viewer

初始化有三步：

1. ~~启用自动地区路由。~~ 现已无需该操作。
2. 调用`Autodesk.Viewing.Initializer()`方法初始化页面。
3. 创建Viewer实例，同时确保WebGL支持可用。

**初始化Viewer的SVF和SVF2支持**

初始化Viewer时，通过`env`和`api`参数指定SVF或SVF2支持。下面的表格有对应的值：

|参数|SVF|SVF2|
|-|-|-|
|env|AutodeskProduction|AutodeskProduction2|
|api|derivativeV2|streamingV2|

**初始化器**

初始化器方法只需要运行一次。它保证了在继续运行前，所有子系统都在运行。查看[Initializer Method]()的参数，以了解`options`的细节。

**创建Viewer实例**

当初始化器的回调函数被调用，我们接着就创建Viewer实例。

你只能调用`viewer.start()`一次。紧接着先校验浏览器是否支持 WebGL，再加载模型。

**销毁Viewer实例**

当不需要Viewer时，反初始化并且回收内存：

### 加载模型

加载模型需要两步。

1. 从模型转换API获取清单JSON。
2. 指定Viewer加载其中一个在清单JSON中引用的模型。

在你加载模型前，你必须使用[Model Derivative]()API的[POST job]()接口发起转换任务，将模型解析转换为SVF格式。转换任务会生成一份JSON清单。[translation job]()产出的清单记录中提供各类资源信息，包括模型几何数据、缩略图、相机视图等。

查看模型转换API中的[Prepare a File for the Viewer]()教程，以了解更多。

