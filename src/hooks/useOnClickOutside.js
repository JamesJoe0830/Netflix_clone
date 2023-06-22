import { useEffect } from "react";

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      console.log("ref", ref);
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      } else { 
        handler();
      }
      // ref.current가 없거나 ref.current.contains(event.target)이 들어있을때는 return
      // else 아니면 handler(); [modaa index.js에서 17번째 줄을 실행시킨]
    };
    document.addEventListener("mouseup", listener);
    //  mousedown이 일어났을때 listener를 콜해줌
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mouseup", listener);
      document.removeEventListener("touchstart", listener);
    };
    // unmount될때는 useEffect에서 return에서 다룬다.
    // unmount될떄 removeEventListner로 listener 없애줌 
  }, []);
};

// 모달 바깥을 클릭했을때 모달창 닫히게 하는 훅
export default useOnClickOutside;
