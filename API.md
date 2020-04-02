# 中华珍宝馆 webapi 文档

## 1. API请求格式
https://api.ltfc.net/{API}?app={APP_KEY}&token={APP_TOKEN}

API: api 结构名称，具体内容参加下表
APP_KEY: app标识，用来唯一标识一个app，APP_KEY需要与APP_TOKEN匹配，申请之后不会变化
APP_TOKEN: app令牌，后台为每个app生成一个唯一的令牌，令牌错误将不能访问 api 接口

返回值：
由于历史原因，目前的API的返回值有两种类型。

### 形式一： 
形式一是前期版本，直接返回值对象，例如：/api/v1/essence，返回的是精选馆的图片列表
### 形式二：
形式二是标准化后的接口，返回一个标准对象，形如：
{"R":"Y","M":{...},"C":"CODE"} 
其中的各个字段意思如下：
#### R：调用结果标记，调用正常返回"Y"，调用错误返回"N"
#### M：调用返回对象，一般是一个字符串，或者是返回值对象
M 对象的返回内容参考API的手册说明，一般来说经常会包含以下3项：{ code, doc, msg } 
##### code: 标记某个返回状态，例如 code: '已入队'
##### doc: 存放返回对象，具体对象结构参考API手册
##### msg: 存放描述性的文字，一般用于展示给前端用户

#### C：标准错误码。 定义：'UNAUTHOR': 未登陆

## 2. 各个板块读取数据API
API URL | 描述 / 例子
------------ | ------------- 
/api/v1/essence | 精选馆数据  
/api/v1/age/:age/:author | 年代馆数据 <br>例子：http://api/ltfc.net/api/age/%E5%AE%8B/%E6%9D%8E%E5%85%AC%E9%BA%9F?app=sample&token=SMP_APP_TOKEN
/api/v1/modern | 当代馆数据 
/api/v1/recent | 新发布数据列表  
/api/v1/mylove | 铭心绝品数据列表 
/api/v1/tag/:tag | 显示分类数据 例子tag: 书法，绘画，工笔
/api/v1/search/:key | 查询数据列表 <br>例子： http://ltfc.net/api/search/%E6%9D%8E%E5%85%AC%E9%BA%9F
/api/v1/outline.json | 年代列表 <br>例子：http://ltfc.net/cagstore/outline.json
/api/v1/hotsearch | 热搜词列表
/api/v1/info/:uuid | 返回图片的详细信息 <br>例子： http://ltfc.net/api/info/561d3c325af63245ad60b483
/api/v1/downlink/:uuid?uid=:unique_identifier | 返回图片下载信息<br>例子：http://ltfc.net/api/downlink/5aebb75154abff7ca62f551c?uid=the_uid_get_from_app_receipt
/api/v1/status | 返回当前整体图片状态
/api/v1/checkversion/:verion | 检查当前版本，推送是否需要升级信息，判断当前app版本是否需要升级 <br>:version 提交当前app版本，返回值形如：{"action":"skip"} 或者是 {"action":"upgrade"}, 本请求根据 app_key 判断当前发起请求的是什么app
/api/v1/category | 返回所有分类，用户在分类列表中展示目录，返回值的数据项如下<br>{"tags":"油画","lable":"油画","filter":"age","cover":"/images/head-icon.png","count":0}
/api/v1/tags/:tags | 返回某个分类下的所有数据，如果数据超过1000张，只返回前1000张，参数： <br>tags：标签条件，按照 cagetory API 中返回的标签条件提交

## 查询请求中的字段说明：
查询请求中有3个通用的参数，格式如下：

### 1. page
page参数用于制定返回的数据页，格式如: 
```JSON
{
  page : {
    skip: 100,
    limit: 20
  }
}
```
其中各项字段：

skip 表示开始载入数据为止，limit 表示返回的数据条数。

返回的数据条数如果等于limit，表示还有更多数据可以载入，返回的数据小于limit，表示已经到达末尾。

