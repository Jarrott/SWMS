<template>
  <div class="qc-quill-editor">
    <QuillEditor
      ref="myQuillEditor"
      theme="snow"
      v-model:content="editContent"
      :options="editorOption"
      contentType="html"
      @focus="handleFocus"
      @blur="handleBlur"
      @update:content="handleChange"
    />
  </div>
</template>

<script>
import { uploadImport, uploadImg } from '@/service/apis/api';
import { QuillEditor, Quill } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ImageDrop } from 'quill-image-drop-module';
// import imageResize from 'quill-image-resize-module';
import 'quill-image-resize-module/image-resize.min.js';
import ImageUploader from 'quill-image-uploader';
import Compressor from 'compressorjs';

Quill.register('modules/ImageDrop', ImageDrop);
// Quill.register('modules/imageResize', imageResize);
Quill.register('modules/ImageUploader', ImageUploader);

// toolbar标题
const titleConfig = [
  { Choice: '.ql-insertMetric', title: '跳转配置' },
  { Choice: '.ql-bold', title: '加粗' },
  { Choice: '.ql-italic', title: '斜体' },
  { Choice: '.ql-underline', title: '下划线' },
  { Choice: '.ql-header', title: '段落格式' },
  { Choice: '.ql-strike', title: '删除线' },
  { Choice: '.ql-blockquote', title: '块引用' },
  { Choice: '.ql-code', title: '插入代码' },
  { Choice: '.ql-code-block', title: '插入代码段' },
  { Choice: '.ql-font', title: '字体' },
  { Choice: '.ql-size', title: '字体大小' },
  { Choice: '.ql-list[value="ordered"]', title: '编号列表' },
  { Choice: '.ql-list[value="bullet"]', title: '项目列表' },
  { Choice: '.ql-direction', title: '文本方向' },
  { Choice: '.ql-header[value="1"]', title: 'h1' },
  { Choice: '.ql-header[value="2"]', title: 'h2' },
  { Choice: '.ql-align', title: '对齐方式' },
  { Choice: '.ql-color', title: '字体颜色' },
  { Choice: '.ql-background', title: '背景颜色' },
  { Choice: '.ql-image', title: '图像' },
  { Choice: '.ql-video', title: '视频' },
  { Choice: '.ql-link', title: '添加链接' },
  { Choice: '.ql-formula', title: '插入公式' },
  { Choice: '.ql-clean', title: '清除字体格式' },
  { Choice: '.ql-script[value="sub"]', title: '下标' },
  { Choice: '.ql-script[value="super"]', title: '上标' },
  { Choice: '.ql-indent[value="-1"]', title: '向左缩进' },
  { Choice: '.ql-indent[value="+1"]', title: '向右缩进' },
  { Choice: '.ql-header .ql-picker-label', title: '标题大小' },
  { Choice: '.ql-header .ql-picker-item[data-value="1"]', title: '标题一' },
  { Choice: '.ql-header .ql-picker-item[data-value="2"]', title: '标题二' },
  { Choice: '.ql-header .ql-picker-item[data-value="3"]', title: '标题三' },
  { Choice: '.ql-header .ql-picker-item[data-value="4"]', title: '标题四' },
  { Choice: '.ql-header .ql-picker-item[data-value="5"]', title: '标题五' },
  { Choice: '.ql-header .ql-picker-item[data-value="6"]', title: '标题六' },
  { Choice: '.ql-header .ql-picker-item:last-child', title: '标准' },
  { Choice: '.ql-size .ql-picker-item[data-value="small"]', title: '小号' },
  { Choice: '.ql-size .ql-picker-item[data-value="large"]', title: '大号' },
  { Choice: '.ql-size .ql-picker-item[data-value="huge"]', title: '超大号' },
  { Choice: '.ql-size .ql-picker-item:nth-child(2)', title: '标准' },
  { Choice: '.ql-align .ql-picker-item:first-child', title: '居左对齐' },
  {
    Choice: '.ql-align .ql-picker-item[data-value="center"]',
    title: '居中对齐',
  },
  {
    Choice: '.ql-align .ql-picker-item[data-value="right"]',
    title: '居右对齐',
  },
  {
    Choice: '.ql-align .ql-picker-item[data-value="justify"]',
    title: '两端对齐',
  },
];

