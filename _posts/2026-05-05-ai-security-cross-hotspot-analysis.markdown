---
layout: post
title: "AI × 安全 交叉热点快报 —— 双心跳版（锚点：NDSS'26 & S&P'26 & AAAI'26 & ICLR'26）"
date: 2026-05-05 10:00:00 +0800
author: 牛温佳
reviewer: 牛温佳
tags: [AI安全, 交叉热点, 顶会分析, LLM安全, 对抗攻击, 对齐]
excerpt: "综合安全顶会（NDSS'26、S&P'26）与AI顶会（AAAI'26、ICLR'26）数据，提炼AI×安全五大交叉热点方向、十大双向渗透方法栈，预测未来12-18个月的交叉前沿趋势与投稿策略。"
---

**分析日期：** 2026年5月5日  
**安全侧锚点：** NDSS 2026（2月，265篇）、IEEE S&P 2026（5月18-20日，即将召开）  
**AI侧锚点：** AAAI 2026（2月，4,167篇）、ICLR 2026（4-5月，~5,300篇）、CVPR 2026（6月，4,090篇已录用）  
**arXiv窗口：** 2026年2月5日 – 2026年5月5日  
**近期靶点：** USENIX Security 2026（8月）、CCS 2026 Cycle B（4月截稿，已审稿中）、NeurIPS 2026（5月6日截稿）

---

## 一、当前交叉热点全景（固化于最新顶会）

### 1.1 交叉总体热度

| 维度 | 交叉论文数量估算 | 占会议比例 | 一句话小结 |
|------|-----------------|------------|------------|
| **安全侧（NDSS'26 + S&P'26）** | ~50篇涉及AI/ML方法 | NDSS'26约18%（AI Security session + LAST-X workshop）；S&P'26约25%（7篇AI攻击面分析） | AI已从安全研究的"工具"升级为"攻击面+防御手段"双核心 |
| **AI侧（AAAI'26 + ICLR'26）** | ~120篇涉及安全/隐私/对抗属性 | AAAI'26 AI Alignment Track约5-7%；ICLR'26隐私/公平/安全session约3-4% | 安全属性正从"附加约束"演变为AI研究的"一级公民属性"，AAAI'26首次设立AI Alignment Track是历史性信号 |
| **强化信号（CVPR'26）** | ~80篇涉及对抗鲁棒/安全/隐私 | 约2%但增速极快（4,090篇录用中大量VLM安全相关） | 视觉AI安全（对抗样本、deepfake检测、VLM安全）正形成独立研究社群 |

**总体判断：** AI × 安全交叉从"偶发合作"演进为"双向规模化渗透"——安全社区主动拥抱AI（LLM驱动 fuzzing、二进制分析、AI红队），AI社区开始严肃对待安全属性（对齐、安全、鲁棒性）。两栖论文数量年增速估计超过40%。

### 1.2 五大交叉热点方向

#### 方向1：**LLM安全攻击面：从模型安全到应用系统安全**

| 来源侧 | 具体体现 | 代表论文 |
|--------|----------|----------|
| **安全顶会** | NDSS'26: ToolHijacker攻击LLM Agent工具选择链；S&P'26: 7篇AI攻击系统性分析（检索、RAG、Web Agent、GPU、编译器的攻击链） | **ToolHijacker**（NDSS'26）：恶意工具文档注入→操控Agent工具选择；**When AI Meets the Web**（S&P'26）：第三方AI Chatbot插件的间接提示词注入；**GHost in the SHELL**（S&P'26）：GPU内存跨域攻击 |
| **AI顶会** | AAAI'26: STACK对LLM Safeguard Pipeline的系统性对抗攻击 | **STACK: Adversarial Attacks on LLM Safeguard Pipelines**（AAAI'26）：突破Anthropic等前沿AI Safeguard多层防护的对抗攻击框架 |

#### 方向2：**AI驱动的自动化漏洞挖掘与二进制分析**