### 2. sort
sort参数指定返回数据的排序方式，格式如下：
```
{
  sort : {
    ctime: -1
  }
}
```
其中排序字段可以自由指定

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
"desc": "...",
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


API URL | 描述 / 例子
------------ | -------------
/outline/:age/:author/:paintingName | 通过年代，作者，作品名称打开图片，会自动打开匹配到的第一幅图片。<br>例子：http://ltfc.net/outline/五代/顾德谦/莲池水禽图轴对轴1#view=webview_ios
/imglite.html?uuid=:uuid| APP打开某幅图的大图界面 <br>例子：http://ltfc.net/imglite.html?uuid=5684dcecdab0b2f921eef810&app={APP_KEY}&token={APP_TOKEN}
http://cag.ltfc.net/cagstore/:uuid/tb.jpg | 缩略图路径 <br>例子：http://cag.ltfc.net/cagstore/5684dcecdab0b2f921eef810/tb.jpg
http://ltfc.net/imglite/:uuid | 微博或者其他社交媒体分享时使用的页面 <br>例子： http://ltfc.net/imglite/5684dcecdab0b2f921eef7e1?app={APP_KEY}&token={APP_TOKEN}


### 说明：

/outline/:age/:author/:paintingName
参数：

    uuid: 其中uuid使用从API中拉到的_id字段
    view: iOS使用webview_ios，Android使用webview_andorid
    act: access token,用户login后，可以拿到一个 cag_access_token，这个 token 用于透传用户信息到 webview 中，让 webview 知道当前的用户信息
备注: 当view参数不为空时，缩放按钮，评论按钮都会隐藏。

/imglite.html?uuid=:uuid&view=webview_ios#uuid=：uuid&view=webview_ios
参数：

    uuid: 其中uuid使用从API中拉到的_id字段

注意: api有修改，这些取不到缩略图的就是新加的画集，需要显示snapUrl指定的图片， 如果snapUrl字段没有，就还用以前的方式显示图片

## 4. 微信用户登陆和支付接口
请先阅读微信登陆接入文档，以了解相关背景知识：
https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html

请求格式：
https://api.ltfc.net/{API}?app={APP_KEY}&token={APP_TOKEN}

API URL | 需要登陆 | 描述 / 例子
------------ | ------------- | ------------- 
/api/v1/wx/checksession | 否 | 判断用户登陆状态，如果是正确登陆用户，返回用户信息，如果不是已经注册的用户，则为用户创建一个账户，详见下文接口说明 <br> 参数: <br>  code: 微信登陆返回的session code 
/api/v1/wx/bindencryptuserinfo | 否 | 对用户数据进行解密，并保存到用户信息中，详见下文接口说明 <br> 参数: <br>  openid: 用户 openid <br> encryptedData: 加密数据 <br>iv: 加密向量
/api/v1/wx/createorder | 是 | 调用微信支付，创建订单，并返回订单号给客户端，详见下文接口说明 <br> 参数: <br>  type: 订单类型
/api/v1/wx/createorder | 是 | 调用微信支付，创建订单，并返回订单号给客户端，详见下文接口说明 <br> 参数: <br>  type: 订单类型

各个接口详细说明
### 4.1
/api/v1/wx/checksession  
说明:  
调用 wx.login() 后，微信服务会返回一个code, 把这个code发送到我们的服务器上进行登陆验证，验证通过后服务器会返回当前用户信息，验证不通过会返回错误。

参数:  
code: 微信登陆返回的session code   

返回：  
* 如果用户已经存在，则返回用户信息
* 如果用户不存在，则创建用户，并返回创建的用户信息

小程序调用代码例子：
```javascript
wx.login({
    async success(data) {
        try {
        let res = await sendRequest({
            url: '/api/v1/wx/checksession',
            data: {
            code: data.code
            }
        });
        console.log('拉取openid成功', res)
        self.globalData.openid = res.data.openid
        self.globalData.hasLogin = true
        callback(null, self.globalData.openid, self.globalData.userInfo)
        } catch (err) {
        console.log('拉取用户openid失败，将无法正常使用开放接口等服务', err);
        callback(err)
        }
    },
    fail(err) {
        console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
        callback(err)
    }
})
```

