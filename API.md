# 中华珍宝馆 webapi 文档

## 1. API请求格式
https://api.ltfc.net/{API}?app={APP_KEY}&token={APP_TOKEN}

API: api 结构名称，具体内容参加下表
APP_KEY: app标识，用来唯一标识一个app，APP_KEY需要与APP_TOKEN匹配，申请之后不会变化
APP_TOKEN: app令牌，后台为每个app生成一个唯一的令牌，令牌错误将不能访问 api 接口

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
    view: iOS使用webview_ios，Android使用web view_andorid
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
/api/v1/tourist/sendverifycode/:phone/:code | 否 | 发送验证码到制定手机 <br> 参数: <br>  phone: 电话号码 <br>  code: 计算得出的一个简单保护码 
/api/v1/tourist/phonelogin/:phone/:verify | 否 | 使用电话号码和验证码登陆 <br> 参数: <br>  phone: 电话号码 <br> verify: 通过短信发送的验证码
/api/v1/tourist/appleidlogin/:name/:email | 否 | 苹果ID登陆 <br> 参数: <br>  name: 用户名 <br> email: 邮箱号
/api/v1/tourist/retrive | 是 | 返回当前用户信息
/api/v1/tourist/update | 是 | 更新当前用户信息