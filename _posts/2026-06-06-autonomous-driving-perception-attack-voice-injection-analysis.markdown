---
layout: post
title: "自动驾驶感知攻击与语音注入攻击——对两篇顶会论文的分析梳理"
date: 2026-06-06 10:00:00 +0800
author: 王一
reviewer: 李轶珂
approver: 牛温佳
tags: [自动驾驶安全, LiDAR攻击, 语音注入攻击, 智能驾驶安全]
featured_image: /images/blog/2026-06-06-autonomous-driving-featured.png
reading_time: 15
papers:
  - title: "Adversarial Sensor Attack on LiDAR-based Perception in Autonomous Driving"
    venue: "ACM CCS 2019"
    doi: "10.1145/3319535.3339815"
    authors: "Yulong Cao, et al."
  - title: "Light Commands: Laser-Based Audio Injection Attacks on Voice-Controllable Systems"
    venue: "29th USENIX Security Symposium, 2020"
    doi: "10.5555/3489212.3489267"
    authors: "Takeshi Sugawara, et al."
excerpt: "本文对两篇安全顶会论文进行联合分析：CCS 2019 的 Adv-LiDAR（激光雷达感知欺骗攻击）与 USENIX Security 2020 的 Light Commands（激光语音注入攻击）。两篇论文均利用光学物理效应对 AI 感知系统发起攻击，分别针对自动驾驶环境感知和语音助手的认证链路，揭示从物理层到应用层的完整攻击面。"
---

## 引言

人工智能系统的安全问题是当前学术界与工业界共同关注的热点。在众多安全威胁中，利用**光学物理效应**对 AI 感知系统进行攻击的研究尤为引人注目——攻击者不需要接触目标设备，也不需要破解网络协议，仅通过操控光信号就能欺骗 AI 系统做出错误的判断。

本文对两篇安全领域顶级会议论文进行联合分析与梳理：

1. **Adversarial Sensor Attack on LiDAR-based Perception**（ACM CCS 2019）——利用激光欺骗 LiDAR 感知系统，在自动驾驶车辆前方制造"假障碍物"
2. **Light Commands: Laser-Based Audio Injection Attacks on Voice-Controllable Systems**（USENIX Security 2020）——利用调制激光向语音助手注入恶意语音命令

两篇论文虽针对不同的 AI 应用场景，却在攻击范式上高度相似：**利用传感器物理特性的局限性，绕过 AI 系统的安全防护，实现远距离、无接触的注入攻击**。

![Adv-LiDAR 方法论总览](/images/blog/2026-06-06-autonomous-driving-p1-overview.png)
*图 1: Adv-LiDAR 方法论总览——从物理层 LiDAR spoofing 到感知模型对抗攻击的完整框架（Cao et al., CCS 2019 Fig. 2）*

---

## Paper 1: Adversarial Sensor Attack on LiDAR-based Perception in Autonomous Driving

- **作者：** Yulong Cao 等
- **来源：** ACM CCS 2019
- **DOI：** 10.1145/3319535.3339815

### 背景：LiDAR 感知管线

自动驾驶系统中的 LiDAR（激光雷达）通过发射激光脉冲并测量反射时间来感知周围环境。在百度 Apollo 等主流自动驾驶平台中，LiDAR 点云的处理流程通常包括以下步骤：

1. **数据采集**：原始 3D 点云 X
2. **预处理**：坐标变换、ROI 提取、将 3D 点云压缩为 2D 特征矩阵
3. **DNN 推理**：输出 objectness（物体置信度）、positiveness（正面置信度）以及位置、方向、尺寸等参数
4. **后处理**：阈值过滤、连通图聚类、候选障碍物筛选

这一管线意味着攻击者不能仅通过添加噪声点来欺骗系统，而需要让伪造点云通过整个 pipeline。

![Apollo LiDAR 感知管线](/images/blog/2026-06-06-autonomous-driving-p1-pipeline.png)
*图 2: Apollo 的 LiDAR 感知管线——从原始点云到障碍物检测的完整流程（Cao et al., CCS 2019 Fig. 1）*

### 威胁模型：物理层 LiDAR Spoofing

攻击者通过监听目标 LiDAR 的激光脉冲，在特定延迟后发射攻击激光，让 LiDAR 误以为存在真实的反射信号。延迟控制测距（纳秒级延迟对应厘米级距离变化），结合扫描序列可影响伪造点的空间位置分布。

实验表明，攻击设备的可靠可控点数约为 **60 个点**，远少于真实车辆反射的密集点云。