| 来源侧 | 具体体现 | 代表论文 |
|--------|----------|----------|
| **安全顶会** | NDSS'26: LLM+Fuzzing的规模化应用；BAR Workshop（NDSS'26 co-located）15+篇二进制造福研究 | **FirmAgent**（NDSS'26）：LLM Agent + Fuzzing发现182个IoT固件漏洞（17个CVE）；**LogicFuzz**（NDSS'26）：首个PLC固件逻辑指令LLM驱动fuzzing；**vSim**（NDSS'26）：语义感知值提取用于二进制代码相似性分析 |
| **AI顶会** | ICLR'26: 形式化验证+AI的融合进展 | 间接信号：ICLR'26 "Principled Design for Trustworthy AI" workshop推动AI工具的安全验证 |

#### 方向3：**LLM对齐与安全性攻防（后门/投毒/越狱）**

| 来源侧 | 具体体现 | 代表论文 |
|--------|----------|----------|
| **安全顶会** | NDSS'26: LLM水印攻击、LLM安全研究方法论陷阱（Chasing Shadows）；S&P'26: 越狱攻击防御 | **Character-Level Perturbations Disrupt LLM Watermarks**（NDSS'26）：单字符扰动破坏LLM水印，揭示内容溯源的脆弱性；**Chasing Shadows**（NDSS'26）：系统分析LLM安全研究的常见陷阱 |
| **AI顶会** | AAAI'26: AI Alignment Track核心——推理级RL对齐；ICLR'26: 对齐理论统一框架 | **MoralReason**（AAAI'26 AI Alignment Track）：推理级强化学习做LLM Agent道德对齐；**Beyond RLHF**（ICLR'26相关）：50+对齐方法统一决策框架 |

#### 方向4：**联邦学习与分布式AI的隐私攻防**

| 来源侧 | 具体体现 | 代表论文 |
|--------|----------|----------|
| **安全顶会** | NDSS'26: 联邦学习成员推断统一防御框架 | **A Unified Defense Framework Against Membership Inference in Federated Learning**（NDSS'26）：首次系统统一联邦学习中的成员推断攻防 |
| **AI顶会** | AAAI'26: 联邦学习对抗鲁棒性研究 | **Delving into the Adversarial Robustness of Federated Learning**（AAAI'23引用链延伸至AAAI'26讨论）；CVPR'26: FedAFD多模态联邦学习对抗攻防 |

#### 方向5：**AI生成内容（AIGC）安全：水印、deepfake、溯源**

| 来源侧 | 具体体现 | 代表论文 |
|--------|----------|----------|
| **安全顶会** | NDSS'26: LLM水印脆弱性；S&P'26: AI生成内容的政策/社会影响研究 | **Character-Level Perturbations**（NDSS'26）；**International Students and Scams**（S&P'26）：AI生成社会工程诈骗研究 |
| **AI顶会** | CVPR'26: 大量deepfake检测、VLM生成内容安全相关 | **Shedding Light on VLN Robustness**（CVPR'26）：室内光照对抗攻击——VLM在视觉-语言-导航场景的鲁棒性问题；大量视觉生成模型安全论文 |

### 1.3 双向渗透的方法栈