### 4.2
/api/v1/wx/bindencryptuserinfo  
说明:  
调用wx.getUserInfo()操作，返回用户信息，其中 encrytedData 包含加密后的用户信息，使用该数据建用户信息

参数:  
* openid: 用户openid   
* encryptedData: 加密数据  
* iv: 加密向量  

返回:
* 创建成功，返回用户信息
* 创建失败返回出错信息

小程序调用代码例子：
```javascript
let encryptedData = info.detail.encryptedData;
let iv = info.detail.iv;

try {
    let res = await sendRequest({
        url: `/api/v1/wx/bindencryptuserinfo?${requestSuffix}`,
        data: {
        openid: openid,
        encryptedData: encryptedData,
        iv: iv
        }
    });

    app.globalData.userInfo = res.data.userInfo;
    app.globalData.hasLogin = true;

    self.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: app.isRegistUser()
    });
} catch (err) {
console.log('拉取用户openid失败，将无法正常使用开放接口等服务', err);
showMessage('创建用户失败');
}
```

### 4.3
/api/v1/wx/createorder
说明:  
调用微信支付服务，创建一个新订单，并返回支付信息，供前端拉起收银台  
注意：用户需要是已经登陆的状（调用过checksession），http client还需要支持session

参数:  
* type: 支付类型, 目前支持三种：CAG1 | CAG2 | TEST
  * CAG1: 3个月
  * CAG2: 12个月
  * TEST: 测试用

返回:
* 创建成功，返回订单信息，供拉起收银台
* 创建失败返回出错信息

小程序调用代码例子：
```javascript
      let res = await sendRequest({
        url: `/api/v1/wx/createorder?${requestSuffix}`,
        data: {
          //type: 'TEST1'
          type: 'CAG2'
        }
      });
      if (res.data.R === 'Y') {
        let payargs = res.data.M.payargs;
        wx.requestPayment({
          timeStamp: payargs.timeStamp,
          nonceStr: payargs.nonceStr,
          package: payargs.package,
          signType: payargs.signType,
          paySign: payargs.paySign,
          success: () => {
            showMessage('支付成功');
            wx.navigateBack({ delta: 1 });
          },
          fail: (err) => {
            console.log('调用支付失败', err);
            showMessage('支付失败');
          }
        });
      } else {
        showMessage('请求出错', 'none');
      }
```

## 5. 其他用户登陆接口
用户登陆后，服务器端会通过sid返回当前 session id 给客户端，客户端的每次请求，都需要通过cookied 带上 session id。

API URL | 需要登陆 | 描述 / 例子
------------ | ------------- | ------------- 
/api/v1/tourist/sendverifycode/:phone/:code | 否 | 发送验证码到制定手机
/api/v1/tourist/phonelogin/:phone/:verify | 否 | 使用电话号码和验证码登陆 
/api/v1/tourist/appleidlogin | 否 | 苹果ID登陆 
/api/v1/tourist/umengwxlogin | 否 | 友盟微信登陆 
/api/v1/tourist/retrive | 是 | 返回当前用户信息
/api/v1/tourist/update | 是 | 更新当前用户信息  
/api/v1/tourist/ubind | 否 | 解绑微信或者是苹果信息
/api/v1/tourist/updateumengwx | 是 | 更新umeng微信信息
/api/v1/tourist/updateappleinfo | 是 | 更新umeng微信信息更新苹果信息
/api/v1/tourist/compare_extend_vip | 是 | 延长订阅时间


### 5.1 发送验证码到手机
URL: /api/v1/tourist/sendverifycode/:phone/:code
<pre>
参数: 
  phone: 电话号码 
  code: 保护码
