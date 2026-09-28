# MCP 客户端集成与配置指南

| 属性 | 详情 |
| :--- | :--- |
| **文档类型** | 客户端工程配置 / 运行时接入指南 |
| **当前状态** | 已归档 (Accepted) |
| **作者** | Ateng |
| **创建日期** | 2026-09-28 |
| **关联系统/模块** | Ateng-Agent / MCP Client Runtime |

---

## 1. 主流 MCP 客户端 (Host) 生态矩阵

随着 MCP 规范的快速普及，主流 AI 编程智能体与 IDE 已经形成了原生的 MCP 客户端支持体系。开发者仅需编写一份统一的服务定义，即可跨多个智能体环境无缝挂载：

| 客户端 (Host) | 核心应用场景 | 配置文件格式 | 热重载支持 | 传输协议支持 |
| :--- | :--- | :--- | :--- | :--- |
| **Google Antigravity** | 智能体结对编程、多 Agent 树状编排 | `mcp_config.json` | ✅ 支持动态刷新 | Stdio / SSE / HTTP |
| **Claude Code** | 终端自治编程智能体 (CLI) | `config.json` / CLI flags | ✅ 支持动态启用 | Stdio / SSE |
| **Cursor** | AI 辅助编码 IDE | `mcp.json` | ✅ 保存即刷新 | Stdio / SSE |
| **VS Code (Cline / Roo)** | 插件化自主编程插件 | `cline_mcp_settings.json` | ✅ 支持即时生效 | Stdio / SSE |
| **IntelliJ IDEA** | JetBrains 官方原生 MCP 插件 | IDE 内部配置 / 启动参数 | ⚠️ 需重启会话 | Stdio / Local Port |

---

## 2. 标准配置文件解构与语法规范

MCP 客户端配置文件统一采用标准 JSON 结构，以 `mcpServers` 作为顶级命名空间。以下为覆盖 **本地进程 (Stdio)** 与 **远程网络 (SSE/HTTP)** 的工业级模板：

```json
{
  "mcpServers": {
    "mysql-service": {
      "command": "uvx",
      "args": [
        "--with",
        "mcp<2",
        "mcp-server-mysql"
      ],
      "env": {
        "MYSQL_HOST": "127.0.0.1",
        "MYSQL_PORT": "3306",
        "MYSQL_DATABASE": "app_biz",
        "MYSQL_USER": "readonly_user",
        "MYSQL_PASSWORD": "${MYSQL_READONLY_PWD}"
      }
    },
    "apipost-remote": {
      "url": "https://open.apipost.net/mcp",
      "headers": {
        "api-token": "YOUR_API_TOKEN_HERE"
      },
      "disabled": false
    }
  }
}
```

### 关键配置字段释义

- `command`：运行本地服务的可执行程序路径（如 `uvx`、`uv`、`npx`、`node`、`python`）。在 Windows 环境中推荐使用绝对路径或系统 `PATH` 中可执行的完整命令（如 `C:\\Program Files\\nodejs\\npx.cmd`）；
- `args`：启动服务时传递的参数列表，数组元素必须为字符串；
- `env`：注入给本地子进程的环境变量键值对，用于传递数据库连接串、API 密钥等机密参数；
- `url` / `serverUrl`：远程流式 HTTP 或 SSE 服务端访问入口；
- `headers`：远程服务鉴权请求头（如 `Bearer Token` 或定制 `api-token`）；
- `disabled`：可选布尔值。设置为 `true` 可临时停用该服务，避免未就绪服务阻塞客户端初始化。

---

## 3. Google Antigravity 中的高级配置实战

在 Google Antigravity 运行时中，MCP 配置具备分层加载与**懒加载优化（Lazy Tool Loading）**机制：

### 3.1 配置文件定位

- **全局配置**：`~/.gemini/config/mcp_config.json`（跨所有工作区共享的基础服务，如全局 MySQL、飞书、Git 等）；
- **运行期临时注入**：`~/.gemini/antigravity/mcp_config.json`（由 IDE 或 CLI 进程自动同步）；
- **工作区配置**：`.gemini/mcp_config.json`（特定项目工程私有的工具链）。

### 3.2 懒加载 (Lazy Tools) 与上下文卫生

> [!TIP] 上下文卫生度优化 (Context Hygiene)
> 若接入数十个 MCP Server，一次性将所有 Tools 完整 Schema 注入大模型上下文，会消耗数万 Token 并造成严重的注意力分散（Context Bloat）。
> Antigravity 支持将高频工具配置为 **Eager（常驻快速调用）**，低频或重量级工具（如复杂业务 CRUD、文档导入）配置为 **Lazy（动态按需拉取 Schema）**，在保障功能完整性的同时将上下文损耗降低 80% 以上。

---

## 4. 跨平台常见踩坑与排障自查

1. **Windows 路径反斜杠转义**：
   - 错误：`"command": "C:\Program Files\nodejs\npx.cmd"`
   - 正确：`"command": "C:\\Program Files\\nodejs\\npx.cmd"` 或使用正斜杠 `"C:/Program Files/nodejs/npx.cmd"`；
2. **`uvx` 与 `npx` 环境变量未生效**：
   - 客户端后台子进程有时未继承当前终端的特殊用户环境变量，建议配置 `cwd` 或提供工具链全局安装路径；
3. **版本冲突与锁定**：
   - 依赖 FastMCP 时，推荐参数显式锁定版本（如 `"--with", "mcp<2"`），避免上游不兼容破坏性跃迁。

---

## 5. 本模块核心专题导航

本模块包含以下两篇客户端集成与性能调优深度指南：

1. 🪐 [Google Antigravity 原生 MCP 架构与上下文懒加载调优](./01-antigravity-deep-dive.md)：深入剖析 Antigravity 分层配置拓扑、动态热重载与 Eager vs Lazy 懒加载双轨分发架构，大幅节约 75%+ 初始 Token 预算。
2. 💻 [多宿主 MCP 客户端工程集成与跨端迁移矩阵](./02-ide-and-cli-matrix.md)：详尽覆盖 Claude Code、Cursor、VS Code (Cline) 与 IntelliJ IDEA 的跨端迁移对照、Windows 路径排坑与凭据安全注入规范。
