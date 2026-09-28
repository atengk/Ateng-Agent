# 协同办公与生产力 MCP 生态实战

| 属性 | 详情 |
| :--- | :--- |
| **文档类型** | 办公协同集成 / 消息服务指南 |
| **当前状态** | 建设中 (Draft) |
| **作者** | Ateng |
| **创建日期** | 2026-09-28 |
| **关联系统/模块** | Ateng-Agent / MCP Collaboration & Productivity |

---

## 1. 办公协同外设：让智能体融入企业工作流

代码编写只是研发工作的一部分，大量的工程时间往往被消耗在需求同步、缺陷流转、测试进度播报与文档整理中。通过将飞书、邮箱等生产力外设接入 MCP 协议，智能体可以具备以下协作能力：

- **自动化研发日报与交付简报**：任务完成后自动汇总 Git Diff 并将高光成果推送至飞书群或邮件列表；
- **知识库双向同步**：将本地 Markdown 技术方案或 RFC 一键发布并排版至飞书云文档；
- **任务看板自动流转**：通过多维表格 (Bitable) 自动创建、检索与更新待办工单。

---

## 2. 飞书开放平台集成 (`@larksuiteoapi/lark-mcp`)

飞书官方维护的 `@larksuiteoapi/lark-mcp` 提供了对飞书云文档（Docx）、多维表格（Bitable）、即时通讯（IM）及权限体系的深度封装。

### 2.1 推荐配置模板 (Node.js / npx)

```json
{
  "mcpServers": {
    "feishu": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "-a",
        "YOUR_LARK_APP_ID",
        "-s",
        "YOUR_LARK_APP_SECRET",
        "-l",
        "zh",
        "--oauth",
        "--token-mode",
        "user_access_token",
        "-t",
        "preset.default,docx.v1.documentBlock.list,docx.v1.documentBlock.get,docx.v1.documentBlock.patch,docx.v1.documentBlock.batchUpdate,docx.v1.documentBlockChildren.create,docx.v1.documentBlockChildren.get,docx.v1.documentBlockChildren.batchDelete"
      ]
    }
  }
}
```

### 2.2 核心工具生态矩阵

- **云文档深度操作 (Docx v1)**：
  - `docx_v1_documentBlock_get` / `list`：结构化遍历云文档 Block 节点树；
  - `docx_v1_documentBlockChildren_create`：在指定段落末尾追加文本、代码块或表格；
  - `docx_v1_documentBlock_patch`：精准修改指定富文本块。
- **多维表格数据驱动 (Bitable v1)**：
  - `bitable_v1_appTableRecord_create`：批量插入自动化测试报告或工单；
  - `bitable_v1_appTableRecord_search`：根据过滤表达式精准过滤行记录。
- **即时通讯与群聊协作 (IM v1)**：
  - `im_v1_chat_list`：拉取智能体所在的研发群聊清单；
  - `im_v1_chatMembers_get`：查询群成员身份，实现定向艾特。

---

## 3. QQ 邮箱与 SMTP 邮件推送 (`qq-email`)

对于不需要复杂组织架构或偏向个人/小团队异步通知的场景，轻量级的邮箱服务是最高效的通信管道。

### 3.1 运行架构与配置

基于 Python 编写的 FastMCP 邮件服务可以极简封装 SMTP/IMAP 协议：

```json
{
  "mcpServers": {
    "qq-email": {
      "command": "uv",
      "args": [
        "run",
        "--with",
        "mcp<2",
        "C:\\Users\\admin\\.gemini\\servers\\qq-email\\server.py"
      ]
    }
  }
}
```

### 3.2 暴露核心功能

- `send_email`：向指定邮箱发送纯文本或 HTML 富文本邮件（支持抄送、密送）；
- `get_recent_emails`：安全读取收件箱中最近收到的未读验证码、构建告警或评审回复；
- `search_emails`：根据发件人或主题关键字快速检索历史邮件归档。

---

## 4. 协同安全准则与外发防御 (贯彻 ADR-0003)

消息与邮件推送工具直接触达真实人类用户，存在造成“信息轰炸”与“数据泄漏”的双重风险：

```
                ┌───────────────────────────────────────┐
                │        协同消息外发三重安全门防线     │
                └───────────────────┬───────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
┌────────────────────────┐      ┌────────────────────────┐      ┌────────────────────────┐
│  第 1 道：频率熔断门   │      │  第 2 道：脱敏审查门   │      │  第 3 道：授权确认门   │
├────────────────────────┤      ├────────────────────────┤      ├────────────────────────┤
│ • 单个会话限发 <= 3 封 │      │ • 正文敏感词过滤扫描   │      │ • 外部收件人显式审批   │
│ • 群聊消息强制静默时段 │      │ • 杜绝明文 Token/密码  │      │ • 最终正文内容确认弹窗 │
└────────────────────────┘      └────────────────────────┘      └────────────────────────┘
```

> [!CAUTION] 邮件与消息发送红线
> 智能体在调用 `send_email` 或向外部 IM 群组群发消息前，**必须向开发者完整展示邮件主题、收件人列表与正文预览**，获得显式确认后方可投递，严禁自主执行后台批量群发。

---

## 5. 核心实战文档导航与演进

- 🚀 [01. 飞书云文档与多维表格 MCP 自动化实战](./01-feishu-docx-and-bitable-automation.md)
- 🚀 [02. QQ 邮箱 FastMCP 研发指南：轻量邮件推送与外发三道防线](./02-fastmcp-qq-email-service.md)
- 📄 `03-dingtalk-and-wecom-integration.md`：钉钉与企业微信 MCP Server 接入指南 (规划中)
