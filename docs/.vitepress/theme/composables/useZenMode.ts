/**
 * 沉浸式专注阅读模式 (Zen Mode) 状态管理与交互 Composable
 * @author Ateng
 * @since 2026-09-25
 */

import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const STORAGE_KEY = 'vp-zenith-zen-mode'
const isZenMode = ref(false)
let isGlobalListenerAttached = false

/**
 * 沉浸式阅读管理 Hook
 */
export function useZenMode() {
  const route = useRoute()

  /**
   * 应用或移除根节点类名与持久化
   * @param value 是否开启沉浸模式
   */
  const applyZenMode = (value: boolean) => {
    isZenMode.value = value
    if (typeof window === 'undefined') return

    const htmlEl = document.documentElement
    if (value) {
      htmlEl.classList.add('zen-mode')
      localStorage.setItem(STORAGE_KEY, 'true')
    } else {
      htmlEl.classList.remove('zen-mode')
      localStorage.setItem(STORAGE_KEY, 'false')
    }
  }

  /**
   * 切换沉浸模式状态
   */
  const toggleZenMode = () => {
    applyZenMode(!isZenMode.value)
  }

  /**
   * 绑定全局唯一的键盘快捷键监听器（单例模式，防止多组件重复触发抵消）
   */
  const ensureGlobalListener = () => {
    if (isGlobalListenerAttached || typeof window === 'undefined') return
    isGlobalListenerAttached = true

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      // 1. 忽略输入框与可编辑元素中的按键
      const target = event.target as HTMLElement | null
      if (target && (['INPUT', 'TEXTAREA'].includes(target.tagName) || target.isContentEditable)) {
        return
      }

      // 2. 判断 Alt+Z 或 Alt+F 组合键（双键别名映射，兼顾极客与全屏阅读肌肉记忆）
      const isKeyZ = event.code === 'KeyZ' || event.key === 'z' || event.key === 'Z'
      const isKeyF = event.code === 'KeyF' || event.key === 'f' || event.key === 'F'
      if (event.altKey && (isKeyZ || isKeyF)) {
        event.preventDefault()
        toggleZenMode()
        return
      }

      // 3. 判断 Escape 键退出专注模式（当无活动顶层模态框遮罩时响应）
      if (event.key === 'Escape' && isZenMode.value) {
        const hasOverlay = document.querySelector('.command-palette-mask, .vp-shortcuts-overlay, .medium-zoom-overlay') !== null
        if (!hasOverlay) {
          event.preventDefault()
          applyZenMode(false)
        }
      }
    })
  }

  onMounted(() => {
    if (typeof window === 'undefined') return

    // 从本地存储读取用户历史偏好
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'true' && route.path !== '/') {
      applyZenMode(true)
    }

    // 确保单例快捷键事件监听已注册
    ensureGlobalListener()
  })

  // 监听路由变化：若跳转到首页，自动临时抑制沉浸样式；回到文档页恢复
  watch(
    () => route.path,
    (newPath) => {
      if (typeof window === 'undefined') return
      if (newPath === '/') {
        document.documentElement.classList.remove('zen-mode')
      } else if (isZenMode.value) {
        document.documentElement.classList.add('zen-mode')
      }
    }
  )

  return {
    isZenMode,
    toggleZenMode,
    applyZenMode,
    exitZenMode: () => applyZenMode(false),
  }
}
