const useSwipe = (el: any) => {
  let touchstartX = 0;
  let touchendX = 0;

  console.log(el);

  function checkDirection() {
    if (touchendX < touchstartX) alert("swiped left!");
    if (touchendX > touchstartX) alert("swiped right!");
  }

  el.addEventListener("touchstart", (e: any) => {
    touchstartX = e.changedTouches[0].screenX;
  });

  el.addEventListener("touchend", (e: any) => {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();
  });
};

export default useSwipe;
