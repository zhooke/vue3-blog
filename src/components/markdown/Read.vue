<template>
  <div class="markdown">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章</el-breadcrumb-item>
    </el-breadcrumb>
    <mavon-editor :toolbars="markdownOption" v-model="handbook" :html="false" codeStyle="foundation" :editable="false" defaultOpen="preview" :subfield="false" style="width: 100%" >
    </mavon-editor>
  </div>
</template>

<script>
export default {
  name: 'ReadContext',
  data() {
    return {
      markdownOption: {
        fullscreen: true, // 全屏编辑
        navigation: true // 导航目录
      },
      handbook: '# 常用MySQL总结\n' +
        '\n' +
        '## 1.查询表\n' +
        '\n' +
        '```sql\n' +
        'select * from tablename;\n' +
        '```\n' +
        '\n' +
        '## 2.修改表\n' +
        '\n' +
        '添加列\n' +
        '\n' +
        '```sql\n' +
        'alter table tablename add col char(20);\n' +
        '```\n' +
        '\n' +
        '删除列\n' +
        '\n' +
        '```sql\n' +
        'alter table tablename drop column col;\n' +
        '```\n' +
        '\n' +
        '删除表\n' +
        '\n' +
        '```sql\n' +
        'drop table tablename;\n' +
        '```\n' +
        '\n' +
        '## 3.插入\n' +
        '\n' +
        '普通插入\n' +
        '\n' +
        '```sql\n' +
        'insert into tablename(col1,col2) value (val1,val2);\n' +
        '```\n' +
        '\n' +
        '插入查询结果\n' +
        '\n' +
        '```sql\n' +
        'insert into tablename (col1,col2) select col1,col2 from tablename;\n' +
        '```\n' +
        '\n' +
        '## 4.更新\n' +
        '\n' +
        '```sql\n' +
        'update tablename set col=val where id = 1;\n' +
        '```\n' +
        '\n' +
        '## 5.删除\n' +
        '\n' +
        '```sql\n' +
        'delete from tablename where id=1;'
    };
  },
  methods: {
    save(){
      console.log('save')
    },
    imgAdd(pos, $file){

    },
    imgDel(){

    }
  }
}
</script>

<style scoped>
.markdown {
  width: 100%;
  height: 100%;
}
</style>
