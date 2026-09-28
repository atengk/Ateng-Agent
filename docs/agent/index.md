# AI Agent 智能体工具中心

| 属性 | 详情 |
| :--- | :--- |
| **文档类型** | 全景导读与选型矩阵 |
| **当前状态** | 建设中 (Draft) |
| **作者** | Ateng |
| **创建日期** | 2026-09-28 |
| **关联系统/模块** | Ateng-AI / AI Agent |

---

## 1. 模块核心定位

本专栏专注于新一代**自主编程智能体 (Coding Agent)** 工具链的深度实战与工程化落地。不同于传统被动的聊天机器人，现代 Coding Agent 具备**工作区全域感知、文件自主修改、终端命令驱动、测试闭环与工具链调用**的完整行动能力。

本站点重点沉淀以下三大主流智能体 Harness 的配置调优与实战心法：

1. **Google Antigravity**：深度集成的 IDE 级多智能体协同引擎，支持子代理编排、任务树跟踪与丰富的内置 MCP 扩展；
2. **Codex**：聚焦代码生成与自动化流水线集成的生产力 CLI 工具，强调极速反馈与上下文高效复用；
3. **Claude Code**：由 Anthropic 打造的终端原生自主智能体，具备出色的工程推理、大型代码库巡检与持续长链路排障能力。

---

## 2. 智能体核心能力选型矩阵

| 工具体系 | 交互形态 | 核心优势 | 最佳适用场景 |
| :--- | :--- | :--- | :--- |
| **Google Antigravity** | IDE 深度协同 / 多 Agent 编排 | 全局任务树、子智能体派发、内置安全防护沙箱 | 复杂系统架构重构、全栈开发、多任务并发调研 |
| **Codex** | CLI 终端 / 自动化流水线 | 毫秒级轻量响应、模板化代码生成、低心智负担 | 快速原型验证、函数级重构、CI/CD 自动化脚本编写 |
| **Claude Code** | 终端命令行交互 / 全自主执行 | 卓越的长上下文推理、深度 Bug 排查、跨文件重构 | 遗留系统代码阅读、跨模块缺陷定位、端到端测试编写 |

---

## 3. 专栏知识体系大纲

- 🪐 **[Google Antigravity 专栏](./antigravity/)**
  - [架构全景与快速上手](./antigravity/)
  - [环境安装与凭据配置](./antigravity/install-and-config.md)
  - [Rules / Skills 与工作流规范](./antigravity/workflows-and-rules.md)
  - [子智能体编排与团队协同实战](./antigravity/subagents-and-teamwork.md)
- ⚡ **[Codex 专栏](./codex/)**
  - [快速上手与 CLI 指令速查](./codex/)
  - [提示词心法与工程重构实践](./codex/best-practices.md)
- 🧠 **[Claude Code 专栏](./claude-code/)**
  - [快速上手与核心架构原理解析](./claude-code/)
  - [工作流规范与工程最佳实践](./claude-code/best-practices.md)
