<div align="center">

# Ateng-Agent

**面向 Google Antigravity、Codex、Claude Code 的 AI 编程智能体实战手册**

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Author](https://img.shields.io/badge/Author-Ateng-green.svg)](https://github.com/atengk)
[![Documentation](https://img.shields.io/badge/Docs-Online-success.svg)](https://atengk.github.io/Ateng-Agent/)
[![VitePress](https://img.shields.io/badge/Built%20with-VitePress%201.6-646cff.svg)](https://vitepress.dev/)
[![Status](https://img.shields.io/badge/Status-Active%20Building-orange.svg)]()

<p align="center">
  持续沉淀与记录 Google Antigravity、Codex、Claude Code 等自主编程智能体工具链的使用文档、工程规范、MCP 统一协议与企业级 Agent Skills 技能体系。
</p>

[🌐 **在线访问知识库网站**](https://atengk.github.io/Ateng-Agent/) · [📖 **Matt Pocock 技能套件指南**](https://atengk.github.io/Ateng-Agent/skills/mattpocock/) · [📋 **仓库 Agent 行为准则**](AGENTS.md)

</div>

---

## 📌 仓库定位

随着编程辅助工具从单纯的代码补全向“全自主行动智能体（Autonomous Coding Agent）”演进，以 **Google Antigravity**、**Codex** 和 **Claude Code** 为代表的 Harness 正在重塑现代研发流程。

`Ateng-Agent` 旨在作为个人的 **AI 编程智能体工具实战与工程化落地知识库**，重点记录：
1. **智能体 Harness 实操**：聚焦 Google Antigravity、Codex、Claude Code 等核心工具的环境配置、多 Agent 协作、工作流编排与日常避坑指南；
2. **能力与规则沉淀**：收集并自研高价值 Agent Skills（Anthropic 官方、Matt Pocock 套件、Superpowers、Spec Kit）与工程规范；
3. **MCP 上下文连接**：基于 Model Context Protocol 协议安全赋能智能体调用本地数据库、Git 仓库与企业工具。

---

## 🎯 核心聚焦领域

```
                      ┌─────────────────────────────────┐
                      │            Ateng-Agent             │
                      │  AI 编程智能体工具与技能知识矩阵 │
                      └────────────────┬────────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        ▼                              ▼                              ▼
  【Agent 工具链】                【Skills 体系】                【MCP 协议】
 • Google Antigravity 专栏       • Matt Pocock 25 工程技能套件  • 数据库连接与权限隔离
 • Codex CLI 指令与实战          • Anthropic 官方规范体系       • Git 与研发流水线联动
 • Claude Code 自愈排障          • Superpowers 自动化交付       • 飞书与自动化办公
 • 多子智能体编排与隔离          • Spec Kit 规格驱动开发        • 私有 MCP Server 扩展
```

### 1. 🤖 AI Agent 实践与生态 ([`docs/agent/`](docs/agent/))
- **Google Antigravity**：IDE 深度集成、全局任务树感知、子智能体调度与反应式唤醒机制；
- **Codex**：极速命令行代码生成、模板化重构与提示词心法；
- **Claude Code**：终端原生自主排障、跨目录巡检与测试闭环。

### 2. 🛠️ Agent Skills 技能库 ([`docs/skills/`](docs/skills/))
- **四大生产级套件**：涵盖 Matt Pocock 套件、Anthropic 官方规范、Superpowers 与 Spec Kit；
- **工程治理闭环**：配备统一领域语言 [`CONTEXT.md`](CONTEXT.md) 与架构决策记录 [`docs/adr/`](docs/adr/)。

### 3. 🔌 MCP (Model Context Protocol) ([`docs/mcp/`](docs/mcp/))
- **协议标准与接入**：安全打通 MySQL、Redis、Git、终端工具与私有服务。

---

## 🗂️ 目录结构说明

```text
Ateng-Agent/
├── .github/workflows/    # CI/CD 自动化构建部署配置 (GitHub Actions)
├── docs/                 # VitePress 知识库核心根目录
│   ├── .vitepress/       # Zenith 旗舰主题配置、侧边栏与交互组件
│   ├── adr/              # 架构决策记录 (Architecture Decision Records)
│   ├── agent/            # AI Agent 智能体工具实战 (Antigravity / Codex / Claude Code)
│   ├── agents/           # 智能体工程规范 (Issue Tracker, Triage, Domain Docs)
│   ├── components/       # 交互短代码组件内参手册
│   ├── mcp/              # Model Context Protocol 协议生态与 Server 部署
│   ├── public/           # 静态公共资源 (Logo, Favicon, SVG 矢量)
│   ├── skills/           # Agent Skills 生产级技能体系 (Anthropic / Matt Pocock / 等)
│   └── index.md          # 文档站点门户首页落地页
├── AGENTS.md             # 仓库级 AI Agent 行为准则与操作红线 (必读)
├── CONTEXT.md            # 统一领域语言词汇表 (Ubiquitous Language Glossary)
├── uno.config.ts         # UnoCSS 原子化图标与样式规则
├── tsconfig.json         # TypeScript 严格类型检查配置
├── package.json          # 项目依赖配置
└── pnpm-lock.yaml        # pnpm 依赖锁文件
```

---

## 🚀 本地开发与预览指南

本项目基于 [VitePress](https://vitepress.dev/) 搭建，并集成了 `vitepress-plugin-mermaid` 原生支持流程图与时序图渲染。

### 1. 环境准备
- **Node.js**：推荐 `>= 20.0.0`
- **包管理器**：推荐使用 **`pnpm 9+`**

### 2. 本地运行步骤

```bash
# 1. 克隆代码仓库
git clone https://github.com/atengk/Ateng-Agent.git
cd Ateng-Agent

# 2. 安装依赖 (使用 pnpm)
pnpm install

# 3. 启动本地开发服务 (支持热重载)
pnpm docs:dev

# 4. 生产环境静态打包构建
pnpm docs:build

# 5. 本地预览构建产物
pnpm docs:preview
```

---

## 🗺️ 建设路线图 (Roadmap)

- [x] **Phase 1: 基础建设与规范成型**
  - [x] 建立 VitePress 现代化文档系统与自动化 GitHub Pages 部署流水线
  - [x] 配置仓库级智能体工程规范（Issue Tracker、分流标签、领域模型）
  - [x] 确立本地优先（Local-First）与禁止未经许可提交的架构决策记录（`ADR-0001`）
  - [x] 建立项目统一领域语言词汇表（`CONTEXT.md`）
- [x] **Phase 2: Matt Pocock 25 技能全体系建设**
  - [x] 编撰套件全景矩阵与生命周期闭环流程图（`skills/mattpocock/index.md`）
  - [x] 编撰需求推演与任务规划专题（`planning.md`）
  - [x] 编撰架构设计与工程编码专题（`engineering.md`）
  - [x] 编撰质量把控与排障审查专题（`review-quality.md`）
  - [x] 编撰协同交接与辅助工具专题（`collaboration.md`）
  - [x] 编撰工程初始化与配置规范专题（`setup.md`）
  - [x] 集成 Mermaid 插件实现架构拓扑图、时序图与状态机原生自适应渲染
- [ ] **Phase 3: MCP 工具链实战**
  - [ ] 梳理常用开发与数据库类 MCP Server 的标准配置模版
  - [ ] 实现首个自定义 MCP 服务端（如自建研发助手服务）
- [ ] **Phase 4: 本地大模型与知识库进阶**
  - [ ] 本地搭建 Ollama + 优秀开源代码模型运行环境
  - [ ] 探索 Agent + 个人知识库（RAG）的闭环实践

---

## 🤝 贡献与交流

本仓库为持续演进的个人技术与工程化实践记录，欢迎提交 Issue 交流技术见解，或发起 Pull Request 分享你常用的优质 MCP、Skill 或 Agent 配置！

---

## 📄 开源协议

本项目遵循 [MIT License](LICENSE) 开源协议。
