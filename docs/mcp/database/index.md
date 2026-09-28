# 数据库与缓存 MCP 生态实战

| 属性 | 详情 |
| :--- | :--- |
| **文档类型** | 存储层外设接入 / 数据库运维指南 |
| **当前状态** | 建设中 (Draft) |
| **作者** | Ateng |
| **创建日期** | 2026-09-28 |
| **关联系统/模块** | Ateng-Agent / MCP Database & Storage |

---

## 1. 为什么智能体需要直连数据库与缓存

在软件研发全生命周期中，智能体仅阅读代码文件往往只能获取“静态元数据”，无法验证“运行时状态”。通过为智能体装配数据库与缓存 MCP 扩展，能够赋予其多项核心工程能力：

- **逆向数据建模与表结构对齐**：无需人工导出 DDL，智能体自动通过 `describe_table` 探查表结构并生成 DTO / Entity；
- **业务排障与数据链路追踪**：在用户反馈线上缺陷时，直接检索关联订单、账单或日志表验证假说；
- **缓存一致性巡检与刷新**：实时检查 Redis 中 Token、Session 或分布式锁的 TTL 与 Value 状态。

---

## 2. 关系型数据库：MySQL (`mcp-server-mysql`)

官方及开源社区成熟的 `mcp-server-mysql` 提供了对 MySQL 5.7 / 8.0+ 的全功能操作支持。

### 2.1 推荐配置模板 (以 `uvx` 运行)

```json
{
  "mcpServers": {
    "mysql-dev": {
      "command": "uvx",
      "args": [
        "--with",
        "mcp<2",
        "mcp-server-mysql"
      ],
      "env": {
        "MYSQL_HOST": "rm-bp1xxxxxxxxxxxxxx.mysql.rds.aliyuncs.com",
        "MYSQL_PORT": "3306",
        "MYSQL_DATABASE": "app_biz_dev",
        "MYSQL_USER": "db_readonly_agent",
        "MYSQL_PASSWORD": "${MYSQL_READONLY_PWD}"
      }
    }
  }
}
```

### 2.2 核心暴露工具清单

- `list_tables`：列出当前库内所有数据表；
- `describe_table`：获取指定表的数据字典、字段类型、主键索引约束；
- `execute_query`：执行自定义 SQL 查询（默认应受限为只读 `SELECT`）；
- `create_table` / `insert_data`：开发环境表结构初始化与测试桩数据注入。

---

## 3. 高性能缓存与向量存储：Redis (`redis-mcp-server`)

`redis-mcp-server` 支持通过标准 Redis URI 连接单机、集群或云托管 RDS Redis 实例，全面兼容传统数据结构与现代向量检索特性。

### 3.1 推荐配置模板

```json
{
  "mcpServers": {
    "redis-dev": {
      "command": "uvx",
      "args": [
        "redis-mcp-server",
        "--url",
        "redis://${REDIS_USER}:${REDIS_PASSWORD}@r-bp1xxxxxxxxxxxxxx.redis.rds.aliyuncs.com:6379/0"
      ]
    }
  }
}
```

### 3.2 覆盖操作特性矩阵

- **基础键值操作**：`get`、`set`、`delete`、`expire`、`type`、`scan_keys`；
- **复杂数据结构**：Hash (`hget`、`hset`、`hgetall`)、List (`lpush`、`lrange`、`llen`)、Set (`sadd`、`smembers`)、ZSet (`zadd`、`zrange`)；
- **消息与事件流**：Stream (`xadd`、`xrange`、`xreadgroup`)、Pub/Sub (`publish`、`subscribe`)；
- **扩展与向量搜索**：RedisJSON (`json_get`、`json_set`)、Vector Search (`create_vector_index_hash`、`vector_search_hash`)。

---

## 4. 存储层安全基线与上下文保护 (贯彻 ADR-0003)

直连数据库的工具极其强大，也极具破坏性。在实际接入中必须遵守以下工程红线：

```mermaid
flowchart TD
    Agent["智能体发起 SQL 操作"] --> CheckSelect{"是否为纯 SELECT 只读查询?"}
    CheckSelect -- 是 --> CheckLimit{"是否携带 LIMIT 分页子句?"}
    CheckSelect -- 否 (UPDATE / DELETE / DDL) --> HumanCheck["人工二次授权拦截\n(Human-in-the-Loop 确认)"]
    
    CheckLimit -- 是 (LIMIT <= 100) --> ExecSQL["执行查询并格式化返回"]
    CheckLimit -- 否 --> AutoInjectLimit["强制追加 LIMIT 50 卫语句\n(保护上下文卫生度)"]
    AutoInjectLimit --> ExecSQL
    
    HumanCheck -- 开发者授权 --> ExecSQL
    HumanCheck -- 开发者拒绝 --> Abort["安全中止并提示修改"]
```

1. **账户最小权限原则**：面向智能体的生产/预发数据库连接，DBA 必须仅赋予 `SELECT`、`SHOW VIEW` 权限，杜绝 `DROP`、`TRUNCATE` 与 `ALTER`；
2. **上下文结果集熔断 (Context Flood Guard)**：严禁执行无限制的 `SELECT * FROM big_table`，单次查询返回结果建议强制限制在 50~100 条以内，防止超大 JSON 灌爆模型上下文窗口；
3. **敏感字段动态脱敏**：用户手机号、身份证、密码哈希等敏感列，建议在查询视图中通过 `CONCAT(LEFT(mobile, 3), '****', RIGHT(mobile, 4))` 进行数据库层脱敏后再呈现给模型。

---

## 5. 核心实战文档导航与演进

- 🚀 [01. MySQL 深度实战：只读接入、表结构逆向与慢查询熔断防护](./01-mysql-integration-and-readonly-guard.md)
- 🚀 [02. Redis 深度实战：全数据结构探查、TTL 巡检与 Stream 处理](./02-redis-cache-and-stream-operations.md)
- 📄 `03-postgresql-and-vector-pgvector.md`：PostgreSQL 与 pgvector 向量检索接入 (规划中)
