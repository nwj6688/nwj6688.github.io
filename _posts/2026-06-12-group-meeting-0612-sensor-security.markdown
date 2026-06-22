---
layout: post
title: "组会汇报：自动驾驶传感器攻击与语音注入攻击研究"
date: 2026-06-12 10:00:00 +0800
author: "王佳琪"
tags: [智能驾驶安全, 网络空间安全, AI安全]
featured_image: /images/blog/2026-06-12-group-meeting-0612-sensor-security-fig01.jpg
reading_time: 20
papers:
  - title: "Invisible but Detected: Physical Adversarial Shadow Attack and Defense on LiDAR Object Detection"
    venue: "USENIX Security 2025"
    authors: "Ryunosuke Kobayashi, et al."
  - title: "Can You Trust Autonomous Vehicles: Contactless Attacks against Sensors of Self-driving Vehicle"
    venue: "DEF CON 24, 2016"
    authors: "Chen Yan, Wenyuan Xu, Jianhao Liu"
  - title: "DolphinAttack: Inaudible Voice Commands"
    venue: "ACM CCS 2017"
    doi: "10.1145/3133956.3134052"
    authors: "Guoming Zhang, Chen Yan, Xiaoyu Ji, et al."
excerpt: "本次组会由王佳琪同学汇报了三篇AI安全领域前沿论文：USENIX Security 2025的Shadow Hack、DEF CON 24的传感器非接触攻击、CCS 2017的DolphinAttack。"
---

## 引言

![封面](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig01.jpg)
*图 2: 自动驾驶传感器与语音助手安全攻击示意图*

本次组会汇报聚焦于AI系统的物理层安全，探讨了三篇从不同角度揭示智能系统传感器脆弱性的论文：

1. **USENIX Security 2025 — Shadow Hack**：通过在路面铺设特殊材料制造点云阴影，欺骗自动驾驶LiDAR检测模型凭空产生虚假障碍物；
2. **DEF CON 24 — 传感器非接触攻击**：通过声、电磁波、光等物理信道，对特斯拉的超声波雷达、毫米波雷达和摄像头实施干扰与欺骗；
3. **ACM CCS 2017 — DolphinAttack**：利用超声波载波将人耳不可闻的语音指令注入智能语音助手。

这三篇论文虽然针对的传感器和目标系统各异，但其核心思路高度一致——**系统默认信任传感器物理层输入，而攻击者正是利用了这种信任，在物理层注入或篡改信号，使上层AI算法基于被污染的数据做出错误决策**。

---
## Paper 1: Shadow Hack — 利用激光雷达阴影欺骗3D目标检测

| 属性 | 信息 |
|------|------|
| **会议** | USENIX Security 2025 |
| **作者** | Ryunosuke Kobayashi, et al. |
| **核心** | Shadow Hack攻击+BBValidator防御，材料制造LiDAR空洞使模型假阳性 |

### 背景与动机

3D 目标检测模型在处理时，受边界效应和深度学习特征提取的影响，会错误地将这些“阴影边缘缺陷”当成物体的三维特征。

### 攻击概述
Shadow Hack的攻击目标不是让车消失，而是在无车处制造类似车后阴影的点云缺失区域。

![Shadow Hack](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig01.jpg)
*图 3: Shadow Hack*

![Shadow Hack](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig02.png)
*图 4: Shadow Hack*

### 背景与动机

实验系统包含虚拟仿真测试平台（基于 CARLA / OpenPCDet）以及真实的物理光学暗室测试台（包含 16 线/64 线真实激光雷达）。

整个实验输入的是控制良好的材料几何形状，输出则是送入下游 AI 模型的点云矩阵。

### 形状优化

为了便于优化，论文将LiDAR扫描形成的扇形阴影近似为一个梯形，用三个参数描述：上底（a）、下底（b）、长度（l）。

优化目标是，在车辆距离7到17米的范围内，最大化模型将该区域检测为汽车的帧数。

最终优化出的高效形状参数为：a=1.4米，b=1.6米，l=5.0米。

![优化](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig03.png)
*图 5: 优化*

### 形状优化

矩形阴影有效的原因——训练数据（KITTI）中被标注为汽车的阴影多为矩形。因为真实车辆通常是盒状物体，遮挡/阴影结构也更像矩形。