| 技术/工具 | 从哪侧来 | 正在解决哪侧的问题 | 代表性工作 |
|-----------|----------|---------------------|------------|
| **LLM（大语言模型）** | AI侧 → 安全侧 | 漏洞挖掘、固件分析、恶意软件检测、威胁情报生成 | FirmAgent（NDSS'26）、LogicFuzz（NDSS'26）、Last-X Workshop系列（NDSS'26） |
| **Test-time Compute / 推理优化** | AI侧 → 安全侧 | LLM Agent安全决策的可信化、推理时安全验证 | "Attention is All You Need"（NDSS'26）：Attention机制用于间接提示词注入防御 |
| **eBPF + ML** | 安全侧 → AI侧 | 内核运行时监控→AI安全决策的可解释性保障 | NDSS'26 USEC Workshop大量使用eBPF+ML做安全检测 |
| **Diffusion Models** | AI侧 → 安全侧 | Deepfake检测、内容溯源、生成式安全报告 | 2026年开始在安全顶会批量出现，多为安全目标（检测而非生成） |
| **形式化验证（Symbolic Execution / BINSEC）** | 安全侧 → AI侧 | LLM代码的数学证明级安全验证、鲁棒性保证 | BINSEC（POPL'26 Tutorial）：二进制级符号执行适配AI代码审计 |
| **RLHF / DPO 对齐技术** | AI侧 → 安全侧 | 对齐攻击（alignment manipulation）、后门注入的偏好数据污染 | AAAI'26: 推理级RL对齐；arXiv: 投毒攻击对准从数据集的影响 |
| **RAG（检索增强生成）** | AI侧 → 安全侧 | 检索污染攻击、RAG系统的数据投毒 | "Phantom: General Backdoor Attacks on RAG"（已发表于2026年）；S&P'26: RAG安全性分析 |
| **强化学习（RL）** | AI侧 → 安全侧 | 自动攻防博弈、策略优化、多智能体安全编排 | RLShield（arXiv:2603系列）：多智能体RL金融网络安全编排 |
| **因果世界模型（Causal WM）** | AI侧 → 安全侧 | AI决策的可解释性安全、分布外攻击检测 | AAAI'26: 因果基础世界模型（跨域安全决策可解释性） |
| **多智能体编排（Agent Orchestration）** | AI侧 → 安全侧 | 多智能体系统安全性、跨Agent攻击传播 | VMAO（arXiv:2603.11445）：验证驱动多智能体编排安全 |

---

## 二、正在冲刺的交叉浪潮（近3月arXiv掘金）

### 重点交叉预印本

| 题目 | 推定大佬/团队 | 预设投稿战场 | 核心交叉贡献 | 交叉赛道 |
|------|---------------|--------------|-------------|----------|
| **Backdoor Attacks on Decentralised Post-Training** (arXiv:2604.02372, 2026-03-31) | Ersoy等（安全+AI双背景） | CCS'26 / USENIX Sec'26 | 去中心化微调（LoRA等）中的后门/投毒攻击，首次覆盖分布式AI训练管道 | Sec_for_AI (poisoning) |
| **The Attack and Defense Landscape of Agentic AI** (arXiv:2603.11088, 2026-03-11) | 多人署名（AI安全专项团队） | NeurIPS'26 / CCS'26 | Agentic AI（自主AI Agent）的攻击与防御全景图，首次系统化分类 | Sec_for_AI (agent安全) |
| **Agent Security Bench (ASB): Formalizing and Benchmarking Attacks and Defenses on LLM-based Agents** (OpenReview, 2026) | 待确认 | ICLR'26 / NeurIPS'26 | LLM Agent安全评测基准，定义Agent安全评测标准 | Sec_for_AI (agent安全) |
| **RLShield: Practical Multi-Agent RL for Financial Cyber Defense** (arXiv:2603系列, 2026-03) | 待确认 | CCS'26 / USENIX Sec'26 | 多智能体强化学习→金融网络安全编排，RL+安全编排新范式 | AI_for_Sec (RL安全应用) |
| **Towards Privacy-Preserving LLM Inference via Covariant Constraint** (arXiv:2603.01499, 2026-03-02) | 待确认 | S&P'27 / USENIX Sec'27 | 隐私保护LLM推理，首次用协变约束保护推理隐私 | Security_for_AI (privacy) |
| **Secret Stealing Attacks on Local LLM Fine-Tuning through Supply-Chain Model Code Backdoors** (arXiv cs.AI/cs.CR) | 待确认 | CCS'26 / NDSS'27 | 本地微调供应链后门：模型代码中的后门窃取秘密 | Sec_for_AI (backdoor, supply chain) |
| **Thinking Wrong in Silence: Backdoor Attacks on Continuous Latent Representations** (arXiv:2604.00770, 2026-04-01) | 待确认 | ICLR'27 / NeurIPS'26 | 连续潜表示上的后门攻击——突破传统token-level后门的粒度限制 | Sec_for_AI (backdoor) |
| **STACK: Adversarial Attacks on LLM Safeguard Pipelines** (AAAI Publications, 2026-04-03) | AAAI'26已发表 | AAAI'26 | 多层LLM Safeguard Pipeline的对抗攻击系统性突破 | Sec_for_AI (adversarial attack) |
| **Phantom: General Backdoor Attacks on Retrieval Augmented Generation** (ACM TIFS/CS, 2026-03-25) | 已发表于顶会 | TIFS'26 / S&P'27 | RAG系统的通用后门攻击框架，检索层面植入后门 | Sec_for_AI (RAG安全) |
| **Latent Adversarial Detection: Adaptive Probing of LLM Activations for Multi-Turn Attack Detection** (arXiv cs.AI, 2026) | 待确认 | EMNLP'26 / ACL'26 | 激活空间自适应探测多轮攻击——AI安全新检测范式 | Security_for_AI (LLM activation检测) |

