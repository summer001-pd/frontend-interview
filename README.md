# frontend-interview
Just For Interview

1. 用vite创建一个vue+typescript的项目
2. 引入primeVue (https://primevue.org/) 的 tab & table组件
3. 实现切换tab时，table内容随之改变（使用提供的mock数据）
4. 模拟请求返回的方法，支持根据不同tab返回不同的table数据（使用提供的mock数据），接口能够按照概率返回成功或者失败的响应，并且请求的耗时能够在一定时间范围内随机
5. 解决竟态问题
6. 支持失败重试

```
// tab1
[
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    address: "123 Main St, Anytown, USA",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "0987654321",
    address: "456 Main St, Anytown, USA",
  },
  {
    id: 3,
    name: "Jim Doe",
    email: "jim.doe@example.com",
    phone: "1111111111",
    address: "789 Main St, Anytown, USA",
  },
]

// tab2
[
  {
    id: 4,
    name: "Jill Doe",
    email: "jill.doe@example.com",
    phone: "2222222222",
    address: "101 Main St, Anytown, USA",
  },
  {
    id: 5,
    name: "Jack Doe",
    email: "jack.doe@example.com",
    phone: "3333333333",
    address: "123 Main St, Anytown, USA",
  },  
  {
    id: 6,
    name: "Jill Doe",
    email: "jill.doe@example.com",
    phone: "2222222222",
    address: "101 Main St, Anytown, USA",
  },
]

// tab3
[
  {
    id: 7,
    name: "Jack Doe",
    email: "jack.doe@example.com",
    phone: "3333333333",
    address: "123 Main St, Anytown, USA",
  },
  {
    id: 8,
    name: "Jill Doe",
    email: "jill.doe@example.com",
    phone: "2222222222",
    address: "101 Main St, Anytown, USA",
  },
  {
    id: 9,
    name: "Jack Doe",
    email: "jack.doe@example.com",
    phone: "3333333333",
    address: "123 Main St, Anytown, USA",
  },
]

```
