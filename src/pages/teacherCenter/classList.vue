<template>

  <div class="class_list_container">


    <div class="custom-tree-container">
      <h1>My courses</h1>

      <el-tree
          ref="tree"
          :data="course_data"
          :expand-on-click-node="false"
          :render-content="renderContent"
          default-expand-all
      >

      </el-tree>
    </div>
  </div>
</template>

<script>
let id = 1000;

export default {
  data() {
    // 返回的数据格式需要一致
    let data_content = [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }];
    return {
      course_data: JSON.parse(JSON.stringify(data_content)),
      data_content
    }
  },

  methods: {

    append(data) {
      const newChild = {id: id++, label: 'test', children: []};
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, {node, data}) {
      return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={() => this.append(data)}>Append</el-button>
              <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>Delete</el-button>
            </span>
          </span>);
    }
  }
};
</script>


<style scoped>
* {
  padding: 0;
  margin: 0;
  border: 0;
}


.class_list_container {
  background-color: white;
  height: 100%;
  width: 100%;
}


>>> .custom-tree-node {
  width: 100%;
}

>>> .el-tree-node__content {
  display: flex;
  align-items: center;
  height: 50px;
  cursor: pointer;
}


</style>