这说明Shadow Hack的成功高度依赖于特定数据集和模型的训练偏差。

![优化](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig04.png)
*图 6: 优化*

### 阴影材料研究

镜面片在多个 LiDAR 上平均接近 100% 点云移除，最适合攻击。

![材料](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig05.jpg)
*图 7: 材料*

### 阴影材料研究

论文报告镜面片在 VLP-16、OS0-64、OS1-64、QT128、M1 上平均点云移除率分别约 99.8%、98.3%、98.2%、96.5%、99.0%。

![材料](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig06.jpg)
*图 8: 材料*

![材料](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig07.png)
*图 9: 材料*

### 攻击效果

左图展示了攻击成功率随距离的变化。对于PointPillars模型，在约11到21米的距离范围内，攻击能持续成功。

右图展示了攻击对不同检测模型的效果。voxel-based 基于体素的模型（PointPillars， SECOND-IoU）非常脆弱，成功率接近100%。而point-based 基于原始点的模型（PointRCNN）的成功率为0%。

Shadow Hack对不同模型的有效性差异巨大，主要影响voxel-based模型。

![效果](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig09.png)
*图 10: 效果*

![效果](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig10.png)
*图 11: 效果*

### 攻击效果

物理实验成功复现了仿真结果。在10米和15米的距离上，对PointPillars和SECOND-IoU模型的攻击成功率分别达到了100%和98%等高水平，证实了Shadow Hack在真实世界的有效性。

![效果](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig11.jpg)
*图 12: 效果*

![效果](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig12.png)
*图 13: 效果*

### BBValidator防御

BBValidator 对检测模型输出的框做二次验证：

核心思想是：如果一个检测框内没有包含足够多的LiDAR点云，那它就是不可信的。

### BBValidator防御

横轴是点云数量阈值，纵轴是底部抬高距离。颜色越紫，代表防御成功率越高。可以找到参数组合使得防御成功率接近100%。

合适参数下防御成功率达到 100%。

当dh=0.05米，Nthresh≥8时，防御成功率可达100%。

在标准的、没有攻击的KITTI数据集上，开启BBValidator后，模型的正常检测精度（3D AP）变化微乎其微，只有正负0.02。

这证明了BBValidator是一个精准且轻量的‘补丁’，它能够在不影响正常驾驶功能的情况下，有效地消除这种特定的安全隐患。

![防御](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig13.png)
*图 14: 防御*

### 小结
**不伪造信号，被动拿走点云。** 优化参数 a=1.4m b=1.6m l=5.0m。

### 攻击必要条件

- 材料必须铺在激光雷达能扫到的有效地面和距离窗口内（例如论文实验中验证的 11-21 米）。太近了扫描角度太陡，太远了点云太稀疏，都无法拼凑出欺骗 AI 的“伪阴影特征”。

- 攻击者有时间窗口把平面材料放到目标车道，并让材料在车辆到来前保持位置和姿态。

- 不需要主动激光注入或精确同步 LiDAR 发射时序。

- 不需要入侵车辆、传感器或通信链路。

- 不需要明显 3D 对抗物体；平面材料更容易伪装成水坑/路面反光。

- 不需要持续在场操作，材料可提前部署。

---
## Paper 2: 传感器非接触攻击 — 自动驾驶的致盲攻击

| 属性 | 信息 |
|------|------|
| **来源** | DEF CON 24, 2016 |
| **作者** | Chen Yan, Wenyuan Xu, Jianhao Liu |
| **核心** | Tesla实车验证超声波/雷达/摄像头jamming与spoofing |

### 背景与核心问题

传统车联网安全多关注 CAN(控制器局域网络)/ECU(电子控制单元)；

本文指出自动驾驶安全依赖传感器完整性。自动驾驶算法天然默认‘传感器输入的数据都是真实的’。一旦传感器被物理信道干扰，后端算法即使没有被入侵，也会基于错误世界模型决策。

构造两类攻击：噪声淹没的 jamming；伪造回波/信号模式的 spoofing。

最后提出多传感器冗余、随机化、逻辑校验和攻击检测等防护方向。

### 三类传感器攻击面

