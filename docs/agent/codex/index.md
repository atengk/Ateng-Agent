# Codex 快速上手与 CLI 指令速查

| 属性 | 详情 |
| :--- | :--- |
| **文档类型** | 技术专题指南 |
| **当前状态** | 建设中 (Draft) |
| **作者** | Ateng |
| **创建日期** | 2026-09-28 |
| **关联系统/模块** | Ateng-AI / AI Agent / Codex |

---

## 1. 什么是 Codex 工具链

**Codex** 专注于极速、确定性的代码辅助生成与命令行极客交互。它通过轻量级 CLI 工具深入终端，支持开发者在不离开键盘的情况下快速完成脚手架生成、单元测试编写、代码差异审查与自动化脚本生成。

---

## 2. 核心 CLI 命令速查

```bash
# 初始化当前项目配置
codex init

# 对指定文件发起自动化重构
codex edit src/components/Button.tsx -p "添加暗黑模式适配与防抖处理"

# 基于规格生成完整测试用例
codex test src/services/user.ts --coverage

# 执行多分支代码审查
codex review --staged
```

---

## 3. 本模块章节导航

- 📘 [快速上手与 CLI 指令速查](./)
- 🚀 [提示词心法与工程重构实践](./best-practices.md)
