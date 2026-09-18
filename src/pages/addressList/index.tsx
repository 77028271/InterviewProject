import React, { useEffect, useState } from 'react'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'
import checkIcon from '../../assets/icons/check.png'
import editIcon from '../../assets/icons/edit-icon.png'

/**
 * 标签分类
 * - system：系统判定标签（常用 / 上次下单 / 距离最近）
 * - custom：用户备注标签（父母家 / 家 / 公司 …）
 */
type SystemLabel = '常用' | '上次下单' | '距离最近'
type CustomLabel = '父母家' | '家' | '公司' | '学校' | '健身房' | string

/**
 * 收货地址
 * - systemLabels：系统判断出的标签
 * - customLabels：用户自己写/选的备注标签
 * - closesIn：距离餐厅停止接收订单的剩余秒数（倒计时）
 */
interface Address {
  id: number
  name: string
  phone: string
  address: string
  systemLabels: SystemLabel[]
  customLabels: CustomLabel[]
  isDefault: boolean
  closesIn: number
}

/** 秒 → "HH:MM:SS"；已过 0 显示 "已停止" */
function formatCountdown(total: number): string {
  if (total <= 0) return '已停止'
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

/**
 * 倒计时标签显示策略：
 * - 0 秒        → 显示"已停止"（红）
 * - 0 < t <= 5 分钟 → 显示"剩 HH:MM:SS"（红，紧迫感）
 * - t > 5 分钟  → 不显示
 * 返回 null 表示隐藏标签。
 */
type CountdownView = { theme: 'red' | 'gray'; text: string } | null
function getCountdownView(total: number): CountdownView {
  if (total <= 0) return { theme: 'gray', text: '已停止' }
  if (total <= 5 * 60) return { theme: 'red', text: `${formatCountdown(total)} 后餐厅停止接单` }
  return null
}

/**
 * 系统标签 → 蓝色（信息中性，系统判断）
 * 用户备注 → 橙色（用户输入，暖色区分）
 * 倒计时   → 红/灰（紧迫感 vs 充裕）
 */
/**
 * 系统标签 → 淡粉（系统判定专属，与用户备注橙色/倒计时红色视觉区分）
 * 用户备注 → 橙色（用户输入，暖色区分）
 * 倒计时   → 红（< 5min 或已停止时的紧迫感）
 */
function themeForSystemLabel(_label: SystemLabel): 'system' {
  return 'system'
}

function themeForCustomLabel(_label: CustomLabel): 'orange' {
  return 'orange'
}

const MOCK_ADDRESSES: Address[] = [
  {
    id: 1,
    name: '小明',
    phone: '138****8888',
    address: '北京市 朝阳区 建国路 88 号 SOHO 现代城 3-1205',
    systemLabels: ['常用'],
    customLabels: ['公司'],
    isDefault: true,
    closesIn: 2 * 3600 + 15 * 60 + 30 // 2:15:30
  },
  {
    id: 2,
    name: '小红',
    phone: '139****6666',
    address: '上海市 浦东新区 张江高科技园区 科苑路 88 号上海市 浦东新区 张江高科技园区 科苑路 88 号8 号上海市 浦东新区 张江高科技园区 科苑路 88 号',
    systemLabels: ['上次下单', '距离最近'],
    customLabels: ['父母家'],
    isDefault: false,
    closesIn: 45 * 60 + 12 // 00:45:12，触发紧急红
  },
  {
    id: 3,
    name: '小王',
    phone: '137****2222',
    address: '广州市 天河区 珠江新城 华穗路 406 号 富力盈泰大厦',
    systemLabels: ['常用'],
    customLabels: ['家'],
    isDefault: false,
    closesIn: 0 * 3600 + 5 * 60 // 4:08:00
  },
  {
    id: 4,
    name: '小赵',
    phone: '136****3333',
    address: '深圳市 南山区 科技园 深南大道 10000 号 阿里中心 T4 栋',
    systemLabels: [],
    customLabels: ['健身房'],
    isDefault: false,
    closesIn: 0 // 已停止接单
  },
  {
    id: 5,
    name: '小小',
    phone: '136****3333',
    address: '深圳市 南山区 科技园 深南大道 10000 号 阿里中心 T4 栋圳市 南山区 科技园 深南大道 10000 号 阿里中心 T4 栋圳市 南山区 科技园 深南大道 10000 号 阿里中心 T4 栋',
    systemLabels: [],
    customLabels: [],
    isDefault: false,
    closesIn: 1 * 3600 + 5 * 60 // 4:08:00
  }
]

type LabelTheme = 'orange' | 'green' | 'red' | 'blue' | 'pink' | 'gray' | 'system'

const LabelBadge: React.FC<{
  theme: LabelTheme
  children: React.ReactNode
  extraClass?: string
}> = ({ theme, children, extraClass }) => (
  <View className={`label label--${theme}${extraClass ? ` ${extraClass}` : ''}`}>
    <Text>{children}</Text>
  </View>
)

const Radio: React.FC<{ checked: boolean }> = ({ checked }) =>
  checked ? (
    <View className="radio radio--checked">
      <Image className="radio__icon" src={checkIcon} mode="aspectFit" />
    </View>
  ) : (
    <View className="radio radio--empty" />
  )

const AddressItem: React.FC<{
  item: Address
  onSelect: (id: number) => void
  onEdit: (id: number) => void
}> = ({ item, onSelect, onEdit }) => {
  // 每个条目独立倒计时；用局部 state 避免整表刷新
  const [seconds, setSeconds] = useState(item.closesIn)

  useEffect(() => {
    if (seconds <= 0) return
    const t = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(t)
  }, [seconds])

  const countdownView = getCountdownView(seconds)

  return (
    <View
      className={`address-item${item.isDefault ? ' address-item--active' : ''}`}
      onClick={() => onSelect(item.id)}
    > 
      <View className="address-item__radio-wrap">
        <Radio checked={item.isDefault} />
      </View>

      <View className="address-item__body">
        <View className="address-item__content">
          <View className="address-item__labels">
            {/* ① 系统判定标签 */}
            {item.systemLabels.map((l, i) => (
              <LabelBadge key={`s-${i}`} theme={themeForSystemLabel(l)}>
                {l}
              </LabelBadge>
            ))}
            {/* ② 用户备注标签 */}
            {item.customLabels.map((l, i) => (
              <LabelBadge key={`c-${i}`} theme={themeForCustomLabel(l)}>
                {l}
              </LabelBadge>
            ))}
            {/* ③ 倒计时标签，仅在 <= 5 分钟 或 已停止 时显示，放在最后 */}
            {countdownView ? (
              <LabelBadge theme={countdownView.theme} extraClass="label--countdown">
                {countdownView.text}
              </LabelBadge>
            ) : null}
          </View>


          <Text className="address-item__address">{item.address}</Text>
          <View className="address-item__name-row">
            <Text className="address-item__name">{item.name}</Text>
            <Text className="address-item__phone">{item.phone}</Text>
          </View>
        </View>

        <View className="address-item__edit-wrap" onClick={() => onEdit(item.id)}>
          <Image className="address-item__edit-icon" src={editIcon} mode="aspectFit" />
        </View>
      </View>
    </View>
  )
}

const AddressListPage: React.FC = () => {
  const [list, setList] = useState<Address[]>(MOCK_ADDRESSES)

  const handleSelect = (id: number) => {
    setList((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })))
  }

  const handleEdit = (id: number) => {
    Taro.showToast({ title: `编辑地址 #${id}`, icon: 'none' })
  }

  return (
    <View className="address-page">
      <ScrollView scrollY className="address-list">
        {list.map((item) => (
          <AddressItem key={item.id} item={item} onSelect={handleSelect} onEdit={handleEdit} />
        ))}
      </ScrollView>
      
    </View>
  )
}

export default AddressListPage