共同点是：系统通常把传感器输出当作可信输入。

![论文原图 Fig.1：ADAS 主要传感器类型和典型部署位置](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig14.png)
*图 15: 论文原图 Fig.1：ADAS 主要传感器类型和典型部署位置*

### 统一攻击框架

### 超声波攻击

超声波传感器发出约 40-50 kHz 脉冲，测量回波飞行时间：距离 d = 0.5 × 回波传播时间 × 声速。

攻击者使用信号发生器产生特定频率的电信号，经过放大后由超声波换能器定向发射，在同一频段持续发声或伪造短脉冲。

![论文原图 Fig.2：Bosch 超声波传感器外观与剖面](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig15.png)
*图 16: 论文原图 Fig.2：Bosch 超声波传感器外观与剖面*

### 超声波攻击

![论文原图 Fig.5：原始信号、spoofing、jamming、acoustic cancellation 波形示意](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig16.png)
*图 17: 论文原图 Fig.5：原始信号、spoofing、jamming、acoustic cancellation 波形示意*

### 超声波实验结果

论文报告：在多款车上，jamming 会让真实障碍物不再触发警告；Tesla 上有效距离最长测到约 10 m。自动泊车/召唤功能中，Tesla 对部分干扰会立即停止，说明系统逻辑有所差异，但传感器层仍可被扰动。

![正常：显示 66 cm](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig17.png)
*图 18: 正常：显示 66 cm*

![正常：显示 66 cm](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig18.png)
*图 19: 正常：显示 66 cm*

![正常：显示 66 cm](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig19.png)
*图 20: 正常：显示 66 cm*

### 毫米波雷达攻击

第二组实验针对毫米波雷达。

Tesla Model S 使用 76-77 GHz车载雷达频段的高频无线电系统&nbsp;，并观察到 FMCW chirp 序列。

毫米波雷达工作在 76 到 77 GHz 的极高频段，属于射频领域，普通设备无法直接干预。作者利用低频信号发生器作为基础，外接高精度的倍频器，将信号强行提升至 76 GHz 的射频段，最后通过高增益的号角天线定向聚焦发射。

实验的输入是精心调制的电磁波，输出则是通过雷达射频前端捕获后的信噪比（SNR）变化。这组实验旨在评估多大的外部功率能够彻底摧毁自驾车的ACC远视眼。

![论文原图 Fig.7：FMCW 正斜坡与接近目标的谱示意](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig20.png)
*图 21: 论文原图 Fig.7：FMCW 正斜坡与接近目标的谱示意*

### 毫米波雷达实验结果

![论文原图 Fig.8：Tesla 雷达实验设备](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig21.png)
*图 22: 论文原图 Fig.8：Tesla 雷达实验设备*

![论文原图 Fig.8：Tesla 雷达实验设备](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig22.png)
*图 23: 论文原图 Fig.8：Tesla 雷达实验设备*

![论文原图 Fig.8：Tesla 雷达实验设备](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig23.png)
*图 24: 论文原图 Fig.8：Tesla 雷达实验设备*

### 摄像头致盲攻击

第三组实验是针对摄像头的强光盲化攻击。

论文用 LED、可见激光、红外 LED 分别照射标定板或直接照射摄像头，观察图像输出和灰度/色调分布变化。

实验的输入是物理光通量，输出则是图像的像素饱和度以及上层识别算法的检出率。

![论文原图 Fig.11：摄像头致盲实验设置](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig24.png)
*图 25: 论文原图 Fig.11：摄像头致盲实验设置*

### 摄像头致盲攻击

![摄像头](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig25.png)
*图 26: 摄像头*

![摄像头](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig26.png)
*图 27: 摄像头*

### 防护思路

检测异常高功率物理噪声，识别 jamming。

对物理层信号加入防伪随机性，降低伪造时隙命中率。

改进滤波、屏蔽和硬件保护。

多传感器冗余检查（Sensor Fusion）：雷达、摄像头、超声波互证。

系统不能盲目听信单一传感器，而是要引入置信度优先级 and 交叉互证。

对“突然消失/突然出现”的目标建立攻击检测模型。

---
## Paper 3: DolphinAttack — 超声波语音指令注入攻击

