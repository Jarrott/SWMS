export const defSize = ref(1048576); // 1048576字节等于1M
export const types: any = reactive({
  img: {
    jpg: 'ffd8ffe0',
    jpg1: 'ffd8ffe1',
    jpeg: 'ffd8ffe0',
    png: '89504e47',
  },
  img1: {
    jpg: 'ffd8ffe0',
    jpg1: 'ffd8ffe1',
    jpeg: 'ffd8ffe0',
    png: '89504e47',
    gif: '47494638',
  },
  xlsx: {
    xlsx: 'd0cf11e0', // 微软创建xlsx,docx 504b0304
    xls: 'd0cf11e0',
    wrxlsx: '504b0304',
  },
  files: {
    pdf: '25504446',
    doc: '3c3f786d', // wr d0cf11e0
    docx: '504b0304',
    xlsx: 'd0cf11e0',
    xls: 'd0cf11e0', // wr d0cf11e0
  },
  pdf: {
    pdf: '25504446',
    wrpdf: '504b0304',
  },
});

//处理文件二进制数据
export const getFileType = (file: any, type: string) => {
  // 截取上传文件名尾缀
  const lastIndex = file.name.lastIndexOf('.');
  const endName = file.name.substring(lastIndex + 1);
  const reader: any = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      try {
        let buffer: any = [...new Uint8Array(reader.result)];
        // 保留文件的前四位并转为16进制
        buffer = buffer
          .splice(0, 4)
          .map((item: any) => item.toString(16).padStart(2, '0'));
        // 根据16进制对比选择文件是否存在
        const include = Object.values(types[type]).includes(buffer.join(''));
        // 文件尾缀
        const includeName = Object.keys(types[type]).includes(endName);
        console.log(
          'buffer--1',
          buffer.join(''),
          'include',
          include,
          includeName
        );
        resolve(include && includeName);
      } catch (e) {
        // 读取文件头出错 默认不是合法文件类型
        reject();
      }
    };
  });
};
