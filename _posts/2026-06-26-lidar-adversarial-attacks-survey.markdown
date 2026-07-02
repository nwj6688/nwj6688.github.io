---
layout: post
title: "组会汇报：LiDAR 3D 感知对抗攻击最新进展 — AAAI 2025 / CVPR 2026 / NDSS 2025"
date: 2026-06-26 14:00:00 +0800
author: 赵鑫怡
reviewer: 李轶珂
tags: [LiDAR安全, 自动驾驶安全, 对抗攻击, BEV检测, 3D目标检测]
reading_time: 18
papers:
  - title: "A New Adversarial Perspective for LiDAR-Based 3D Object Detection"
    venue: "AAAI 2025"
    authors: "Shijun Zheng, Weiquan Liu, Yu Guo, Yu Zang, Siqi Shen, Cheng Wang"
  - title: "SABER: Spatially Consistent 3D Universal Adversarial Objects for BEV Detectors"
    venue: "CVPR 2026"
    authors: ""
  - title: "On the Realism of LiDAR Spoofing Attacks against Autonomous Driving Vehicle at High Speed and Long Distance"
    venue: "NDSS 2025"
    authors: ""
excerpt: "本次组会汇报了三篇LiDAR感知安全领域的顶会论文，涵盖随机物体攻击(水雾/烟雾)、BEV通用对抗物体以及高速远距离LiDAR欺骗攻击。"
---

## 引言

LiDAR（激光雷达）是自动驾驶系统中最重要的感知传感器之一，其提供的精确三维空间信息对车辆检测、行人识别和障碍物规避起着关键作用。然而，随着深度学习在LiDAR感知中的广泛采用，针对LiDAR 3D检测器的对抗攻击研究也日益受到关注。

本次组会汇报了三篇发表于顶会的最新论文，分别从三个不同维度揭示了LiDAR感知系统面临的物理对抗威胁：

1. **AAAI 2025** — 利用水雾/烟雾等随机物体作为攻击载体，使车辆从检测结果中消失
2. **CVPR 2026** — 通过3D通用对抗物体在BEV空间中实现空间一致的攻击效果
3. **NDSS 2025** — 在高速（60km/h）远距离（110m）场景下实现物理LiDAR欺骗攻击

这三项工作共同勾勒了LiDAR对抗攻击从数字域走向真实物理世界的演进路径。

---

## Paper 1: A New Adversarial Perspective for LiDAR-Based 3D Object Detection

*会议：AAAI 2025 | 作者：Shijun Zheng, Weiquan Liu, Yu Guo, Yu Zang, Siqi Shen, Cheng Wang*

![AAAI 2025 论文动机示意图](/images/blog/2026-06-26-lidar-adversarial-fig1.png)
*图 1: 随机物体（水雾/烟雾）作为LiDAR 3D检测对抗攻击载体的动机示意图*

![AAAI 2025 攻击框架](/images/blog/2026-06-26-lidar-adversarial-fig2.png)
*图 2: 攻击总体流程——随机物体生成、扫描模拟与攻击参数搜索*

### 动机：从环境干扰到攻击载体

传统LiDAR 3D对抗攻击主要依赖三类方式：**数字域点云扰动**（直接修改点云坐标）、**传感器级激光欺骗**（注入虚假激光信号）和**固定形状对抗物体**（3D打印特定形状的物体）。然而，这些方法在真实部署中存在局限——数字域扰动无法在物理世界实现，激光注入需要专门的硬件设备。

本文提出一种新颖的视角：**水雾和烟雾**作为道路环境中自然存在的随机物体，能够被利用作为非侵入式的攻击载体。水雾和烟雾具有以下特点：
- 自然来源，不易引起怀疑
- 形态随机、可变形、具有时间变化性
- 在真实道路中能够产生大量物理合理的点云

### 攻击方法

攻击流程分为三个主要阶段：

1. **随机物体生成**：提出**PCS-GAN**（Point Cloud Sequence GAN），将随机物体点云分解为内容特征和运动特征，生成同时保留空间分布与时序变化的点云序列
2. **扫描模拟**：通过**Range Image Renderer**将随机物体与目标车辆点云融合，近似LiDAR扫描过程
3. **攻击参数搜索**：在不同融合模式和密度参数下搜索最优攻击配置

### 实验结果

实验在KITTI和Waymo数据集上进行，攻击对象包括PointPillars、SECOND和VoxelNet等主流检测器。结果显示：
- 在多种融合模式下，随机物体扰动能够**稳定地使目标车辆从检测结果中消失**
- 攻击具有**跨模型迁移性**——对一个检测器生成的攻击可以有效作用于其他检测器
- 攻击成功的关键在于破坏了车辆表面点云的**结构完整性**和**扫描线规律性**

---

## Paper 2: SABER — Spatially Consistent 3D Universal Adversarial Objects for BEV Detectors

*会议：CVPR 2026*

![SABER 方法框架](/images/blog/2026-06-26-lidar-adversarial-fig3.png)
*图 3: SABER的3D通用对抗物体生成与BEV攻击框架*

### 动机：从侵入式补丁到环境物体

与Paper 1不同，**SABER**关注的是**BEV（Bird's Eye View，鸟瞰视图）检测器**的对抗攻击。现有的BEV对抗攻击通常依赖于贴附在车辆表面的对抗补丁（Adversarial Patch），但这些方法存在明显局限：
- 需要接近目标车辆进行物理接触
- 补丁位置和角度对攻击效果敏感
- 在多视角/多帧条件下效果不稳定