### 交叉投稿拥挤度地图

| 主题簇 | arXiv密度（近1个月） | 主要论文 | 赛道饱和度 |
|--------|---------------------|----------|------------|
| **LLM Agent安全评测基准（ASB类）** | ★★★★★ 极高 | Agent Security Bench + Attack Landscape of Agentic AI + 多篇Agent安全 | 🔥🔥🔥 高竞争：CCS'26、NeurIPS'26均可能出现多篇重叠 |
| **去中心化微调/LoRA后门攻击** | ★★★★☆ 高 | Backdoor Attacks on Decentralised Post-Training + Continuous Latent Backdoor + Supply-Chain Backdoor | 🔥🔥 中高：后门攻击从集中训练扩展到分布式微调是明确趋势 |
| **RLHF/DPO投毒攻击** | ★★★☆☆ 中 | 多个团队持续产出，arXiv:2510.09260等持续更新 | 🔥🔥 中：RLHF安全问题在AI社区持续关注，但顶会容量有限 |
| **AIGC水印与溯源** | ★★★☆☆ 中 | Character-Level Perturbations + 新增preprint | 🔥 中：水印攻击已确立，防御方案是蓝海 |
| **Agentic AI攻击与防御全景** | ★★★★☆ 高 | Attack Landscape + ASB Benchmark + 多篇评测工作 | 🔥🔥🔥 高竞争：NeurIPS'26截稿在即，极可能扎堆 |

---

## 三、未来12–18个月的交叉前沿——远期预测

### 3.1 从Future Work中浮现的3个新交叉子领域

#### 子领域A：**LLM Agent供应链安全（Supply Chain Security for LLM Agents）**

> **来源1：** ToolHijacker（NDSS'26）的Future Work明确指出："We plan to explore the security implications of third-party tool repositories and marketplaces for LLM agents."
>
> **来源2：** "Secret Stealing Attacks on Local LLM Fine-Tuning"（arXiv cs.CR/cs.AI）在摘要中指出供应链后门的威胁："model code backdoors during local fine-tuning lead to secret exfiltration."
>
> **来源3：** VMAO（arXiv:2603.11445）在Future Work中承诺："We will investigate the security of multi-agent coordination protocols where agents from different providers interact."

**判断：** 当LLM Agent成为生产系统，工具库/插件市场、本地微调供应链、多方Agent协作的交叉安全将成为独立子领域。类似于软件供应链安全（SBOM、CVE）但增加了AI特有的不确定性。

#### 子领域B：**形式化验证保证的LLM安全属性**

> **来源1：** "Chasing Shadows: Pitfalls in LLM Security Research"（NDSS'26）在Future Work中指出："We plan to develop standardized evaluation frameworks with formal guarantees for LLM security properties."
>
> **来源2：** AAAI'26 AI Alignment Track的多篇论文在Future Work中提到将形式化验证方法引入推理级对齐。
>
> **来源3：** "Attention is All You Need to Defend Against Indirect Prompt Injection"（NDSS'26）提出注意力机制防御，其Future Work承诺探索"formal verification of prompt injection defenses."

**判断：** 当前LLM安全研究以经验性测试为主，形式化保证极度匮乏。形式化验证+LLM安全将成为2027年顶会的新交叉赛道，类似于软件安全中形式化验证与程序分析的传统结合。

#### 子领域C：**AI生成内容（AIGC）的多模态对抗攻防**

