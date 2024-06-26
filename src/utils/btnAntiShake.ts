import { App, DirectiveBinding } from 'vue'

export default (app: App<Element>) => {
  app.directive('btnAntiShake', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      let timer: any = null;
      el.addEventListener('click', () => {
        let firstClick: Boolean = !timer;

        if (firstClick) {
          binding.value();
        }
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          timer = null;
          if (!firstClick) {
            binding.value();
          }
        }, 1000);
      })
    }
  })
}