SABER提出一种**非接触式**的攻击范式：通过3D通用对抗物体（放置在道路上的静态物体）来干扰BEV检测器的整体感知。

### 方法框架

SABER的核心流程包括：
1. **3D mesh生成**：设计具有对抗性几何形状的3D物体mesh
2. **多视角渲染**：将3D物体插入到不同视角的相机图像和LiDAR点云中
3. **BEV表征优化**：通过反向传播优化3D物体的形状和纹理，使其在BEV特征图上产生最大的检测误差
4. **通用性设计**：优化过程中同时考虑多位置、多角度、多光照条件，实现通用攻击效果

### 实验发现

- 一个精心设计的3D对抗物体可以**同时造成多辆目标车辆的误检或漏检**
- 攻击效果在**跨场景、跨视角**条件下保持稳定
- 物理实验验证了从数字仿真到真实场景的迁移可行性

---

## Paper 3: LiDAR Spoofing Attacks at High Speed and Long Distance

*会议：NDSS 2025*

![MVS 多视角LiDAR欺骗攻击框架](/images/blog/2026-06-26-lidar-adversarial-fig4.png)
*图 4: MVS高速远距离LiDAR欺骗攻击系统架构*

### 动机：从"可攻击"到"现实可攻击"

前两篇论文关注的是LiDAR感知系统中的被动干扰（添加额外点云），而**MVS（Multi-View Spoofing）**则关注**主动欺骗**——通过向LiDAR传感器注入虚假信号来伪造或移除真实物体。

本文的独特贡献在于解决了一个实际但被忽视的问题：**高速运动（60km/h）和远距离（110m）**场景下LiDAR欺骗攻击的物理可行性。

### 方法论

MVS的系统架构包含三个关键组件：
1. **红外检测与跟踪**：在攻击前远距离定位目标车辆的LiDAR传感器位置和旋转角度
2. **自动瞄准与大覆盖欺骗器**：设计专用硬件，能够在高速跟随过程中保持对目标LiDAR的精确激光注入
3. **脉冲指纹分析与攻击**：针对新型固态LiDAR的脉冲水印机制，提出**A-HFR（Adaptive High Frequency Removal）**策略

### 高速远距离实验

实验在真实测试场进行，攻击车辆以60km/h速度接近目标车辆，攻击距离达110米：

| 场景 | 攻击成功率 |
|------|-----------|
| 静止目标（低速LiDAR） | >85% |
| 60km/h动态（机械式LiDAR） | >70% |
| 60km/h动态（固态LiDAR + 水印） | >55%（A-HFR恢复至>65%） |

### 脉冲水印对抗

论文一个重要贡献是揭示了面向新型固态LiDAR的脉冲指纹攻击：
- 固态LiDAR通过脉冲水印（独特的脉冲时序编码）来防止欺骗
- 论文提出**A-HFR**方法，通过自适应地移除高频脉冲成分来绕过水印检测
- A-HFR在攻击成功率和隐蔽性之间取得了更好的平衡

---

## 对比与讨论

| 维度 | AAAI 2025（随机物体） | CVPR 2026（SABER） | NDSS 2025（MVS） |
|------|----------------------|-------------------|-------------------|
| **攻击类型** | 被动干扰（添加点云） | 被动干扰（添加物体） | 主动欺骗（激光注入） |
| **攻击目标** | LiDAR 3D检测器 | BEV多模态检测器 | LiDAR传感器 |
| **物理可行性** | 高（水雾/烟雾） | 中（3D打印物体） | 高（硬件实现） |
| **攻击距离** | 近距（<30m） | 中距（<50m） | 远距（>100m） |
| **速度适应性** | 静态 | 静态 | 高速（60km/h） |
| **跨模型迁移** | 强 | 较强 | 与硬件相关 |
| **防御难度** | 中等 | 中等 | 较高 |

三篇论文沿着不同的技术路线推动了LiDAR对抗攻击从实验室走向真实物理场景：
- **AAAI 2025**利用自然存在的随机物体，攻击隐蔽性最强
- **CVPR 2026**首次实现了BEV空间中的通用对抗物体攻击
- **NDSS 2025**在攻击距离和速度维度上实现了质的突破

---

## 总结

本次组会汇报的三篇论文分别从**随机物理干扰**（AAAI 2025）、**通用对抗物体**（CVPR 2026）和**主动欺骗注入**（NDSS 2025）三个角度，系统探讨了自动驾驶LiDAR感知系统面临的物理对抗威胁。这些工作表明：

1. LiDAR感知系统的安全边界不仅存在于数字域，更需要在物理世界中被重新审视
2. 不同的攻击方法各有所长，需要针对性地设计防御策略
3. 随着固态LiDAR和脉冲水印等新技术的普及，攻击与防御的对抗将持续演进

对于未来的研究方向，可以考虑：
- **多传感器融合防御**：结合相机、毫米波雷达的信号进行交叉验证
- **LiDAR点云异常检测**：识别物理不合理的点云分布模式
- **对抗训练**：在训练阶段加入物理对抗样本增强模型鲁棒性

---

## 参考文献

1. Zheng, S., Liu, W., Guo, Y., Zang, Y., Shen, S., & Wang, C. "A New Adversarial Perspective for LiDAR-Based 3D Object Detection." *AAAI 2025*.
2. "SABER: Spatially Consistent 3D Universal Adversarial Objects for BEV Detectors." *CVPR 2026*.
3. "On the Realism of LiDAR Spoofing Attacks against Autonomous Driving Vehicle at High Speed and Long Distance." *NDSS 2025*.