| 属性 | 信息 |
|------|------|
| **会议** | ACM CCS 2017 |
| **DOI** | 10.1145/3133956.3134052 |
| **作者** | Guoming Zhang, Chen Yan, Xiaoyu Ji, et al. |
| **核心** | MEMS麦克风非线性实现人耳不可闻语音指令注入 |

### 背景与核心问题
DolphinAttack发现MEMS麦克风的非线性特性可被超声波利用，实现人耳不可闻的语音指令注入。

### 漏洞根源：MEMS麦克风非线性

MEMS麦克风利用微机械振膜将声压转换为电信号。论文发现MEMS麦克风接收超声波时，机械振膜的非线性响应会产生意外解调——将高频超声波包络还原为可听基带信号。这是硬件物理层特性，无法通过软件补丁修复。

![MEMS麦克风结构与非线性特性](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig27.jpg)
*图 28: MEMS麦克风结构与非线性特性*

### 攻击方法
1. 调制语音到20kHz以上超声波载波
2. 功率放大器+换能器发射
3. MEMS麦克风非线性解调
4. 语音系统正常识别
5. 执行恶意操作

攻击者将语音指令调制到20kHz以上超声波载波，通过功率放大器和高频换能器发射。MEMS麦克风接收后非线性解调出低频语音信号。

使用AM调幅，载波频率20-30kHz。

![信号调制与攻击原理](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig28.jpg)
*图 29: 信号调制与攻击原理*

![信号调制与攻击原理](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig29.jpg)
*图 30: 信号调制与攻击原理*

![信号调制与攻击原理](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig30.jpg)
*图 31: 信号调制与攻击原理*

### 攻击设备

两种攻击平台：高功率固定平台（信号发生器+功放+换能器）和便携平台（手机改装换能器）。

![便携式攻击设备](/images/blog/2026-06-12-group-meeting-0612-sensor-security-fig31.jpg)
*图 32: 便携式攻击设备*

### 实验结果

覆盖Siri、Google Now、Alexa、Cortana等主流语音助手。近距离（<1m）成功率较高。测试拨打电话、发送短信、访问网址等敏感操作。

### 安全影响

安全威胁包括隐私泄露（拨打电话窃听）、金融损失（访问恶意网站）、拒绝服务（持续唤醒/关闭设备）、社交工程（假冒用户发消息）等。

### 防御措施

多层防御：硬件层面改进MEMS减少非线性；系统层面基带信号异常检测；应用层面敏感操作增加额外认证。

### 小结

利用MEMS麦克风物理层非线性特性，通过超声波注入人耳不可闻语音指令。硬件漏洞，软件补丁无法完全修复。

---
## 对比与讨论

| 维度 | Shadow Hack | 传感器攻击 | DolphinAttack |
|------|-------------|-----------|---------------|

| **目标系统** | 自动驾驶LiDAR检测 | 自动驾驶ADAS | 智能语音助手 |

| **攻击手段** | 被动材料造空洞 | 主动声/电磁/光 | 超声波调制语音 |

| **利用漏洞** | 模型训练偏差 | 传感器无认证 | MEMS非线性 |

| **攻击效果** | 假阳性障碍物 | 致盲/欺骗传感器 | 不可闻指令注入 |

| **防御思路** | BBValidator | 多传感器融合+异常检测 | 硬件滤波+基带检测 |


三篇论文揭示了共同模式：**不要盲目信任单一传感器物理层输入**。

---
## 总结

1. **Shadow Hack**：被动攻击，LiDAR检测假阳性率高达84%+

2. **传感器攻击**：超声波/雷达/摄像头jamming/spoofing，Tesla实车功能失效

3. **DolphinAttack**：MEMS麦克风硬件非线性漏洞

AI系统安全必须将传感器物理层输入可信度纳入整体架构。

---
## 参考文献

1. Ryunosuke Kobayashi, et al. "Invisible but Detected..." USENIX Security 2025.

2. Chen Yan, Wenyuan Xu, Jianhao Liu. "Can You Trust Autonomous Vehicles..." DEF CON 24, 2016.

3. Guoming Zhang, Chen Yan, Xiaoyu Ji, et al. "DolphinAttack..." ACM CCS 2017. DOI: 10.1145/3133956.3134052.
