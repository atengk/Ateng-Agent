# Antigravity Rules 与工作流定制规范

| 属性 | 详情 |
| :--- | :--- |
| **文档类型** | 技术专题指南 |
| **当前状态** | 建设中 (Draft) |
| **作者** | Ateng |
| **创建日期** | 2026-09-28 |
| **关联系统/模块** | Ateng-AI / AI Agent / Google Antigravity |

---

## 1. 规则系统的核心价值

在多智能体自主编程场景下，智能体如无明确的“宪法约束”，极易产生静默覆盖代码、自行强推 Git、或引入非标依赖等高危行为。

Antigravity 采用了**双层规则继承机制 (Two-tier Rules Inheritance)**：
1. **全局通用规则 (Global Rules)**：位于 `~/.gemini/config/rules/AGENTS.md`，约束所有仓库通用的工程纪律（如两阶段 Git 确认、零裸露路径、中文交付等）；
2. **仓库领域规则 (Workspace Rules)**：位于项目根目录 `AGENTS.md` 与 `CONTEXT.md`，定义当前项目特有的领域语言、技术栈契约与 ADR 架构遵从。

---

## 2. 常用规则约束模板

### Git 版本控制最高红线

```markdown
> [!CAUTION] 核心工程红线：严禁自动提交与静默推送
> 任何 AI Agent 严禁在未经开发者显式、口令式授权的前提下擅自执行 `git commit` 或 `git push`！
- 本地优先原则：代码变更默认仅在本地工作区完成；
- 两阶段确认：当用户明确指示“提交到本地”时方可 `git add` 与 `git commit`；当明确指示“推送到远程”时方可 `git push`。
```

---

## 3. 技能扩展与自动化 (Skills Integration)

Antigravity 原生支持通过注入 `SKILL.md` 扩展智能体的专业能力（如 `/plan`、`/grill-me`、`/code-review` 等）。

- **全局技能目录**：`~/.gemini/config/skills/`
- **项目级私有技能**：`.agents/skills/`