返回值:  
{"R":"Y","M":{code: "已入队", msg: "短信验证码已经发送，请尽快使用" }} , 
{"R":"Y","M":{code: '当前验证码有效', msg: "上次发送的验证码依然有效，请继续使用"}} ,  
{"R":"N","M":{code:"发送错误", msg:"服务器端发送错误"}} , 其中msg内容可以直接展示给用户
</pre>


### 5.2 用电话号码和验证码登陆
URL: /api/v1/tourist/phonelogin/:phone/:verify
<pre>
 参数: 
  phone: 电话号码 
  verify: 通过短信发送的验证码,
返回值：成功返回：{"R":"Y","M":{userInfo: ... }} , 失败返回：{"R":"N","M":{msg:"验证码错误"}} 
</pre>

### 5.3 苹果ID登陆
URL: /api/v1/tourist/appleidlogin
<pre>
参数: 
  appleid: 苹果id 
  data: json格式的数据提，内容例子：{"name":"shuangtao","email":"test@test.com"}，
</pre>
整个请求体的格式如下：
> { appleid:"ap000001",  "data":{"name":"shuangtao","email":"test@test.com"}} 

可以使用如下shell脚本进行测试：
> curl http://dev.ltfc.net:4000/api/v1/tourist/appleidlogin -d "payload=%7B%22appleid%22%3A%22ap000001%22%2C%22data%22%3A%7B%22name%22%3A%22shuangtao%22%2C%22email%22%3A%22test%40test.com%22%7D%7D"

### 5.4 友盟微信登陆 
URL: /api/v1/tourist/umengwxlogin
<pre>
  参数: 
   data: json格式的数据提
</pre>
内容例子：
> { data: {     "uid" : "wx0000001", "openid": "opne_test_id_00001", "accessToken": "access_test_token", "refreshToken": "refresh_test_token", "expiration": "2019-11-11", "name": "李双涛", "iconurl": "http://cag.ltfc.net/snap/5dcd84af0dccd726b7cc76d3/cv_640x280_1573785877403.jpeg", "gender": "男", "originalResponse": "xxxxxxxx"} }

 可以使用如下shell脚本进行测试：
> curl http://dev.ltfc.net:4000/api/v1/tourist/umengwxlogin -d "payload=%7B%22data%22%3A%7B%22uid%22%3A%22wx0000001%22%2C%22openid%22%3A%22opne_test_id_00001%22%2C%22accessToken%22%3A%22access_test_token%22%2C%22refreshToken%22%3A%22refresh_test_token%22%2C%22expiration%22%3A%222019-11-11%22%2C%22name%22%3A%22%E6%9D%8E%E5%8F%8C%E6%B6%9B%22%2C%22iconurl%22%3A%22http%3A%2F%2Fcag.ltfc.net%2Fsnap%2F5dcd84af0dccd726b7cc76d3%2Fcv_640x280_1573785877403.jpeg%22%2C%22gender%22%3A%22%E7%94%B7%22%2C%22originalResponse%22%3A%22xxxxxxxx%22%7D%7D"

### 5.5 返回当前用户信息
URL: /api/v1/tourist/retrive
<pre>
  参数: 无
</pre>

