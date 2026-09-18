import { View, Text, ScrollView, Image } from '@tarojs/components'
import { useState, useCallback, useEffect, useRef } from 'react'
import Taro from '@tarojs/taro'
import gtIcon from '../../assets/icons/gt.png'
import saleCardIcon from '../../assets/icons/sale-card.png'
import getItIcon from '../../assets/icons/get-it.png'
import './index.scss'

type TabKey = 'mine' | 'member' | 'voucher' | 'receive'

interface Coupon {
  id: string
  title: string
  subTag?: string
  amount: number
  threshold: number
  validFrom: string
  validTo: string
  ruleText: string
  category: TabKey
  isAppExclusive: boolean
  isPlatinum: boolean
  isNew?: boolean
  /** 券的形态：普通卡片 / 专享券包 */
  kind?: 'card' | 'pack'
}

const TABS: { key: TabKey; label: string }[] = [
  { key: 'mine', label: '我的优惠券' },
  { key: 'member', label: '付费会员' },
  { key: 'voucher', label: '代金券' },
  { key: 'receive', label: '领券' }
]

const INITIAL_COUPONS: Coupon[] = [
 
  {
    id: 'm2',
    title: '满减优惠券',
    amount: 20,
    threshold: 100,
    validFrom: '2026.09.01',
    validTo: '2026.10.01',
    ruleText: '规则说明',
    category: 'receive',
    isAppExclusive: false,
    isPlatinum: false
  },
 
  {
    id: 'pack1',
    title: '每月领券',
    kind: 'pack',
    amount: 0,
    threshold: 0,
    validFrom: '2026.09.01',
    validTo: '2026.09.30',
    ruleText: '每月可领 4 张专享优惠券',
    category: 'receive',
    isAppExclusive: false,
    isPlatinum: true
  },
   {
    id: 'm1',
    title: '香辣劲爆鸡米花小份10块',
    subTag: '甄选白羽鸡翅尖',
    amount: 10,
    threshold: 0,
    validFrom: '2025.10.29',
    validTo: '2026.11.29',
    ruleText: '规则说明',
    category: 'receive',
    isAppExclusive: true,
    isPlatinum: true
  },
  {
    id: 'mb1',
    title: '超级会员月卡',
    amount: 25,
    threshold: 0,
    validFrom: '2026.09.01',
    validTo: '2026.10.01',
    ruleText: '规则说明',
    category: 'receive',
    isAppExclusive: true,
    isPlatinum: true
  },
  {
    id: 'mb2',
    title: '家庭会员年卡',
    amount: 199,
    threshold: 0,
    validFrom: '2026.09.01',
    validTo: '2027.09.01',
    ruleText: '规则说明',
    category: 'receive',
    isAppExclusive: true,
    isPlatinum: true
  }
  
]

const AMOUNTS = [1, 3, 5, 10, 20, 50, 100]
const RULES = ['规则说明：全场通用，限 1 张。', '规则说明：限指定品类使用。', '规则说明：跨店叠加可用。', '规则说明：限今日下单使用。']
const TITLES = ['限时优惠券', '新人专享券', '回馈礼券', '节日专享券', '积分兑换券']

let newIdSeq = 1000

function getNewCoupons(count: number): Coupon[] {
  const arr: Coupon[] = []
  for (let i = 0; i < count; i++) {
    newIdSeq += 1
    const amount = AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)]
    const title = TITLES[Math.floor(Math.random() * TITLES.length)]
    arr.push({
      id: `n${newIdSeq}_${Date.now()}_${i}`,
      title,
      amount,
      threshold: Math.floor(Math.random() * 5) * 50 + amount * 5,
      validFrom: '2026.09.17',
      validTo: '2026.09.30',
      ruleText: RULES[Math.floor(Math.random() * RULES.length)],
      category: 'receive',
      isAppExclusive: true,
      isPlatinum: true,
      isNew: true
    })
  }
  return arr
}