> **来源1：** CVPR'26 "Shedding Light on VLN Robustness"展示了VLM在视觉-语言-导航场景的对抗脆弱性，其Future Work承诺探索"cross-modal adversarial robustness for real-world deployment."
>
> **来源2：** Character-Level Perturbations（NDSS'26）的工作已证明水印脆弱性，Future Work明确指向"developing character-level robust watermarks."
>
> **来源3：** "Latent Visual Reasoning"（ICLR'26）的Future Work指出："Extending latent reasoning to other modalities, particularly to audio-visual and sensorimotor domains, is a promising direction."——隐式推理跨模态扩展将带来新的对抗面。

**判断：** 2026年AIGC安全主要是"文本LLM水印+越狱"，2027年将扩展到"视觉-语言-音频-动作"全模态对抗攻防。多模态生成内容的溯源、检测、对抗将形成独立研究社群。

### 3.2 必须紧盯的两栖大佬团队

| 团队 | 安全侧产出 | AI侧产出 | 正在铺设的交叉管线 |
|------|-----------|----------|-------------------|
| **UC Berkeley / Dawn Song团队** | USENIX/NDSS/CCS系列：二进制安全、AI安全、隐私 | NeurIPS/ICML：对抗鲁棒性、隐私计算 | LLM安全测试+形式化验证+差分隐私LLM训练 |
| **Carnegie Mellon / CyLab** | NDSS/S&P/USENIX：固件安全、LLM安全、AI安全研究方法论 | AAAI/ICLR：对抗鲁棒性、Trustworthy AI | AI驱动系统安全——从应用（LLM Agent）到基础设施（二进制分析） |
| **Georgia Tech / Wenke Lee团队** | NDSS/CCS/USENIX：恶意软件、FL安全、入侵检测 | AI顶会：对抗攻防、公平性 | AI安全评测基准 + 隐私保护机器学习 |
| **Stanford / Percy Liang团队** | S&P/CCS：AI安全评测、对抗鲁棒性 | NeurIPS/ICML：可信赖AI、对齐、安全基准 | LLM安全基准（RS@、HarmBench延伸）+ 对齐攻击与防御 |
| **ETH Zurich / Srdjan Capkun团队** | NDSS/S&P/USENIX：系统安全、隐私、侧信道 | AAAI/ICML：隐私保护ML、安全机器学习 | 联邦学习隐私 + 嵌入式AI安全 |

### 3.3 可能引发范式迁移的技术萌芽

| 技术萌芽 | 当前瓶颈 | 距离突破还需要什么 | 预测时间 |
|----------|----------|---------------------|----------|
| **Agent安全评测基准（ASB类）** | 缺乏标准化、无跨任务泛化 | 跨场景攻击分类学 + 跨平台可复现benchmark + 防御方参与 | **2026-2027年**：CCS'26/USENIX Sec'26将是首批成熟节点 |
| **RLHF/DPO对齐投毒的系统性防御** | 当前防御只针对特定攻击，缺少统一框架 | 偏好数据的可验证来源 + 形式化投毒检测 + 鲁棒的RLHF变体 | **2027年**：随着对齐模型普及成为刚需 |
| **隐私保护LLM推理（全同态加密/安全多方计算）** | 计算开销过高，实用化困难 | 硬件加速（TEE）、模型蒸馏+加密计算协同设计 | **2027-2028年**：算力成本下降时将爆发 |
| **多模态AIGC对抗攻防** | 单模态方法无法直接迁移 | 跨模态对抗扰动的可迁移性研究 + 多模态认证基础设施 | **2027年**：当视频/3D内容AIGC大规模普及时 |
| **AI决策的可解释性安全** | 可解释性和安全性相互矛盾（解释→攻击面扩展） | 可解释性知情的安全设计 + 因果解释而非关联解释 | **2027-2028年**：在安全关键场景（医疗、金融、军事） |

---

## 四、行动建议（给交叉研究者）

### 安全顶会 vs AI顶会：投向哪边更合适？