返回一个UserInfo结构体，UserInfo的主要字段解释如下：
```javascript
UserInfo： {
    // 用户唯一编号，唯一不变的用户ID
    _id : String,
    // ---- 基本信息 ----
    // 访客ID，用于在web页面上登陆的访客的唯一标识，APP不用关注
    userid : String,
    // 访客昵称，用户创建时候会根据各种规则产生
    name : String,
    // 主页，或者是社交媒体主页
    url : String,
    // 头像
    avatar_url: String,
    // 其他用户相关信息
    email : String,
    // 电话号码
    phone: String,
    // 下载数据次数
    downloadCnt : { type: Number, default: 0 },
    // 当前拥有的下载次数，普通用户有3次下载机会，华艺通用户每个月有30次下载机会
    // 每月自动刷新下载机会，如果下载机会为0，则不允许下载，目前只用于PC端
    downloadTicketCnt : { type: Number, default: 3},
    // 用户角色，当前包括: 游客 / 专业用户
    role : { type : String, default : ROLE_TOURIST },

    // 微信 openid，这个openid 是用户使用微信小程序的openid
    // deprecated: 这个openid 只是小程序的 openid，不能作为
    // 用户标识，使用wx_unionid作为标识
    wx_openid: String,
    // 微信 unionid
    wx_unionid: String,
    // 调用code2session 后返回的 session key
    wx_sessionkey: String,
    // 微信用户信息
    wx_nickName: String,
    wx_gender: String,
    wx_city: String,
    wx_province: String,
    wx_country: String,
    wx_avatarUrl: String,

    // 苹果相关的注册信息
    apple_id: String,
    apple_nickName: String,
    apple_email: String,

    // 最后一次 VIP 付费时间
    vip_charge_date: Date,
    // VIP用户过期时间
    vip_expire_date: Date,
}
```

### 5.6 更新当前用户信息
更新用户的一些基本信息，例如头像，昵称等，重要信息不能通过这个接口更新，比如绑定微信，电话等，都有专用的接口
URL: /api/v1/tourist/update
<pre>
 参数: 
   data: json格式的数据体，和UserInfo的结构一样
</pre>

### 5.7 更新当前用户更新电话信息
URL: /api/v1/tourist/updatephone
<pre>
参数
  verify: 验证码，
  phone : 电话号码，
</pre>
注意:参数内容通过请求题提传递，和 sendverifycode 不一样


### 5.8 解绑微信或者是苹果信息
URL: /api/v1/tourist/ubind
<pre>
参数：
  data: 要解除绑定的类型，可以是'apple' ， 'weixin'
返回值：
正常调用的返回值如下
{
  R:'Y',
  M: { doc: userInfo.toObject() }
}

错误的返回值如下：
{
  R:'N',
  M: { doc: userInfo.toObject() }
}
</pre>



### 5.9 更新umeng微信信息更新苹果信息
URL: /api/v1/tourist/updateappleinfo
<pre>
参数：
  appleid: 新的苹果ID
  data: {name, email}
返回值：
正常调用的返回值如下
{
  R:'Y',
  M: { doc: userInfo.toObject() }
}

错误的返回值如下：
{
  R:'N',
  M: {msg: "该苹果账号已经绑定到其他用户，不能重复绑定"}
}
</pre>


### 5.10 更新umeng微信信息
URL: /api/v1/tourist/updateumengwx
<pre>
 参数：
  data: umeng登陆的时候返回的信息
返回值：
正常调用的返回值如下
{
  R:'Y',
  M: { doc: userInfo.toObject() }
}

错误的返回值如下：
{
  R:'N',
  M: {msg: "该微信已经绑定到其他用户，不能重复绑定"}
}
</pre>



### 5.11 比较并延长订阅时间
URL: /api/v1/tourist/compare_extend_vip
<pre>
 参数：
  date: 待延长的时间
  data: 其他附加信息
返回值：
正常调用的返回值如下
{
  R:'Y',
  M: { vip_expire_date: current.vip_expire_date }
}

错误的返回值如下：
{
  R:'N',
  M: {msg: "错误提示"}
}
</pre>



## 6. 收藏相关API
用户登陆后，服务器端会通过sid返回当前 session id 给客户端，客户端的每次请求，都需要通过cookied 带上 session id。

API URL | 需要登陆 | 描述 / 例子
------------ | ------------- | ------------- 
/api/v1/note/pin | 是 | 加入收藏夹，
/api/v1/note/batchpin | 是 | 批量加入收藏夹
/api/v1/note/check/:paintingId | 是 | 检查某个图片是否在收藏夹中
/api/v1/note/list | 是 | 列出收藏夹中的所有作品
/api/v1/note/count | 是 | 收藏夹中的所有作品数量
/api/v1/note/delete/:paintingId | 是 | 从收藏夹移除
/api/v1/footprint/list | 是 | 列出访问足迹
/api/v1/footprint/count | 是 | 足迹数量


