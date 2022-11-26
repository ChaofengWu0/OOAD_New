<template>
  <div>
    <el-button type="text" @click="dialogFormVisibleForProblem = true">打开嵌套表单的 Dialog</el-button>

    <el-dialog title="布置习题" :visible.sync="dialogFormVisibleForProblem">

      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="'题目' + (index+1)"
            :key="index"
            :prop="'domains.' + index + '.value'"
            :rules="{required: true, message: '题目不能为空', trigger: 'blur'}">
          <el-input v-model="domain.value"></el-input>
          在A B C D中至少填入两个选项，并且选择一个作为此题目的答案

          <el-form-item prop="resource">
            <el-radio-group>
              <el-radio label="A" v-model="domain.answer" style="padding-bottom: 20px">
                A
                <el-input v-model="domain.option_A"></el-input>
              </el-radio>
              <el-radio label="B" v-model="domain.answer" style="padding-left: 50px;padding-bottom: 20px">
                B
                <el-input v-model="domain.option_B"></el-input>
              </el-radio>
              <el-radio label="C" v-model="domain.answer" style="padding-bottom: 10px">
                C
                <el-input v-model="domain.option_C"></el-input>
              </el-radio>
              <el-radio label="D" v-model="domain.answer" style="padding-left: 50px;padding-bottom: 10px">
                D
                <el-input v-model="domain.option_D"></el-input>
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-button @click.prevent="removeDomain(domain)">删除此题</el-button>
        </el-form-item>

        <el-form-item>
          <el-button @click="addDomain">再加一题</el-button>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {

  name: "anoTest",
  data() {
    return {
      dialogFormVisibleForProblem: false,
      dynamicValidateForm: {
        domains: [{
          value: '',
          option_A: '',
          option_B: '',
          option_C: '',
          option_D: '',
          answer: ''
        }],
      }
    }
  },
  methods: {
    initial_form() {
      this.dynamicValidateForm = {
        domains: [{
          value: '',
          option_A: '',
          option_B: '',
          option_C: '',
          option_D: '',
          answer: ''
        }],
      }
    },

    cancel() {
      this.dialogFormVisibleForProblem = false
      this.initial_form()
    },

    submit() {
      this.dialogFormVisibleForProblem = false
      // 提交给后端

      console.log(this.dynamicValidateForm)
      this.initial_form()
      console.log(this.dynamicValidateForm)
    },

    removeDomain(item) {
      let index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },

    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      });
    },
  }

}


</script>


<style scoped>

</style>

