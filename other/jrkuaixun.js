/*
10s阅读
微信打开立即参与 -> http://h5.qzsjfc.xyz/j/h?upuid=136513&ch=xmy&type=1
备用链接 -> http://h5.saibangkaile.xyz/j/h?upuid=136513&ch=xmy&type=1

每小时有0.3 一天5轮 一天1.5
进不去关注10秒读书极速版公众号用官方链接
使用方法:点击开始阅读 成功阅读一次即可抓到包
脚本没写过盾的
每次运行都要手动验证一次(也就是一天5次)
点立即阅读,等文章出来后关闭页面(注意 千万不要返回)
拉一人头提现0.3奖励0.5 0.8再奖励0.5
https://t.me/wenmou_car

[task_local]
#10s阅读
0 8-14/1 * * * https://raw.githubusercontent.com/Wenmoux/scripts/wen/other/jrkuaixun.js, tag=10s阅读, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
[rewrite_local]
#10s阅读
.*read_channel\/do_read&pageshow.* url script-request-header https://raw.githubusercontent.com/Wenmoux/scripts/wen/other/jrkuaixun.js
 
#loon
http-request .*read_channel\/do_read&pageshow.* script-path=https://raw.githubusercontent.com/Wenmoux/scripts/wen/other/jrkuaixun.js, requires-body=true, timeout=10, tag=10s阅读
 
#surge
 
10s阅读 = type=http-request,pattern=.*read_channel\/do_read&pageshow.*,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/Wenmoux/scripts/wen/other/jrkuaixun.js,script-update-interval=0
 
[MITM]
hostname = m.lainiwl.top
 
*/
const $ = new Env('10s阅读');
const notify = $.isNode() ? require('./sendNotify') : '';
const jrpush = $.isNode() ? (process.env.jrpush ? process.env.jrpush : false) :false;
const UA = $.isNode() ? (process.env.Read10UA ? process.env.Read10UA : "Mozilla/5.0 (Linux; Android 11; Redmi K30 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045617 Mobile Safari/537.36 MMWEBID/5077 MicroMessenger/8.0.6.1900(0x2800063D) Process/tools WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64") : ($.getdata('Read10UA') ? JSON.parse($.getdata('Read10UA')) : "Mozilla/5.0 (Linux; Android 11; Redmi K30 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045617 Mobile Safari/537.36 MMWEBID/5077 MicroMessenger/8.0.6.1900(0x2800063D) Process/tools WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64")    
let host = $.getdata('read10surl')?$.getdata('read10surl'):`http://m.xhh25.top`;
let cookiesArr = [$.getdata('read10sck')]
if ($.isNode()) {
    cookiesArr = process.env.Readck ? process.env.Readck.split("@") : []
    host = process.env.readapi ? process.env.readapi : host
}
message = ""
    !(async () => {
        if (typeof $request !== "undefined") {
            await read10sck()
        }
        if (!cookiesArr[0]) {
            $.msg($.name, '【提示】请先获取cookie', '微信打开 http://h5.hakc.top/j/r1?upuid=136678&ch=xmy', {
                "open-url": "http://h5.hakc.top/j/r1?upuid=136678&ch=xmy"
            });
            return;
        }
        console.log(`共${cookiesArr.length}个账号`)
        for (let k = 0; k < cookiesArr.length; k++) {
            $.canRead = true
            $.message = ""
            cookie = cookiesArr[k];
            for (let i = 0; i < 33 && $.canRead; i++) {
                console.log(`账号【${k+1}】第${i+1}次阅读中`)
                //   console.log(i)
                let url = await read()
                if (url) {
                    if (url == "/read_channel/finish") {
                        console.log("已达到阅读上限,下个小时再来吧")
                        i = 9999
                    } else {
                        await read(url)
                        await $.wait(1000);
                    }
                }
                if ($.message.length != 0) {
                    message += `账号【${k+1}】：${$.message} \n\n `
                }
            }
        }   
        if (message.length != 0) {
         $.msg($.name, "", '10s阅读' + message) 
         }
        if ($.isNode() && jrpush) {
            if (message.length != 0) {
                await notify.sendNotify("10s阅读", `${message}\n\n吹水群：https://t.me/wenmou_car`);
            }
        } else {
            $.msg($.name, "", '10s阅读' + message)
        }
        
    })()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
//获取活动信息


function read10sck() {
    if ($request.url.indexOf("do_read") > -1) {
        const read10surls = $request.url
        let read10surl = read10surls.match(/(.+?)\/read_channel/)
         $.setdata(JSON.stringify($request.headers),"read10surl")
//        $.msg($.name, "", '10s阅读 获取数据获取成功！'+read10surl)
          if(read10surl)     $.setdata(read10surl[1],"read10surl")
        if ($request.headers.Cookie) $.setdata($request.headers.Cookie, `read10sck`)
        $.log(read10sck)
        $.msg($.name, "", '10s阅读 获取数据获取成功！')
    }
}

function read(url1) {
    return new Promise(async (resolve) => {
        if (!url1) {
            url = `${host}/read_channel/do_read&pageshow&r=`
        } else {
            url = url1
        }
      let headers = {
            cookie,
            referer:url,
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": UA
        }
        let options = {
            headers,
            url
        }
         //  console.log(options)
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    //   console.log(`${JSON.stringify(err)}`);
                    //  console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    //       console.log(url)
                    if (!url1) {
                        console.log(data)
                        data = JSON.parse(data);
                        if (data.url) {
                          if(!data.jkey){                  
                            resolve(data.url)}else{
                                    $.message = "该账号需要验证请手动阅读一次并关掉页面(不要点返回)"
                         $.canRead = false
                            }
                        } else {
                       //     console.log(data.click_check)
                            if (data.click_check ) {
                                $.message = "该账号需要验证请手动阅读一次并关掉页面(不要点返回)"
                                  console.log($.message)
                            } else {
                                console.log(data)
                            }
                            $.canRead = false
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}


function jsonParse(str) {
    if (typeof str == "string") {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
            $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
            return [];
        }
    }
}

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

