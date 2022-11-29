<template>
  <div class="my_order_container">
    <div>
      <template>
        <el-table
            :data="orders"
        >
          <el-table-column
              type="index"
              label="序号"
              width="100"
          >
          </el-table-column>
          <el-table-column
              prop="orderId"
              label="订单编号"
              width="120"
          >
          </el-table-column>
          <el-table-column
              prop="alipayNo"
              label="支付宝订单号"
              width="120"
          >
          </el-table-column>
          <el-table-column
              prop="orderName"
              label="订单信息"
              width="250"
          >
          </el-table-column>
          <el-table-column
              prop="total"
              label="总价"
              width="100"
          >
          </el-table-column>
          <el-table-column
              prop="gmtCreate"
              label="创建日期"
              width="140"
          >
          </el-table-column>

          <el-table-column
              label="订单状态">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status==='未支付'" type="primary" @click="payOrder(scope.row)">
                支 付
              </el-button>
              <el-button v-if="scope.row.status==='未支付'" type="danger" @click="removeOrder(scope.row)">
                取 消
              </el-button>
              <el-button type="text" disabled v-if="scope.row.status==='已支付'" style="color: black">支付已完成
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import requestUtil from "@/utils/request";
import qs from "qs";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "order",
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const {data: res} = await requestUtil.get('/eduservice/t-orders/' + this.$store.getters.getUserInfo.data.id)
      console.log(res);
      this.orders = res.data.orderList
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    },
    async payOrder(row) {
      const payForm = {
        subject: row.orderName,
        traceNo: row.orderId,
        totalAmount: row.total
      }
      await window.open('http://localhost:9001/eduservice/alipay/pay?' + qs.stringify(payForm))
      this.$message.success("支付宝请求成功")
      const {data:res} = await requestUtil.get('/eduservice/t-user/' + JSON.parse(sessionStorage.getItem("userInfo")).data.id)
      this.$store.commit("setUserInfo", res.data)
      location.reload()
    },
    async removeOrder(row) {
      const {data: res} = await requestUtil.delete1('/eduservice/t-orders/' + row.orderId)
      console.log(res)
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
      else
        location.reload()
    }
  },

  data() {
    return {
      studentId: "",
      orders: []
    }
  }
}
</script>

<style scoped>
.notification_container {
  position: relative;
  background-color: white;
  height: 100%;
  width: 100%;
}

</style>