function CouponCenterPage() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabKey>('receive')
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS)
  const [newIds, setNewIds] = useState<string[]>([])
  // 已领取（永久标记）：控制水印 + "立即使用"按钮文字，不随闪烁结束而清除
  const [claimedIds, setClaimedIds] = useState<string[]>([])
  // 领取中的 pack id（非空则显示"领券中"）
  const [packClaiming, setPackClaiming] = useState<string | null>(null)
  // 正在播放"消失动画"的 pack id（消失动画完成后从列表中移除）
  const [packLeaving, setPackLeaving] = useState<string | null>(null)
  // 从 pack 飞出的 4 张红包卡片：起点、终点都是相对 lightbox 左上角的像素坐标
  // 运行时逐帧动画：current 是当前帧的 x/y，target 是终点
  const [flyCards, setFlyCards] = useState<{
    id: number
    startX: number
    startY: number
    endX: number
    endY: number
    // 当前帧位置（由 RAF 逐帧更新）
    cx: number
    cy: number
    scale: number
    opacity: number
    rotation: number
  }[]>([])
  // RAF 停止标志（防止组件卸载后仍更新）
  const rafStopRef = useRef(false)

  const visibleList = coupons.filter((c) => c.category === activeTab)

  useEffect(() => {
    return () => {
      rafStopRef.current = true
    }
  }, [])

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  /** 查询一个元素相对 lightbox 的中心坐标 */
  const queryCenterRelative = useCallback(
    (selector: string): Promise<{ x: number; y: number } | null> => {
      return new Promise((resolve) => {
        try {
          Taro.createSelectorQuery()
            .select(selector)
            .boundingClientRect()
            .select('#coupon-lightbox')
            .boundingClientRect()
            .exec((res: any[]) => {
              const el = res && res[0]
              const box = res && res[1]
              if (el && box && el.width > 0 && box.width > 0) {
                resolve({
                  x: el.left - box.left + el.width / 2,
                  y: el.top - box.top + el.height / 2
                })
              } else {
                resolve(null)
              }
            })
        } catch (e) {
          resolve(null)
        }
      })
    },
    []
  )

  /** 查询一个元素相对 lightbox 的高度（用于计算 pack 消失后新券的位移） */
  const querySizeRelative = useCallback(
    (selector: string): Promise<{ width: number; height: number } | null> => {
      return new Promise((resolve) => {
        try {
          Taro.createSelectorQuery()
            .select(selector)
            .boundingClientRect()
            .exec((res: any[]) => {
              const el = res && res[0]
              if (el && el.width > 0) {
                resolve({ width: el.width, height: el.height+20 })
              } else {
                resolve(null)
              }
            })
        } catch (e) {
          resolve(null)
        }
      })
    },
    []
  )

  /**
   * 抛物线动画：从 (sx, sy) 到 (ex, ey)，时长 duration ms
   * 使用 requestAnimationFrame 逐帧更新 flyCards 状态
   * peak = 抛物线顶点 y（负值 = 上抛）
   */
  const playParabola = useCallback(
    (
      cards: {
        id: number
        startX: number
        startY: number
        endX: number
        endY: number
      }[],
      duration: number,
      peaks: number[] // 每张卡片的抛物线顶点高度（负值）
    ) => {
      // 初始化 4 张卡片状态：全部在起点，opacity 0
      setFlyCards(
        cards.map((c) => ({
          ...c,
          cx: c.startX,
          cy: c.startY,
          scale: 0,
          opacity: 0,
          rotation: 0
        }))
      )

      const startTime = Date.now()

      const tick = () => {
        if (rafStopRef.current) return
        const elapsed = Date.now() - startTime
        const t = Math.min(1, elapsed / duration)

        // 每张卡片走独立的抛物线：x 线性，y 抛物线
        const updated = cards.map((c, i) => {
          const peak = peaks[i] || -100
          const x = c.startX + (c.endX - c.startX) * t
          // 抛物线：起点 -> 顶点(peak) -> 终点
          const y = c.startY + (c.endY - c.startY) * t + peak * Math.sin(Math.PI * t)
          // 缩放：0.4 -> 1 -> 0.4（拱形）
          const scale = 1
          // 全程不旋转
          const rotation = 0
          // 全程 opacity = 1（到达终点后停留 0.5s 再由外层清理）
          const opacity = 1
          return {
            ...c,
            cx: x,
            cy: y,
            scale,
            opacity,
            rotation
          }
        })

        setFlyCards(updated)

        if (t < 1) {
          // 使用 setTimeout 而不是 RAF 以兼容小程序
          // 目标帧率 ~60fps，16ms 一帧
          window.setTimeout ? null : null // H5 only, 但小程序里 setTimeout 也存在
          setTimeout(tick, 16)
        }
      }
      tick()
    },
    []
  )

  const handleReceive = useCallback(async (packId?: string) => {
    // pack 领取中不允许再次触发（避免动画重入导致重复领券 / 坐标错位）
    if (packClaiming) return
    rafStopRef.current = false // 重置停止标志
    const isFromPack = !!packId
    const count = isFromPack ? 4 : Math.floor(Math.random() * 4) + 1
    const news = getNewCoupons(count)

    if (isFromPack) {
      setPackClaiming(packId!)
      // 先测 pack 中心（作为动画起点，pack 放大用 scale 不改布局位置，所以坐标稳定）
      const start = (await queryCenterRelative(`#pack-${packId}`)) || { x: 200, y: 500 }
      // 测 pack 高度：pack 从列表移除后，新券列表整体上移 pack.height，抛物线终点 y 需要减去该值
      const packSize = (await querySizeRelative(`#pack-${packId}`)) || { width: 0, height: 180 }

      // ===== 阶段 1：pack 放大动画 =====
      // 由 CSS 处理（.coupon-pack--zoom 0.2s 完成后保持 scale(1.04)）
      // pack 3s 后消失，sale-card 2s 后出现，见后续 setTimeout

      // ===== 阶段 2：点击后 0.5s，4 张 sale-card 出现 + 新券同时插入 =====
      // 新券插在 pack 之后（保持 pack 位置稳定，sale-card 起点坐标有效）
      setTimeout(() => {
        // 插入 4 张新券到 pack 之后
        setCoupons((prev) => {
          const packIdx = prev.findIndex((c) => c.id === packId)
          if (packIdx === -1) return [...prev, ...news.map((n) => ({ ...n, isNew: true }))]
          const newsCoupons = news.map((n) => ({ ...n, isNew: true }))
          return [...prev.slice(0, packIdx + 1), ...newsCoupons, ...prev.slice(packIdx + 1)]
        })

        const ids = news.map((n) => n.id)
        setNewIds(ids)
        setClaimedIds((prev) => [...prev, ...ids])

        // 等新券入场动画完全结束后（1000ms）再测量，避免 translateY 未归零时测得偏移位置
        setTimeout(async () => {
          const targets: { x: number; y: number }[] = []
          for (let i = 0; i < 4; i++) {
            const t = await queryCenterRelative(`#coupon-img-${news[i].id}`)
            targets.push(t || { x: start.x - 80, y: start.y + 260 * i + 130 })
          }
          // 每张卡片不同的抛物线峰值（负值 = 上抛高度）
          const peaks = [-80, -60, -40, -20]
          // pack 消失后新券列表整体上移 pack.height，终点 y 需要减去该值
          // pack 从列表移除的时刻 = pack 消失动画开始时刻 + 动画时长 = t=1200ms + 700ms = t=1900ms
          // 抛物线飞行期间（t=1260ms → t=3460ms）跨过了 pack 消失时刻，所以终点 y 必须修正
          const packHeight = packSize.height
          // 4 张卡片初始位置扇形排成一排（横向间隔 60px，居中于 pack 中心）
          const cardSpacing = 25
          const offsetX = 30  // 整组卡片向右偏移 60px
          const cards = targets.map((end, i) => ({
            id: i,
            startX: start.x + offsetX + (i - 1.5) * cardSpacing,
            startY: start.y,
            endX: end.x,
            endY: end.y - packHeight + 18
          }))

          // ===== 阶段 3：4 张 sale-card 淡入（200ms） =====
          // 全程不旋转（rotation 保持 0）
          setFlyCards(
            cards.map((c) => ({
              ...c,
              cx: c.startX,
              cy: c.startY,
              scale: 0.05,
              opacity: 0,
              rotation: 0
            }))
          )
          const fadeInStart = Date.now()
          const fadeIn = () => {
            if (rafStopRef.current) return
            const t = Math.min(1, (Date.now() - fadeInStart) / 200)
            const scale = 0.05 + 0.6 * t
            const opacity = t
            setFlyCards((prev) =>
              prev.length === 0
                ? []
                : prev.map((c) => ({ ...c, scale, opacity }))
            )
            if (t < 1) setTimeout(fadeIn, 16)
          }
          setTimeout(fadeIn, 16)

          // ===== 阶段 4：停留 0.5s 后启动抛物线 =====
          // 停留期从 sale-card 出现时刻算起：200ms 淡入 + 500ms 停留 = 700ms 后开始抛物线
          setTimeout(() => {
            playParabola(cards, 1200, peaks)
            // ===== 阶段 5：抛物线到达终点，停留后播放淡出动画再清空 =====
            // 停留 0.8s 后开始 300ms 淡出（scale 1→0.4, opacity 1→0），淡出结束再清空数组
            setTimeout(() => {
              const fadeOutStart = Date.now()
              const fadeOut = () => {
                if (rafStopRef.current) return
                const t = Math.min(1, (Date.now() - fadeOutStart) / 300)
                const scale = 1 - 0.6 * t  // 1 -> 0.4
                const opacity = 1 - t       // 1 -> 0
                setFlyCards((prev) =>
                  prev.length === 0
                    ? []
                    : prev.map((c) => ({ ...c, scale, opacity }))
                )
                if (t < 1) {
                  setTimeout(fadeOut, 16)
                } else {
                  // 淡出完成后清空数组
                  setFlyCards([])
                  setPackClaiming(null)
                }
              }
              setTimeout(fadeOut, 16)
            }, 1000 + 800)
          }, 100)

          // ===== 阶段 6：新券闪烁图层 5.65s 后从 DOM 移除（水印/按钮不变） =====
          setTimeout(() => {
            setNewIds((prev) => prev.filter((id) => !ids.includes(id)))
          }, 5650)
        }, 500)
      }, 0)

      // ===== 阶段 7：点击后 3.46s，pack 开始消失动画（0.5s） =====
      // 抛物线飞行结束时刻（t=1260ms 开始 + 2200ms 飞行 = t=3460ms）
      // pack 消失必须延后到抛物线飞行结束之后，否则新券列表上移导致终点坐标失效
      setTimeout(() => {
        setPackLeaving(packId!)
        setTimeout(() => {
          setPackLeaving(null)
          setCoupons((prev) => prev.filter((c) => c.id !== packId))
        }, 700)
      }, 1200)
    } else {
      // 底部"一键领券"：无抛物线，无 pack 领取中状态
      setCoupons((prev) => {
        const newsCoupons = news.map((n) => ({ ...n, isNew: true }))
        const idx = prev.findIndex((c) => c.category === 'receive' && c.kind !== 'pack')
        if (idx === -1) return [...prev, ...newsCoupons]
        return [...prev.slice(0, idx), ...newsCoupons, ...prev.slice(idx)]
      })
      const ids = news.map((n) => n.id)
      setNewIds(ids)
      setClaimedIds((prev) => [...prev, ...ids])
      setTimeout(() => {
        setNewIds((prev) => prev.filter((id) => !ids.includes(id)))
      }, 3650)
    }

    setActiveTab('receive')
  }, [queryCenterRelative, playParabola, packClaiming])

  const handleClaim = useCallback((id: string) => {
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, isNew: false } : c)))
  }, [])

  return (
    <View className="coupon-center">
      <View className="coupon-center__bg" />
      <View className="coupon-center__main">
        <View className="coupon-center__title">欢迎回来</View>
        <View className="coupon-center__subtitle">这里可以查看与领取你的优惠</View>
        <View className="coupon-center__entry-btn" onClick={handleOpen}>
          <Text className="coupon-center__entry-icon">🎁</Text>
          <Text className="coupon-center__entry-text">优惠中心</Text>
        </View>
        
      </View>

      {open ? (
        <View className="coupon-center__mask">
          <View className="coupon-center__lightbox" id="coupon-lightbox">
            <View className="coupon-center__header">
              <Text className="coupon-center__header-title">优惠中心</Text>
              <View className="coupon-center__close" onClick={handleClose}>
                <Text className="coupon-center__close-icon">×</Text>
              </View>
            </View>

            <View className="coupon-tabs">
              {TABS.map((tab) => {
                const count = coupons.filter((c) => c.category === tab.key).length
                const isActive = activeTab === tab.key
                return (
                  <View
                    key={tab.key}
                    className={`coupon-tabs__item ${isActive ? 'cc' : ''}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.key === 'receive' ? (
                      <View className="coupon-tabs__badge">
                        <Text className="coupon-tabs__badge-text">气泡装饰</Text>
                      </View>
                    ) : null}
                    <Text className="coupon-tabs__label">{tab.label}</Text>                    
                  </View>
                )
              })}
            </View>

            <View className="coupon-center__body">
              <ScrollView className="coupon-list" scrollY showScrollbar={false} style={{ height: '100%' }}>
                <View className="coupon-list__inner">
                  {visibleList.length === 0 ? (
                    <View className="coupon-empty">
                      <Text className="coupon-empty__icon">📭</Text>
                      <Text className="coupon-empty__text">暂无优惠券，去领券吧</Text>
                    </View>
                  ) : null}

                  {visibleList.map((c) => {
                    const isFlashing = newIds.indexOf(c.id) >= 0
                    const isClaimed = claimedIds.indexOf(c.id) >= 0
                    if (c.kind === 'pack') {
                      const isClaimingThis = packClaiming === c.id
                      const isLeaving = packLeaving === c.id
                      return (
                        <View
                          id={`pack-${c.id}`}
                          className={`coupon-pack ${isClaimingThis ? 'coupon-pack--zoom' : ''} ${isLeaving ? 'coupon-pack--leaving' : ''}`}
                          key={c.id}
                        >
                          <View className="coupon-pack__body">
                            <View className="coupon-pack__icon-wrap">
                              <Text className="coupon-pack__icon">🎁</Text>
                              <Text className="coupon-pack__icon-tag">专享券包</Text>
                            </View>
                            <View className="coupon-pack__info">
                              <Text className="coupon-pack__title">{c.title}</Text>
                              <Text className="coupon-pack__desc">
                                <Text className="coupon-pack__count">2</Text>张券待领取
                              </Text>
                            </View>
                            <View
                              className="coupon-pack__btn"
                              onClick={() => handleReceive(c.id)}
                            >
                              <Text className="coupon-pack__btn-text">
                                {isClaimingThis ? '领券中' : '领券'}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )
                    }
                    return (
                      <View
                        key={c.id}
                        className={`coupon-card ${isFlashing ? 'coupon-card--slide-in' : ''}`}
                      >
                        {isFlashing ? (
                          <View className="coupon-card__flash-overlay" />
                        ) : null}
                        {isClaimed ? (
                          <Image
                            className="coupon-card__get-it-bg"
                            src={getItIcon}
                            mode="aspectFit"
                          />
                        ) : null}
                        {(c.isAppExclusive || c.isPlatinum) ? (
                          <View className="coupon-card__app-vip">
                            {c.isAppExclusive ? (
                              <View className="coupon-card__app-tag">
                                <Text className="coupon-card__app-tag-text">APP专享</Text>
                              </View>
                            ) : null}
                            {c.isPlatinum ? (
                              <View className="coupon-card__platinum-tag">
                                <Text className="coupon-card__platinum-tag-text">白金会员享</Text>
                              </View>
                            ) : null}
                          </View>
                        ) : null}
                        <View className="coupon-card__top">
                          <View className="coupon-card__image-wrap" id={`coupon-img-${c.id}`}>
                            <View className="coupon-card__image-placeholder" />
                          </View>
                          <View className="coupon-card__content">
                            <View className="coupon-card__row">
                              <Text className="coupon-card__title">{c.title}</Text>                             
                            </View>
                            <View className="coupon-card__detail">
                              <View className="coupon-card__detail-left">
                                {c.subTag ? (
                                  <View className="coupon-card__sub-tag">
                                    <Text className="coupon-card__sub-tag-text">{c.subTag}</Text>
                                  </View>
                                ) : null}
                                <View className="coupon-card__amount-row">
                                  <View className="coupon-card__amount-wrap">
                                    <Text className="coupon-card__amount">{c.amount}</Text>
                                    <Text className="coupon-card__amount-unit">元</Text>
                                  </View>
                                </View>
                                <Text className="coupon-card__date">
                                  {c.validFrom}–{c.validTo}
                                </Text>
                              </View>
                              <View className="coupon-card__footer-row">
                                <View
                                  className={`coupon-card__claim-btn ${isClaimed ? 'coupon-card__claim-btn--used' : ''}`}
                                  onClick={() => handleClaim(c.id)}
                                >
                                  <Text className="coupon-card__claim-btn-text">
                                    {isClaimed ? '立即使用' : '领券'}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View className="coupon-card__rule">
                          <Text className="coupon-card__rule-text">{c.ruleText}</Text>   
                          <Image className="coupon-card__rule-icon" src={gtIcon} mode="aspectFit" />
                        </View>
                      </View>
                    )
                  })}
                </View>
              </ScrollView>
            </View>

            <View className="coupon-center__footer">
              <View className="coupon-center__receive-btn">
                <Text className="coupon-center__receive-btn-text">
                  {packClaiming ? '领券中' : '一键领券'}
                </Text>
              </View>
            </View>

            {flyCards.length > 0 ? (
              <View className="fly-cards">
                {flyCards.map((card) => (
                  <View
                    className="fly-cards__item"
                    key={card.id}
                    style={{
                      left: `${card.cx}px`,
                      top: `${card.cy}px`,
                      transform: `translate(-50%, -50%) scale(${card.scale}) rotate(${card.rotation}deg)`,
                      opacity: card.opacity
                    }}
                  >
                    <Image className="fly-cards__img" src={saleCardIcon} mode="aspectFit" />
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        </View>
      ) : null}
    </View>
  )
}

export default CouponCenterPage
