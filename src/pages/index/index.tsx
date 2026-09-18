import { View, Button, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

function Index() {
  const goAddressList = () => {
    Taro.navigateTo({ url: '/pages/addressList/index' })
  }

  const goCouponCenter = () => {
    Taro.navigateTo({ url: '/pages/couponCenter/index' })
  }

  return (
    <View className="index-page">
      <View className="index-title">收货地址示例</View>
      <Button className="index-btn" onClick={goAddressList}>
        进入收货地址列表
      </Button>
      <Button className="index-btn index-btn--secondary" onClick={goCouponCenter}>
        进入优惠中心
      </Button>
      <Text className="index-tip">基于 Taro3 + React + TS 还原<br/>已测PC端,微信，支付宝，抖音</Text>
    </View>
  )
}

export default Index