export default {
  name: 'QcQuillEditor',
  components: {
    QuillEditor,
  },
  props: {
    placeholderStr: {
      type: String,
      default: '请输入',
    },
  },
  data() {
    return {
      flag: false,
      editContent: '',
      editStr: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
            // ['blockquote', 'code-block'], //引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], //列表
            [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            // [{ direction: 'rtl' }], // 文本方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            // [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            // [{ font: [] }], //字体
            [{ align: [] }], //对齐方式
            // ['clean'], //清除字体样式
            ['image'], //上传图片、上传视频 ['image', 'video']
          ],
          ImageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white',
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar'],
          },
          ImageUploader: {
            upload: async (file) => {
              console.log('ff----0000----', file);
              if (file.size > 1024 * 10 * 1024) {
                ElMessage({
                  showClose: true,
                  message: '上传的图片不能大于10M',
                  type: 'warning',
                });
                ImageUploader.removeBase64Image();
                return '';
              }
              try {
                console.log('ff----111----', file);
                const blob = await this.compressImage(file); // 压缩图片
                //将blob格式转换为file格式
                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                });
                console.log('ff----222----', compressedFile);
                return new Promise((resolve, reject) => {
                  const formData = new FormData();
                  formData.append('file', compressedFile);
                  uploadImport(uploadImg, formData)
                    .then((res) => {
                      resolve(res);
                    })
                    .catch((err) => {
                      reject('Upload failed');
                      console.error('Error:', err);
                      ElMessage({
                        showClose: true,
                        message: '上传图片失败',
                        type: 'warning',
                      });
                    });
                });
              } catch (error) {
                console.error('压缩和上传图像时出错:', error);
                ElMessage({
                  showClose: true,
                  message: '压缩图片失败',
                  type: 'warning',
                });
              }
            },
          },
        },
        placeholder: this.placeholderStr,
      },
    };
  },
  mounted() {
    for (let item of titleConfig) {
      let tip = document.querySelector('.ql-toolbar ' + item.Choice);
      if (!tip) continue;
      tip.setAttribute('title', item.title);
    }
  },
  methods: {
    // 图片压缩
    compressImage(file) {
      return new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.6, // 设置压缩质量
          maxWidth: 400, // 设置图片最大宽度
          maxHeight: 400, // 设置图片最大高度
          success(result) {
            resolve(result);
          },
          error(error) {
            reject(error);
          },
        });
      });
    },
    handleFocus() {
      this.flag = true;
    },
    handleBlur() {
      if (this.flag) {
        console.log('html--22--', this.editContent, this.editStr);
        this.$emit('blur', this.editContent, this.editStr);
      }
    },
    handleChange(content) {
      this.editStr = this.getContent() || '';
      console.log('html-11---', this.editStr);
      if (!this.editStr) {
        this.editContent = '';
      } else {
        this.editContent = this.getHtml();
      }
    },
    setHTML(val) {
      this.editContent = val;
      this.$refs.myQuillEditor.setHTML(val);
      this.editStr = this.getContent();
    },
    getHtml() {
      return this.editContent;
    },
    getContent() {
      const text = this.$refs.myQuillEditor.getText().trim();
      const html = this.$refs.myQuillEditor.getHTML();
      if (!text && (!html || html === '<p><br></p>')) return '';
      return this.$refs.myQuillEditor.getHTML();
      // return this.$refs.myQuillEditor.getText().trim();
    },
  },
};
</script>

<style lang="scss">
.qc-quill-editor {
  .ql-toolbar.ql-snow {
    width: 600px;

    .ql-picker-label {
      display: flex;
      align-items: center;
    }
  }
  .ql-container.ql-snow {
    width: 600px;
    height: 300px;
  }
}
.is-error .qc-quill-editor {
  .ql-toolbar.ql-snow,
  .ql-container.ql-snow {
    border-color: var(--el-color-danger);
  }
}
</style>