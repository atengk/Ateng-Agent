# 0003: MCP 工具沙箱与破坏性操作安全防御策略 (MCP Tool Sandboxing & Write Guard)

- **状态 (Status)**: 已接受 (Accepted)
- **日期 (Date)**: 2026-09-28
- **决策人 (Deciders)**: Ateng

## 上下文 (Context)

在 Model Context Protocol (MCP) 深度集成的研发体系中，智能体能够通过挂载的各类 MCP Server 直连企业内外部关键基础设施，包括关系型数据库 (MySQL)、缓存 (Redis)、代码托管平台 (Git/Gitee)、API 平台 (Apipost) 以及企业办公系统 (飞书、QQ 邮箱等)。

与纯代码推理不同，MCP 工具调用具有**状态副作用 (Side Effects)** 与**不可逆破坏性风险**。例如：
1. 智能体误执行无 `WHERE` 条件的 `UPDATE` 或 `DELETE` 甚至 `DROP TABLE`，导致生产或测试数据损毁；
2. 智能体在未脱敏或未审计状态下，擅自调用邮件或 IM 工具向外部推送机密数据；
3. 智能体滥用文件写入或 Git 推送工具，污染远端仓库历史。

若不对 MCP 工具链施加系统性受控约束，将打破 [`0001-local-first-git-commit-policy.md`](./0001-local-first-git-commit-policy.md) 所确立的本地优先与人类可控防线。

## 决策 (Decision)

我们决定在本知识库与智能体工程体系中，确立 **MCP 破坏性工具受控执行三项铁律**：

1. **默认只读接入原则 (Read-by-Default)**：
   - 数据库与存储类 MCP Server 必须优先配置只读账户（`SELECT` / `GET` 权限）；
   - 在必须开放写入能力的开发/联调环境中，必须实行细粒度库表隔离与事务沙箱，杜绝使用高权限超级管理员账户（如 `root`）。
2. **状态突变二次确认机制 (Human-in-the-Loop for Mutating Tools)**：
   - 任何涉及数据写入、数据删除、结构变更（DDL）、外部消息广播（邮件、IM）或远端同步的 MCP 工具，智能体**严禁静默触发**；
   - 智能体在发起写操作工具调用前，必须在会话中完整向开发者陈述：**操作目标、具体 SQL/载荷参数、预计影响范围及回滚方案**，获得显式授权确认后方可调用。
3. **凭据安全与脱敏注入 (Credential Hygiene & Masking)**：
   - 严禁将包含真实密码、数据库连接串、飞书 App Secret、邮箱授权码或 API Token 的 MCP 配置文件提交到公共 Git 仓库；
   - 统一采用系统级环境变量（如 `MYSQL_PASSWORD`、`LARK_APP_SECRET`）或本机的私有配置文件进行动态挂载；公开文档示例必须 100% 进行脱敏替换。

## 影响与权衡 (Consequences)

- **正面收益 (Pros)**：
  - 彻底杜绝因智能体幻觉或上下文偏离引发的数据清空、误删或外泄等严重事故；
  - 统一了多客户端（Antigravity、Claude Code、Cursor 等）下的安全心智基线；
  - 支撑企业级内网资产与生产数据在受控围栏内安全赋能 AI 智能体。
- **代价与权衡 (Cons)**：
  - 在执行批量维护或联调测试时增加了人机确认交互频次，牺牲了部分全自动流水线的速度（符合核心安全红线预期）。
