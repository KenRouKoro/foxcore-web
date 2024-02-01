<template>
  <div class="config-editor-around">
    <div class="config-editor">
      <div class="editor-header">
        <h3 style="margin-bottom: 10px">{{props.data.name}}</h3>
        <div class="annotation" v-html="marked.parse(props.data.annotation)">
        </div>
      </div>

      <div v-if="props.data.type==='object'" class="config-editor-item">
        <form-generator v-model:data="props.data.data" :ann="props.data.object_annotation"/>
      </div>

      <div v-if="props.data.type==='bool'" class="config-editor-item">
        <n-switch v-model:value="props.data.data" />
      </div>

      <div v-if="props.data.type==='number'" class="config-editor-item">
        <n-input-number v-model:value="props.data.data" clearable :precision="0" />
      </div>
      <div v-if="props.data.type==='string'" class="config-editor-item">
        <n-input
            v-model:value="props.data.data"
            type="textarea"
            placeholder="字符串"
            autosize
        />
      </div>
      <div v-if="props.data.type==='decimals'" class="config-editor-item">
        <n-input-number v-model:value="props.data.data" />
      </div>
      <div v-if="props.data.type==='stringarray'" class="config-editor-item">
        <div class="add-remove-div">
          <n-button style="margin-right: 20px" type="error" @click="removeArrayItem()">
            减少
          </n-button>
          <n-button type="success" @click="props.data.data.push('')">
            增加
          </n-button>
        </div>
        <TransitionGroup name="list">
          <div v-for="(line,index) in props.data.data" class="item-margin" :key="index">
            <n-input
                v-model:value="props.data.data[index]"
                placeholder="字符串"
                type="textarea"
                autosize
            />
          </div>
        </TransitionGroup>
      </div>
      <div v-if="props.data.type==='numberarray'" class="config-editor-item">
        <div class="add-remove-div">
          <n-button style="margin-right: 20px" type="error" @click="removeArrayItem()">
            减少
          </n-button>
          <n-button type="success" @click="props.data.data.push(0)">
            增加
          </n-button>
        </div>
        <TransitionGroup name="list">
          <div v-for="(line,index) in props.data.data" class="item-margin" :key="index">
            <n-input-number v-model:value="props.data.data[index]" clearable :precision="0" />
          </div>
        </TransitionGroup>
      </div>
      <div v-if="props.data.type==='decimalsarray'" class="config-editor-item">
        <div class="add-remove-div">
          <n-button style="margin-right: 20px" type="error" @click="removeArrayItem()">
            减少
          </n-button>
          <n-button type="success" @click="props.data.data.push(0)">
            增加
          </n-button>
        </div>
        <TransitionGroup name="list">
          <div v-for="(line,index) in props.data.data" class="item-margin" :key="index">
            <n-input-number v-model:value="props.data.data[index]" />
          </div>
        </TransitionGroup>
      </div>


      <div class="save-btn">
        <n-button type="primary" @click="save()">
          保存
        </n-button>
      </div>
    </div>
  </div>



</template>

<script setup>
import { defineProps ,ref} from 'vue'
import {marked} from "marked";
import FormGenerator from "./FormGenerator.vue";
import {saveData} from "../api/api.js";
import { useMessage } from 'naive-ui'

const message = useMessage()

const props = defineProps({
  fieldID:String,
  configID:String,
  data:Object
})

const removeArrayItem = () => {
  if (props.data.data.length > 0) {
    props.data.data.pop();
  }
};

const save = () => {
  saveData(props.configID,props.data.id,props.data.data).then(
      res=>{
        if (res.data.status==="ok"){
          message.success("保存成功")
        }
      }
  )
}

</script>

<style scoped>
.save-btn{
  margin-left: 20px;
}
.item-margin{
  margin-top: 10px;
}
.config-editor{
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: nowrap;
  min-height: 60px;

}
.config-editor-item{
  width: 100%;
  min-width: 200px;
}
.add-remove-div{
  text-align: left;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.editor-header{
  text-align: left;
  max-width: 300px;
  min-width: 200px;
  margin-right: 20px;
}
.annotation{
  text-align: left;
  overflow: auto;
  max-width: 300px;
}
.config-editor-around{
  width: 100%;
  min-height: 60px;
}
h3{
  margin-top: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>