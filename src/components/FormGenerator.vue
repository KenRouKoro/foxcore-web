<template>
  <div>
    <template v-if="ann && ann['CLASS_ANN']" >{{ann['CLASS_ANN']}}</template>
    <template v-for="(value, key ,index) in data" :key="index">
      <div :style="{ marginLeft: (indentLevel * 2) - 2 + 'rem' }" style="margin-top: 0.5rem;">

        <template v-if="isObject(value)">
          <h3>{{ key }}: </h3>

        </template>
        <template v-else-if="Array.isArray(value)">
          <h4 style="margin-bottom: 0.2rem">{{ key }}: </h4>
          <template v-if="ann && ann[key]">{{ann[key]}}</template>
        </template>
        <template v-else>
          <label style="margin-bottom: 0.5rem;font-weight: bold;">{{ key }}: </label>
          <template v-if="ann && ann[key]"><br> {{ann[key]}}</template>
        </template>

        <template v-if="isPrimitive(value)">
          <n-input
              v-if="typeof value === 'number' || typeof value === 'string'"
              :value="value"
              @input="updateValue(key, $event)"
              style="width: 100%"
              type="textarea"
              autosize
          />
          <template v-if="typeof value === 'boolean'">
            <n-space>
            <n-radio
                :name="key"
                :checked="value"
                @change="updateValue(key, true)"
            />
            <label>true</label>
            <n-radio
                :name="key"
                :checked="!value"
                @change="updateValue(key, false)"
            />
            <label>false</label>
            </n-space>
          </template>
        </template>
        <template v-else-if="isObject(value)">
          <form-generator :data="value" :ann="ann && ann[key] && ann[key]" :indentLevel="indentLevel "  style="margin-top: 0.2rem;border-left: 2px solid #ccc;"/>
        </template>
        <template v-else-if="Array.isArray(value)">
          <n-space style="margin-top: 0.5rem">
            <n-button strong secondary type="error" @click="removeArrayItem(key)"> 减少  </n-button>
            <n-button strong secondary type="success" @click="addArrayItem(key)"> 增加 </n-button>
          </n-space>
          <TransitionGroup name="list">
            <div v-for="(item, index) in value" :key="index">
              <template v-if="isObject(item)">
                <form-generator :data="item" :ann="ann && ann[key] && ann[key]" />
                <n-divider></n-divider>
              </template>
              <template v-else>
                <n-input
                    v-if="typeof item === 'number' || typeof item === 'string'"
                    :value="item"
                    @input="updateArrayValue(key, index, $event)"
                    style="margin-top: 0.5rem;width: 100%"
                    type="textarea"
                    autosize
                />
                <template v-if="typeof item === 'boolean'">
                  <n-space>
                    <n-radio
                        :name="`${key}-${index}`"
                        :checked="item"
                        @change="updateArrayValue(key, index, true)"
                    />
                    <label>true</label>
                    <n-radio
                        :name="`${key}-${index}`"
                        :checked="!item"
                        @change="updateArrayValue(key, index, false)"
                    />
                    <label>false</label>
                  </n-space>
                </template>
              </template>
            </div>
          </TransitionGroup>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
    ann:{
      type: Object as PropType<Record<string, any>>,
      required: false,
    },
    indentLevel: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const isPrimitive = (value: any) =>
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'

    const isObject = (value: any) => typeof value === 'object' && !Array.isArray(value)

    const updateValue = (key: string, newValue: any) => {
      props.data[key] = newValue
    }

    const updateArrayValue = (key: string, index: number, newValue: any) => {
      props.data[key][index] = newValue
    }
    const addArrayItem = (key: string) => {
      const array = props.data[key];
      if (array.length > 0) {
        if (typeof array[0] === 'object'){
          array.push({ ...array[array.length - 1] });
          return
        }
        const newItem = typeof array[0] === 'boolean' ? false : '';
        array.push(newItem);
      } else {
        array.push('');
      }
    };

    const removeArrayItem = (key: string) => {
      const array = props.data[key];
      if (array.length > 1) {
        array.pop();
      }
    };
    return { isPrimitive, isObject, updateValue, updateArrayValue,addArrayItem,removeArrayItem }
  },
})
</script>
<style>
h3{
  margin-bottom: 5px;
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
