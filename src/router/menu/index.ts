const utilFuns: any = {};
const files: any = import.meta.globEager('./*.ts');
Object.keys(files).forEach((fileName) => {
  const name = fileName.replace(/\.\/|\.ts/g, '');
  utilFuns[name] = files[fileName][name];
});
export default utilFuns;
