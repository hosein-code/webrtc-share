# <center>WebRTC入门</center>

## 简介
__定义__

WebRTC (Web Real-Time Communications) 是一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点（Peer-to-Peer）的连接，实现视频流和（或）音频流或者其他任意数据的传输。WebRTC包含的这些标准使用户在无需安装任何插件或者第三方的软件的情况下，创建点对点（Peer-to-Peer）的数据分享和电话会议成为可能。

__业务场景__

- 直播
- 实时视频通话
- 共享桌面

__WebRTC架构__

![avatar](./images/webrtc-structure.png)

## 媒体

__获取本地设备__  

MediaDevices.enumerateDevices()  

通过此方法可以获取媒体输入和输出设备的列表，例如麦克风，摄像机，耳机设备等
```js
// 列出相机和麦克风。

navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
  devices.forEach(function(device) {
    console.log(device.kind + ": " + device.label +
                " id = " + device.deviceId);
  });
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
});
```

__获取本地媒体__

MediaDevices.getUserMedia()

```js
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  /* 使用这个stream stream */
})
.catch(function(err) {
  /* 处理error */
});
```

navigator.getUserMedia ( constraints, successCallback, errorCallback )
```js
var promise = navigator.mediaDevices.getUserMedia(constraints);
```
> 注: navigator.getUserMedia已被废弃，使用MediaDevices.getUserMedia()代替

API参考地址：https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia

__媒体约束__  
在获取本地媒体时，可以通过给getUserMedia函数传参(constraints)来约束获取到的媒体，包括宽、高、采样率以及对音视频的处理(降噪/防抖等)

API参考地址：https://developer.mozilla.org/zh-CN/docs/Web/API/MediaTrackConstraints


__媒体流与音视频轨道__

在浏览器中提供了媒体流的抽象类: __MediaStream__，一个流可以由多个轨道组合而成。下图展示了流与轨道之间的关系。

![avatar](./images/media&track.png)


在 __MediaStream__ 对象中可以通过addTrack()和getTracks()等方法来操作轨道。轨道抽象类 __MediaStreamTrack__ 中也包含了轨道的状态(名字、类型等)。

MediaStream API参考地址：https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStream  
MediaStreamTrack API参考地址：https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStreamTrack


__WebRTC录制__

- 视频录制

- 屏幕录制


## 链接流程

__C/S链接流程__

__WebRTC链接流程__

## 信令服务器

__作用__

- 协商媒体功能和设置
- 标识和验证会话参与者的身份
- 控制媒体会话、指示进度、更改会话和终止会话
- 当会话双方同时尝试建立或更改会话时，实施双占用分解

## 网络科普

### P2P(peer-to-peer networking)
__什么是P2P ?__  


### NAT 

__什么是NAT ?__  

NAT(Network Address Translation,网络地址转换)，也叫做网络掩蔽或者IP掩蔽。NAT是一种网络地址翻译技术，主要是将内部的私有IP地址转换成可以在公网使用的公网IP。

__为什么会有NAT ?__ 

众所周知IPv4是32位的，满打满算也只有2<sup>32</sup>(4294967296)个地址，很早就其他国家占用完毕。我们国家分到公网IP地址太少，不够用，所以采取了这种地址转换策略，这样就暂时解决了IP短缺的问题

__NAT实现方式__

- __静态NAT:__   

  也就是静态地址转换。是指一个公网IP对应个私有IP，是一对一转换。

- __动态NAT__  

  动态NAT是在路由器上配置一个外网IP地址池，当内部有计算机需要和外部通信时，就从地址池里动态的取出一个外网IP，并将他们的对应关系绑定到NAT表中，通信结束后，这个外网IP才被释放，可供其他内部IP地址转换使用。

- __NAPT__  

  端口多路复用技术。与静态NAT的差别是，NAPT不但要转换IP地址还要进行端口转换。具体表现就是，对外只有一个公网IP，通过端口来区别不同私有IP主机的数据。NAPT主要分为两个大类: 锥型NAT和对称型NAT。锥型又分为：完全锥型、受限锥型和端口受限锥型。
  
  - 完全锥型NAT: IP和端口都不受限
  - 受限锥型NAT: IP受限，端口不受限
  - 端口受限锥型NAT: IP和端口都受限
  - 对称型NAT: 对每个外部主机或端口的会话都会映射为不同的端口  


- __NAT穿透__  
  - 为什么要进行NAT穿透 ? 
  - 穿透原理
  - 穿透方式  
    stun

参考地址：
- https://zhuanlan.zhihu.com/p/116075005
- https://zhuanlan.zhihu.com/p/58019023

__STUN__

__TURN__

__ICE__

__SDP__

###
