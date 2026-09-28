# 0002: 知识库战略聚焦编程智能体生态与 VitePress Zenith 架构跃迁 (Pivot to Coding Agent & Zenith Architecture)

| 属性 | 详情 |
| :--- | :--- |
| **文档类型** | ADR 架构决策 |
| **当前状态** | 已接受 (Accepted) |
| **决策人** | Ateng |
| **创建日期** | 2026-09-28 |
| **关联系统/模块** | Ateng-Agent / 全局架构 |

## 上下文 (Context)

在知识库建设初期，仓库以 `Ateng-AI` 命名，规划内容涵盖了宽泛的大语言模型（LLM）理论与检索增强生成（RAG）等泛 AI 概念。然而在工程实践中发现：
1. **定位泛化缺乏核心壁垒**：泛 AI 理论教程网络同质化严重，脱离了真实工程研发场景；
2. **编程智能体进入工业化拐点**：以 **Google Antigravity**、**Codex** 和 **Claude Code** 为代表的新一代 AI 编程智能体（Coding Agents）迅速崛起，开发者亟需聚焦于智能体架构、工作流规范（Rules/Skills）、MCP 协议对接与深层协作的高价值实战知识；
3. **架构与工程组织存在技术债**：早期知识库将 `agent/`、`skills/`、`mcp/` 等核心文档直接散落在仓库根目录，且 VitePress 站点采用散装第三方 Mermaid 插件，缺乏 UnoCSS 现代化样式引擎支持，全文检索对中文分词支持较弱。

## 决策 (Decision)

我们决定对知识库进行一次战略性的架构跃迁与定位重塑：

1. **业务定位战略聚焦 (Domain Pivot & Content Pruning)**：
   - 彻底剪枝并移除宽泛浅层的 `docs/llm/` 与 `docs/rag/` 专栏；
   - 全面聚焦于**AI 辅助编程智能体 (AI Coding Agents)** 垂直领域；
   - 构建围绕三大主流工具链——**Google Antigravity**、**Codex** 与 **Claude Code** 的深度专栏，沉淀 Harness 架构、工作流提示词、工程规范与多 Agent 协同体系。

2. **目录规范化平移 (Standardized Directory Structure)**：
   - 彻底告别原仓库根目录散落架构，将所有文档、静态资源全量归拢迁移至 `docs/` 内容根目录下；
   - 根目录保持纯净，仅保留标准包管理、工程配置及 Agent 规则文件（`AGENTS.md`、`CONTEXT.md`）。

3. **架构跃迁至 VitePress Zenith (Zenith Architecture Upgrade)**：
   - 引入 Zenith 旗舰套件：集成 UnoCSS 现代原子样式引擎、27+ 定制化交互组件库与设计系统；
   - 重构渲染引擎：移除旧第三方 Mermaid 插件，改用 Zenith 自研的 Markdown 围栏拦截器与沙箱化隔离渲染组件，原生支持 Mermaid 拓扑图与 Markmap 思维导图；
   - 升级高精度检索：引入基于 MiniSearch 与浏览器原生 `Intl.Segmenter` 的中文分词全文检索体系。

4. **全域品牌更名为 Ateng-Agent (Brand & Identity Alignment)**：
   - 知识库品牌由 `Ateng-AI` 统一更名为 **`Ateng-Agent`（阿腾智能体）**；
   - 同步修正 `package.json`、VitePress `base: '/Ateng-Agent/'` 路由基准、站点页眉页脚与 `README.md`；
   - 通过 GitHub CLI 将远端仓库重命名为 `atengk/Ateng-Agent`，并无缝同步更新本地 Git Remote 跟踪源。

## 影响与权衡 (Consequences)

- **正面收益 (Pros)**：
  - **核心价值高度聚焦**：从泛 AI 科普升维为一线编程智能体实战手册，以 Google Antigravity、Codex、Claude Code 三大主流生态为锚点，知识密度与壁垒显著提升；
  - **站点性能与体验质变**：Zenith 架构提供极速高精度中文分词、零水合冲突的图表渲染体验与现代响应式排版；
  - **工程规范高度统一**：统一的 `docs/` 入口使文档组织、构建流程和自动化部署更加清晰规范。
- **代价与权衡 (Cons)**：
  - **外链兼容性代价**：站点 Base 路径从 `/Ateng-AI/` 变更为 `/Ateng-Agent/`，原有的外部直接访问链接需进行适配迁移；
  - **内容剪枝历史归档**：历史 LLM/RAG 笔记从主分支移除，后续若有查阅需求需通过 Git 历史记录进行检索。
