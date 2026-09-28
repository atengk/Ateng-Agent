# Google Antigravity 环境安装与凭据配置

| 属性 | 详情 |
| :--- | :--- |
| **文档类型** | 技术专题指南 |
| **当前状态** | 建设中 (Draft) |
| **作者** | Ateng |
| **创建日期** | 2026-09-28 |
| **关联系统/模块** | Ateng-AI / AI Agent / Google Antigravity |

---

## 1. 系统要求与环境准备

在开始安装配置 Google Antigravity 之前，请确保宿主机满足以下环境基线：

- **操作系统**：Windows 11 / macOS 13+ / Linux (Ubuntu 22.04+)
- **Node.js**：>= 20.x
- **包管理器**：推荐使用 `pnpm 9+`
- **Git**：>= 2.40+

---

## 2. CLI 与 IDE 插件初始化

Antigravity 提供双模接入形态：终端命令行工具（`agy` CLI）与专用集成开发环境（Antigravity IDE）。

### 安装命令行工具 (CLI)

```bash
# 全局安装 Antigravity CLI
npm install -g @google/antigravity-cli

# 校验安装版本
agy --version
```

### 身份认证与凭据配置

通过交互式向导绑定您的 Google AI 或 API 凭据：

```bash
agy login
```

系统将在本地目录创建加密的凭据上下文配置文件：
- **Windows**：`C:\Users\<user>\.gemini\antigravity\config.json`
- **Linux / macOS**：`~/.gemini/antigravity/config.json`

---

## 3. 本地工作区初始化配置

在任意项目根目录下执行初始化命令，系统将为当前仓库配置 `.gemini/` 隔离上下文元数据与临时运行时缓存。

```bash
agy init
```

> [!TIP] 最佳实践建议
> 务必将 `.gemini/` 目录加入仓库根目录的 `.gitignore` 中，防止敏感本地缓存或会话记录被意外提交到版本控制系统中。