![物理层 LiDAR spoofing 攻击设置](/images/blog/2026-06-06-autonomous-driving-p1-capability.png)
*图 3: 攻击能力建模——距离、海拔高度、方位角三种可控扰动参数化（Cao et al., CCS 2019 Fig. 7）*

### Adv-LiDAR 算法

论文的核心贡献在于将物理世界可实现的 LiDAR spoofing 转化为一个可优化的对抗攻击问题：

1. **能力建模**：将攻击能力 A 分解为点数和空间可控性两部分。距离变化来自延时控制，高度变化来自切换垂直线，方位变化来自扫描时序和攻击位置。
2. **优化目标**：对抗损失函数设计为：
   ```
   L_adv = Σ(1 - objectness · positiveness) · GaussianMask(px, py)
   ```
   目标不是让模型任意出错，而是在攻击者指定的前方位置生成候选障碍物。Gaussian mask 将优化集中在目标位置附近。
3. **粗搜+细调策略**：观察到 loss surface 存在局部噪声、全局平坦的特性后，先对旋转 θ 和平移 τx 进行全局采样，再用 Adam 优化器进行局部微调。

![Adv-LiDAR 核心算法流程](/images/blog/2026-06-06-autonomous-driving-p1-algorithm.png)
*图 4: Adv-LiDAR 算法流程——从原始点云到 spoofed point cloud 的粗搜+细调优化（Cao et al., CCS 2019 Fig. 8）*

### 实验结果

- 使用 Baidu Apollo 公开真实 LiDAR trace，均匀采样 300 帧，攻击目标是前方 **2-8 m** 障碍物
- 粗搜+细调策略（S-opt）将平均成功率从 **18.9% 提升到 43.3%**，平均提升 2.65 倍
- 60 点能力时成功率约 **75%**
- 对后续约 **1.5 秒**的连续帧仍有鲁棒性，说明攻击不要求车辆位置完全固定

在驾驶影响方面，Apollo Sim-control 仿真显示：假障碍物会导致规划层执行急刹决策（43 km/h → 0 km/h，约 1 秒）。如果车辆在红灯前静止，攻击者持续伪造近障碍物，绿灯后也可能阻止车辆启动。

### 小结

Adv-LiDAR 的核心贡献在于**把物理可实现的 LiDAR spoofing 与机器学习感知 pipeline 的目标优化连接起来**。系统设计上，3D 点云压成 2D 特征会损失高度信息，地面反射点可能被错误聚进假障碍物。局限在于作者并未在真实道路上攻击完整的自动驾驶系统，动态瞄准仍是未来工作。

---

## Paper 2: Light Commands: Laser-Based Audio Injection Attacks on Voice-Controllable Systems

- **作者：** Takeshi Sugawara 等
- **来源：** 29th USENIX Security Symposium, 2020

### 攻击原理：把声音改写成光

攻击链路分为两层：

**物理层**：攻击者准备普通语音命令录音（如 wake word + 具体命令），通过激光驱动器将音频波形调制到激光二极管的驱动电流上。光强随音频波形变化，形成**幅度调制（AM）光信号**。当调制光照射到麦克风的进音孔（microphone aperture）时，麦克风输出端会出现对应的音频电信号。

**系统层**：语音助手在处理音频输入时缺少足够的认证机制，将注入的电信号视为真实的语音命令并执行。

![激光语音注入攻击原理](/images/blog/2026-06-06-autonomous-driving-p2-principle.jpg)
*图 5: Light Commands 攻击原理——将语音命令调制成激光信号，通过光电/光声效应注入麦克风（Sugawara et al., USENIX Security 2020）*

### 为什么麦克风会"听见"光？

论文区分了两种物理效应：

- **Photoelectric effect（光电效应）**：激光直接照射麦克风 ASIC 芯片，产生电信号
- **Photoacoustic effect（光声效应）**：激光照射麦克风振膜，引起热胀冷缩产生声波

直接照射 ASIC 时，**小于 0.1 mW** 的功率就能让 ADMP401 麦克风饱和。即使遮住 ASIC 后照射振膜仍有信号，说明实际攻击可能是两种效应共同作用。

### 关键参数与实验

论文通过 1 kHz 正弦波验证了 AM 调制的可行性：激光电流正弦变化时，麦克风输出出现匹配的 1 kHz 信号。频率响应覆盖可听频段，意味着攻击者可以注入**完整的语音命令**，而非仅单音调。

