import throttle from 'lodash.throttle';

export const useProdHL = (func: Function) => {
  
  // ====== product ======
  let throt_fun = throttle(async () => {
    await func();
  }, 1000);
  
  const handleScrollAction = async () => {
    const scrollTop = window.scrollY || window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
  
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      throt_fun();
    }
  };
  
  onMounted(async() => {
    nextTick(() => {
        window.addEventListener('scroll', handleScrollAction);
    });
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScrollAction);
  });

  return {
    handleScrollAction,
  }
}