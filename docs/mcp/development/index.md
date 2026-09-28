# 自研 MCP Server 开发实战全景

| 属性 | 详情 |
| :--- | :--- |
| **文档类型** | 服务端开发指南 / 扩展研发实战 |
| **当前状态** | 已归档 (Accepted) |
| **作者** | Ateng |
| **创建日期** | 2026-09-28 |
| **关联系统/模块** | Ateng-Agent / MCP Server Authoring |

---

## 1. 为什么需要自研 MCP Server

开源生态中的标准 MCP 服务（如 MySQL、Git、文件系统）解决了通用的系统级操作，但无法理解企业内部的**特定业务语义**。在以下典型场景中，自研定制 MCP 服务是最佳解决方案：

- **私有业务中台与微服务对接**：将内部 RPC (Dubbo / gRPC / Spring Cloud) 或鉴权中台直接暴露为标准工具；
- **定制化自动化运维脚手架**：一键执行特定的数据库备份脚本、CI/CD 触发流水线或服务器集群巡检；
- **专属领域数据资产访问**：安全受控地读取内部知识库、敏感考勤或审批流数据。

---

## 2. 主线方案：Python FastMCP 极简开发

官方推出的 **FastMCP** 框架是目前开发效率最高、代码侵入性最低的 Python MCP 研发利器。它通过类型注解（Type Hints）与函数文档（Docstring）自动生成标准的 JSON Schema。

### 2.1 PEP 723 规范单文件开发范式 (以真实邮箱服务为例)

借助现代 Python 包管理工具 `uv` 的 PEP 723 脚本内联元数据，你可以编写完全自包含、无需预装虚拟环境的单文件 MCP 服务：

```python
# -*- coding: utf-8 -*-
# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "mcp<2",
# ]
# ///
"""
业务服务 FastMCP 示例
@author Ateng
@since 2026-09-28
"""

from mcp.server.fastmcp import FastMCP

# 1. 声明并初始化 MCP 服务中枢
mcp = FastMCP("my-biz-service")

# 2. 声明业务工具 (Tool)
@mcp.tool()
def query_user_status(user_id: int, include_orders: bool = False) -> str:
    """
    根据用户 ID 查询用户当前状态及关联订单摘要
    
    :param user_id: 系统用户唯一主键 ID
    :param include_orders: 是否关联返回最近 3 笔订单
    :return: 格式化后的用户业务状态信息
    """
    # 业务实现逻辑...
    return f"User {user_id} is ACTIVE."

# 3. 声明只读上下文资源 (Resource)
@mcp.resource("config://app/runtime-profile")
def get_runtime_profile() -> str:
    """提供当前系统的运行时配置状态"""
    return "env=prod, version=1.2.0, status=healthy"

# 4. 启动 Stdio 管道监听
if __name__ == "__main__":
    mcp.run()
```

### 2.2 启动与挂载

通过 `uv` 即可直接将该脚本无缝挂载到任何 MCP 客户端：

```bash
uv run --with "mcp<2" server.py
```

---

## 3. 双轨对照：TypeScript SDK 开发范式

对于熟悉 Node.js 与前端生态的开发者，官方同样提供了 `@modelcontextprotocol/sdk`。两者在设计哲学与核心 API 上高度对齐：

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 1. 初始化服务
const server = new McpServer({
  name: "my-biz-service-ts",
  version: "1.0.0"
});

// 2. 基于 Zod 注册强类型工具
server.tool(
  "query_user_status",
  {
    userId: z.number().describe("系统用户唯一主键 ID"),
    includeOrders: z.boolean().default(false).describe("是否关联返回订单")
  },
  async ({ userId, includeOrders }) => {
    return {
      content: [
        { type: "text", text: `User ${userId} is ACTIVE.` }
      ]
    };
  }
);

// 3. 挂载 Stdio 管道
const transport = new StdioServerTransport();
await server.connect(transport);
```

### 核心开发概念多语言对照表

| 核心功能维度 | Python FastMCP 范式 | TypeScript SDK 范式 |
| :--- | :--- | :--- |
| **服务入口类** | `FastMCP(name)` | `new McpServer({ name, version })` |
| **工具注册方式** | `@mcp.tool()` 函数装饰器 | `server.tool(name, schema, handler)` |
| **参数元数据与校验** | 原生 Type Hints + 函数 Docstring | `zod` Schema 链式定义与描述 |
| **只读资源注册** | `@mcp.resource(uri)` | `server.resource(name, uri, handler)` |
| **提示词注册** | `@mcp.prompt()` | `server.prompt(name, schema, handler)` |
| **运行传输层** | `mcp.run()` 自动托管管道 | 显式实例化 `StdioServerTransport` |

---

## 4. 调试利器：MCP Inspector 交互式审查套件

官方提供了 `@modelcontextprotocol/inspector`，允许你在未接入复杂智能体客户端之前，通过可视化 Web 界面独立调试自研 Server：

```bash
# 启动 Inspector 调试 Python 脚本
npx @modelcontextprotocol/inspector uv run --with "mcp<2" server.py
```

终端将启动本地调试页面（通常为 `http://localhost:5173`），你可以在浏览器中：
- 实时枚举工具列表与 JSON Schema 校验效果；
- 模拟模型下发入参并即时观察服务端的标准输出与返回结果；
- 捕获并检查底层的原始 JSON-RPC 2.0 请求/响应报文。

---

## 5. 本模块核心专题导航

本模块包含以下两篇自研 MCP 扩展实战开发深度指南：

1. 🐍 [Python FastMCP 进阶开发双案例实战](./01-python-fastmcp-dual-cases.md)：详细剖析 FastMCP 核心架构、装饰器推导机制，覆盖 PEP 723 单文件轻量工具与企业级健康巡检自愈微服务生产代码范式。
2. 📘 [TypeScript 官方 SDK 规范开发与 MCP Inspector 抓包联调](./02-typescript-sdk-and-inspector.md)：系统阐述 `@modelcontextprotocol/sdk` 类库架构、基于 Zod 的强类型输入防线、双轨对比以及 MCP Inspector 可视化抓包审查与工程化打包分发。