### 6.1 加入收藏夹
URL: /api/v1/note/pin
<pre>
参数：
  paintingId: 目标图片ID
返回值：
{ R:'Y', M: {} }
错误的返回值如下：
{ R:'N', M: {msg: "错误提示"} }
</pre>

### 6.2 加入收藏夹
URL: /api/v1/note/batchpin
<pre>
参数：
  pins: 批量列表，形如： { pins: [ {paintingId: '11111'}, {paintingId: '22222'}, {paintingId: '333333'},] }
返回值：
{ R:'Y', M: {} }
错误的返回值如下：
{  R:'N', M: {msg: "错误提示"} }
</pre>


### 6.3 检查某个图片是否在收藏夹中
URL: /api/v1/note/check/:paintingId
<pre>
参数：
  在URL中拼接 paintingId 即可
返回值：
  { R:'Y', M: { doc:true } }
  或者是 { R:'Y', M: { doc:false } }
</pre>


### 6.4 /api/v1/note/list
URL: /api/v1/note/list
<pre>
 参数：
 page: 当前显示的页数
 cond: 查询条件
 sort: 返回值中的排序字段
 例子：{"cond":{},"page":{"skip":0,"limit":20},"sort":{"_id":1}}
返回值：
  {"R":"Y","M":{"docs":[
    {
      "_id":"5dd813d09f601784c1015f3c",
      "paintingId":"5dc1b16181627035162a7a76",
      "touristId":"5dd6b219a0d6d7214a05d6ea",
      "ctime":"2019-11-22T16:58:56.866Z",
      "title":"夏珪（传）《秋江渔乐图》",
      "utime":"2019-11-22T16:58:56.866Z"},
    ...]}}
</pre>


### 6.5 收藏夹中的所有作品数量
URL: /api/v1/note/count
<pre>
参数：
  cond: 查询条件
  例子：{"cond":{}}
返回值：
  {"R":"Y","M":{ count: count }}
错误的返回值如下：
</pre>

### 6.11 移除收藏夹中的图片
URL: /api/v1/note/delete/:paintingId
<pre>
参数：
paintingId: URL 中拼接 paintingId
返回值：
{"R":"Y","M":{ count: count }}
错误的返回值如下：
{ R:'N', M: {msg: "错误提示"} }
</pre>


## 7. 题跋信息相关API
查询和图片相关的用户题跋信息
API URL | 需要登陆 | 描述 / 例子
------------ | ------------- | ------------- 
/api/v1/suggestion/create | 是 | 创建一条题跋
/api/v1/suggestion/delete | 是 | 删除题跋，只能删除自己发布的题跋，不能删除别人的
/api/v1/suggestion/list | 否 | 列出画作相关的所有题跋，以时间先后排序，先发的题跋在前


### 7.1 创建建议
URL: /api/v1/suggestion/create
<pre>
参数：
paintingId: 图片资源ID
content: 题跋内容
返回值：
{"R":"Y","M":{}}
错误的返回值如下：
{ R:'N', M: {msg: "错误提示"} }
</pre>

### 7.2 创建建议
URL: /api/v1/suggestion/delete
<pre>
参数：
uuid: 题跋ID
返回值：
{"R":"Y","M":{}}
错误的返回值如下：
{ R:'N', M: {msg: "错误提示"} }
</pre>

### 7.2 创建建议
URL: /api/v1/suggestion/list
<pre>
参数：
paintingId: 图片资源ID
返回值：
{"R":"Y","M":{ docs: suggestions }}
  其中suggestion是一个列表，具体字段参考后端代码
错误的返回值如下：
{ R:'N', M: {msg: "错误提示"} }
</pre>
