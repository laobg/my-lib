## 使用echarts 地图

[地图json下载](http://datav.aliyun.com/portal/school/atlas/area_selector)

### 如何修改map显示的label位置？

在阿里云下载的地图json没有cp属性，那么复制centroid属性，增加一个cp属性，修改坐标，一般修改小数点后1-2位

```json
  {
    "type": "Feature",
    "properties": {
      "adcode": 500108,
      "name": "南岸区",
      "center": [106.560813, 29.523992],
      "centroid": [106.660614, 29.535521],
      "cp": [106.660614, 29.505521],
      "childrenNum": 0,
      "level": "district",
      "parent": { "adcode": 500000 },
      "subFeatureIndex": 7,
      "acroutes": [100000, 500000]
    },
  }
```