**设备测试**：覆盖 17 个主流语音控制设备（Alexa、Siri、Google Assistant 等），命令集包含查时间、音量归零、购物、IoT 控制等。

![攻击实验设置](/images/blog/2026-06-06-autonomous-driving-p2-experiment.jpg)
*图 6: 各设备攻击实验汇总——Google Home 和 Echo Plus 在 5 mW 低功率下可达 110+ 米（Sugawara et al., USENIX Security 2020）*

**关键结果**：
- Google Home 和 Echo Plus 在 **5 mW** 低功率下即可达到 **110+ 米**的攻击距离
- 多数设备在 **60 mW** 功率下可达到数米到 50+ 米
- 跨楼实验使用 5 mW 激光，攻击距离约 75 米，且能穿过闭合的双层玻璃窗

### 安全影响与攻击面

为什么这种攻击能造成真实后果？论文揭示了语音助手"认证链路"的脆弱性：

- **智能门锁/车库门**：PIN 可被窃听、暴力枚举，或某些命令根本无 PIN 认证
- **Tesla 第三方集成**：可查位置、锁/解锁、充电、空调控制
- **FordPass 集成**：关键命令虽有 PIN 保护，但论文发现缺少有效的防暴力枚举机制
- **手机/平板**：只需匹配 owner 的 wake word，后续命令可拼接其他声音
- **智能音箱的 speaker recognition**：很多时候是个性化功能，而非严格的用户认证

攻击者还可以进一步提高隐蔽性：先将设备音量调到零、使用红外激光隐藏可见光斑、用大光斑降低精确瞄准需求。

### 小结

Light Commands 的核心贡献在于**将光学物理效应与语音助手安全模型连接起来**。防御不能仅靠语音识别算法，还需要考虑麦克风硬件层面是否允许光直射。论文建议从三个层面防御：软件层（随机 challenge、多麦克风一致性检测）、硬件层（不透光 barrier/cover）、认证层（真正的 liveness 与 continuous authentication）。

---

## 两篇论文的对比与启示

| 维度 | Adv-LiDAR (CCS 2019) | Light Commands (USENIX Security 2020) |
|------|----------------------|--------------------------------------|
| **攻击媒介** | 激光脉冲注入（LiDAR 波段） | 幅度调制激光（可见光/红外） |
| **目标传感器** | LiDAR（激光雷达） | MEMS 麦克风 |
| **攻击目标系统** | 自动驾驶感知（Apollo） | 语音助手（Alexa/Siri/Google） |
| **物理原理** | 激光延时欺骗 ToF 测距 | 光电/光声效应产生电信号 |
| **攻击距离** | 近距离（厘米-米级） | 远距离（可达 110 米+） |
| **核心洞察** | 物理 spoofing + ML 优化 | 物理转导 + 弱认证 |
| **防御方向** | 多传感器融合、滤波、对抗训练 | 硬件屏障、多麦克风一致性、强认证 |

两篇论文共同揭示了 AI 安全研究中的一个重要趋势：**攻击者正在从"数字世界"向"物理世界"扩展攻击面**。传统上，我们认为 AI 系统的安全威胁主要来自数据投毒、对抗样本等数字攻击。而这两篇论文证明：攻击者可以通过操纵物理世界的传感器输入——哪怕只是几束光——就能让最先进的 AI 系统做出错误决策。

从防御角度看，两篇论文给出的建议也高度一致：

1. **硬件层面加固**：增加物理防护（如对麦克风进音孔加装屏障、对 LiDAR 接收端进行滤波）
2. **多模态融合**：不依赖单一传感器，通过交叉验证提高鲁棒性
3. **系统层认证**：对关键操作增加额外认证环节（如 PIN、生物特征）

---

## 总结

本文对 Adv-LiDAR（CCS 2019）和 Light Commands（USENIX Security 2020）两篇安全顶会论文进行了详细分析。尽管两篇论文针对不同的 AI 应用场景——一个是自动驾驶感知，一个是语音助手控制——但它们在攻击范式和防御启示上展现出惊人的一致性。

这些研究表明，AI 系统安全不能仅停留在算法层面。传感器的物理特性、系统的认证链路、多模态的冗余设计，都是构建安全可靠 AI 系统不可或缺的组成部分。

---

## 参考文献

1. Cao, Y., et al. "Adversarial Sensor Attack on LiDAR-based Perception in Autonomous Driving." ACM CCS 2019.
2. Sugawara, T., et al. "Light Commands: Laser-Based Audio Injection Attacks on Voice-Controllable Systems." USENIX Security Symposium 2020.
