<template>
  <div id="intro">
    <div id='notice' style=''>
      <div class="radius">
        <img src="@/assets/img/head.jpg" alt="" >
      </div>
      <h3>ChisDiva</h3>
      <div class="school-info">
        <div>中南大学</div>
        <div>电子信息工程</div>
        <div>2018 -- 2022</div>
      </div>
      <div class="person-info">
        <div>前端:Vue+Element-UI</div>
        <div>后端:Node+MongoDB</div>
      </div>
      <div class="visitor-info">
        <div class="your-words">相见恨晚
          <svg viewBox="64 64 896 896" focusable="false" data-icon="heart" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"></path>
          </svg>
        </div>
        <div>来自 <span> {{visitorAddress||unknown}}</span>的访问者</div>
        <div>当前时间是 <span>{{nowTime}}</span></div>
        <div>您的IP：<span>{{visitorIP||unknown}}</span></div>

      </div>
      <a href="https://github.com/chisdiva" title="GITHUB">
        <svg t="1633174512160" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2400" width="48" height="48">
          <path d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667" p-id="2401" fill="#1296db">
          </path>
        </svg>
      </a>
<!--      github主页：<br><a href="https://github.com/ssevenk">https://github.com/ssevenk</a><br><br>-->
<!--      segmentFault主页：<a href="https://segmentfault.com/u/yexingfeng">https://segmentfault.com/u/yexingfeng</a>-->
    </div>
  </div>
</template>

<script>
import {format} from '@/common/util'
import {request} from "@/network/request"
import { jsonp } from 'vue-jsonp'

export default {
name: "Introduction",
  data() {
    return {
      nowTime: '',
      visitorAddress: '',
      visitorIP: '',
      unknown: '未知'
    }
  },
  created() {
    //获取IP和地址
    request('/getIP').then(res => {
      this.visitorIP = res.data.clientIP
      this.visitorAddress = res.data.location
    })


    this.nowTime = format("YYYY/mm/dd HH:MM:SS", new Date())
  }
}
</script>

<style scoped>
#notice {
  display:inline-block;
  line-height:1.8em;
  height:600px;
  width:300px;
  padding:20px;
  margin-top:30px;
  background-color:rgba(255,255,255, 0.1);
  box-shadow: 5px 5px 20px rgb(228, 227, 227);

}
.radius {
  width: 100px;
  height: 100px;
  border: 1px solid transparent;
  border-radius: 50px;
  animation: 2s ease 0s infinite normal none running shadow;
  overflow: hidden;
  margin: 0 auto;
  /*text-align: center;*/
  /*vertical-align: top;*/
}
@keyframes shadow {
  0% {
    box-shadow:
        rgb(255 255 255) 0px 0px 1px,
      rgb(255 255 255) 0px 0px 5px,
      rgb(255 255 255) 0px 0px 10px,
      purple 0px 0px 20px,
      purple 0px 0px 5px,
      pink 0px 0px 11px;;
  }
  100% {
    box-shadow: rgb(255 255 255) 0px 0px 5px,
    rgb(255 255 0) 0px 0px 10px,
    rgb(255 255 0) 0px 0px 15px,
    green 0px 0px 8px,
    green 0px 0px 10px,
    rgb(0 0 255) 0px 0px 12px;
  }
}
.radius img {
  width: 100%;
  height: 100%;
}
h3 {
  color: #269df0;
  font-weight: 800;
  width: 25%;
  text-align: center;
  margin: 10px auto;
  transform: translateX(-10%);
}
.school-info {
  color: deepskyblue;
  width: 35%;
  margin: 5px auto;
  font-size: 13px;
  padding-left: 5%;
}
.person-info {
  color: rgb(127,127,127);
  width: 50%;
  margin: 0 auto 10% auto;
  font-size: 12px;
}
.visitor-info {
  color: rgb(127,127,127);
  font-size: 12px;
  width: 90%;
  margin: 0 auto 10% auto;
  text-align: center;
}
.your-words {
  text-align: left;
  font-size: 17px;
  color: rgb(24, 144, 255);
  border-radius: 4px;
  border-bottom: 1px solid rgb(24, 144, 255);
  margin-bottom: 2px;
}
.visitor-info span {
  color: #00a7e9;
  font-size: 16px;
  line-height: 22px;
}

#notice a {
  margin-left: 40%;
}
#notice a svg {
  text-align: center;
  vertical-align: top;
  width: 40px;
  height: 40px;
}
</style>