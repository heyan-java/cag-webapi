# 中华珍宝馆 webapi 文档

## 1. API请求格式
http://api.ltfc.net/{API}?app={APP_KEY}&token={APP_TOKEN}

API: api 结构名称，具体内容参加下表
APP_KEY: app标识，用来唯一标识一个app，APP_KEY需要与APP_TOKEN匹配，申请之后不会变化
APP_TOKEN: app令牌，后台为每个app生成一个唯一的令牌，令牌错误将不能访问 api 接口

## 2. 各个板块读取数据API

API URL | 描述 | 例子
------------ | ------------- | -------------
/api/v1/essence | 精选馆数据 | 
/api/v1/age/:age/:author | 年代馆数据 | http://api/ltfc.net/api/age/%E5%AE%8B/%E6%9D%8E%E5%85%AC%E9%BA%9F?app=sample&token=SMP_APP_TOKEN
/api/v1/modern | 当代馆数据 |
/api/v1/recent | 新发布数据列表 | 
/api/v1/mylove | 铭心绝品数据列表 |
/api/v1/tag/:tag | 显示分类数据 | tag: 书法，绘画，工笔
/api/v1/search/:key | 查询数据列表 | http://ltfc.net/api/search/%E6%9D%8E%E5%85%AC%E9%BA%9F
/api/v1/outline.json | 年代列表 | http://ltfc.net/cagstore/outline.json
/api/v1/hotsearch | 热搜词列表 |
/api/v1/info/:uuid | 返回图片的详细信息 | http://ltfc.net/api/info/561d3c325af63245ad60b483
/api/v1/downlink/:uuid?uid=:unique_identifier | 返回图片下载信息 | http://ltfc.net/api/downlink/5aebb75154abff7ca62f551c?uid=the_uid_get_from_app_receipt 
/api/v1/status | 返回当前整体图片状态 | 
/api/v1/checkversion/:verion | 检查当前版本，推送是否需要升级信息 | 判断当前app版本是否需要升级, :version 提交当前app版本，返回值形如：{"action":"skip"} 或者是 {"action":"upgrade"}, 本请求根据 app_key 判断当前发起请求的是什么app

## 返回值中的字段说明：
图片 info 内容：
```JSON
{
"_id": "5afc7488bfa975afd20939ca",
"age": "当代",
"author": "徐悲鸿",
"paintingName": "作画步骤示范册页之一-画册",
"activeTime": "2018-05-16T18:12:20.200Z",
"areaSize": "",
"comment": "",
"desc":  “...",
"descUrl": "",
"essence": false,
"essenceComment": "",
"maxlevel": 18,
"mediaType": "",
"minlevel": 15,
"originalUrl": "",
"overallLevel": "二级-绢丝可见",
"ownerName": "",
"pixels": "",
"resourceLevel": "高清原拍",
"isCollection": true,
"viewCnt": 2738,
"tags": [
"绘画"
],
"hasDownloadImage": false,   // 是否有下载文件
"hasOriginalUrl": false  // 是否有原始图下载链接（链接到百度云的）
}
```

downlink 内容:
```JSON
[{
    "downloadUrl”: 下载链接，10分钟后失效,
    "fileSize”: 文件大小，单位是bit,
    "scaleLevel": 这个下载文件的缩放级别，18级就是原图大小，17级是原图的1/2，每小一级，图片小1/2。因为有的时候原图太大，只能提供缩小1/2的图片下载。
    "_id": 忽略
}]
```


## 3. 直接在应用中引用的页面
请求格式：
http://ltfc.net/{PAGE_URL}.html?app={APP_KEY}&token={APP_TOKEN}

PAGE_URL: 引入页面的URL
APP_KEY: app标识，用来唯一标识一个app，APP_KEY需要与APP_TOKEN匹配，申请之后不会变化
APP_TOKEN: app令牌，后台为每个app生成一个唯一的令牌，令牌错误将不能访问 api 接口


API URL | 描述 | 例子
------------ | ------------- | -------------
/outline/:age/:author/:paintingName | 通过年代，作者，作品名称打开图片，会自动打开匹配到的第一幅图片。 | http://ltfc.net/outline/五代/顾德谦/莲池水禽图轴对轴1#view=webview_ios
/imglite.html?uuid=:uuid| APP打开某幅图的大图界面 | http://ltfc.net/imglite.html?uuid=5684dcecdab0b2f921eef810&app={APP_KEY}&token={APP_TOKEN}
http://cag.ltfc.net/cagstore/:uuid/tb.jpg | 缩略图路径 | http://cag.ltfc.net/cagstore/5684dcecdab0b2f921eef810/tb.jpg
http://ltfc.net/imglite/:uuid | 微博或者其他社交媒体分享时使用的页面 | http://ltfc.net/imglite/5684dcecdab0b2f921eef7e1?app={APP_KEY}&token={APP_TOKEN}


### 说明：

/outline/:age/:author/:paintingName
参数：

    uuid: 其中uuid使用从API中拉到的_id字段
    view: iOS使用webview_ios，Android使用web view_andorid
备注: 当view参数不为空时，缩放按钮，评论按钮都会隐藏。

/imglite.html?uuid=:uuid&view=webview_ios#uuid=：uuid&view=webview_ios
参数：

    uuid: 其中uuid使用从API中拉到的_id字段

注意: api有修改，这些取不到缩略图的就是新加的画集，需要显示snapUrl指定的图片， 如果snapUrl字段没有，就还用以前的方式显示图片