| 交叉方向 | 安全顶会优势 | AI顶会优势 | 建议 |
|----------|-------------|-----------|------|
| **LLM/Agent安全攻击与防御** | CCS、USENIX Security > NDSS、S&P | NeurIPS > ICLR > AAAI | **首选CCS'26**（4月截稿已过但Cycle B在审）；次选USENIX Sec'26（8月，有Cycle 2） |
| **AI驱动的漏洞挖掘/二进制分析** | NDSS > CCS > USENIX Security | NeurIPS > ICLR | **首选NDSS'27**（LLM+Fuzzing赛道已确立，差异化在于垂直领域或新工具链） |
| **对抗鲁棒性（经典ML）** | S&P > USENIX Security | NeurIPS > ICLR > ICML | **两边均可**：S&P偏好可证明鲁棒性；NeurIPS偏好经验性+规模化 |
| **对齐攻击与防御** | CCS > S&P | AAAI > NeurIPS | **首选AAAI'27**（AI Alignment Track已建立，赛道明确）；安全侧CCS'26 Cycle B仍在审 |
| **联邦学习隐私攻防** | NDSS > CCS > USENIX | NeurIPS > ICML | **首选NDSS**（联邦学习安全是传统强项）；AI侧次选NeurIPS隐私track |
| **AIGC安全（水印/deepfake）** | S&P > CCS | CVPR > ICCV > NeurIPS | **视觉AIGC首选CVPR/ICCV；LLM水印首选S&P/CCS** |
| **形式化验证+AI安全** | S&P > CCS > NDSS | ICLR > AAAI | **跨投**：理论保证部分投ICLR，工程验证部分投S&P |

### 红蓝海速查表

| 赛道 | 红/蓝 | 判断依据 |
|------|-------|----------|
| LLM Agent安全攻击与防御（通用） | 🔴 红海 | ASB Benchmark + Attack Landscape + ToolHijacker多路共振，极可能成为CCS'26、USENIX Sec'26最大session |
| 对抗鲁棒性（经典视觉domain） | 🔴 红海 | 多年积累，NeurIPS/ICLR已高度饱和，但安全顶会仍有空间 |
| RLHF/DPO投毒攻击 | 🟡 橙海 | 多个团队在冲，但顶会需求持续增长，2026年底前仍有蓝海空间 |
| 联邦学习隐私攻防 | 🟡 橙海 | 稳定赛道，不冷不热，适合稳健输出 |
| AIGC多模态安全（水印/deepfake/溯源） | 🟢 蓝海 | Character-Level Perturbations刚定义问题，防御方案几乎空白，2027年才是主战场 |
| LLM供应链安全（工具库/微调后门） | 🟢 蓝海 | ToolHijacker刚开先河，Supply-Chain Backdoor是新增点，几乎无顶会竞争 |
| 形式化验证+LLM安全 | 🟢 极蓝海 | "Chasing Shadows"等刚提出形式化保证需求，顶会论文几乎为零 |
| AI决策因果可解释性安全 | 🟢 极蓝海 | 跨AI和安全顶会均几乎无直接对应论文，2027-2028年将是爆发点 |

### ⚠️ 紧急行动窗口

**当前时间窗口（2026年5月5日）：**

1. **NeurIPS 2026（5月6日截稿——明日！）**：Agentic AI安全（ASB/Attack Landscape类）+ 隐私保护LLM推理方向，**仍在开放的最后机会**。

2. **USENIX Security 2026 Cycle 2**：截稿约2026年6-7月，LLM Agent供应链安全、多智能体安全编排方向，**现在做来得及**。

3. **CCS 2026 Cycle B（已截稿4月29日）**：正在审稿中，如果你的论文在投，结果将于2026年夏秋揭晓。**下一轮Cycle是CCS 2027（截稿2026年底-2027年初）**。

4. **NDSS 2027（截稿约2026年夏）**：AI驱动漏洞挖掘（特别是固件/嵌入式/IoT方向）持续欢迎，**现在布局有先发优势**。

---

*注：本报告综合NDSS'26、IEEE S&P'26、AAAI'26、ICLR'26、CVPR'26及2026年2-5月arXiv（cs.CR/cs.AI/cs.LG/cs.CV/cs.CL）预印本信息。Future Work引述基于公开摘要。跨领域论文的精确分类标签基于标题+摘要内容推断。具体论文方法细节需通过官方渠道获取。*
