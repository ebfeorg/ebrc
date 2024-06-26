import cls from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Close from './icons/close';
import Refresh from './icons/refresh';
import Slider from './icons/slider';
import style from './style.module.less';

type IEvent = React.TouchEvent | React.MouseEvent | MouseEvent | TouchEvent;

interface ICurrentCaptchaConfig {
  startSlidingTime: Date;
  endSlidingTime: Date;
  trackList: any[];
  movePercent: number;
  bgImageWidth: number;
  bgImageHeight: number;
  sliderImageWidth: number;
  sliderImageHeight: number;
  end: number;
  startX: number;
  startY: number;
  moveX: number;
}
export interface SliderVerifyProps {
  className?: string;
  onClose?: () => void;
  onSuccess?: (result: { matching: boolean; smsSendKey: string }) => void;
  onFail?: () => void;
  getVerifyCode: () => Promise<{
    id: string;
    captcha: {
      backgroundImage: string;
      sliderImage: string;
      backgroundImageWidth: number;
      backgroundImageHeight: number;
      sliderImageWidth: number;
      sliderImageHeight: number;
    };
  }>;
  checkVerifyCode: (
    params?: Partial<ICurrentCaptchaConfig> & { id: string },
  ) => Promise<{
    matching: boolean;
    smsSendKey: string;
  }>;
}

const getPagePos = (event: IEvent) => {
  if ('pageX' in event) {
    return {
      x: event.pageX,
      y: event.pageY,
    };
  }

  if ('touches' in event) {
    const touch = event.touches[0] || event.changedTouches[0];
    return {
      x: touch.pageX,
      y: touch.pageY,
    };
  }

  return {
    x: 0,
    y: 0,
  };
};

const getEventShim = () => {
  const ua = navigator.userAgent.toLowerCase();
  const isSupportTouch = /mobile|android|iphone|ipad|ipod|phone/.test(ua);
  return isSupportTouch
    ? {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend',
      }
    : {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup',
      };
};

export default function SliderVerify(props: SliderVerifyProps) {
  const id = useRef('');
  const [bgImg, setBgImg] = useState('');
  const [verifyImg, setVerifyImg] = useState('');
  const currentCaptchaConfig = useRef<ICurrentCaptchaConfig>({
    startSlidingTime: new Date(),
    endSlidingTime: new Date(),
    trackList: [],
    movePercent: 0,
    bgImageWidth: 0,
    bgImageHeight: 0,
    sliderImageWidth: 0,
    sliderImageHeight: 0,
    end: 0,
    startX: 0,
    startY: 0,
    moveX: 0,
  });

  const sliderMoveBtn = useRef<HTMLDivElement>(null);
  const sliderImgDiv = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);

  const reset = (
    bgImageWidth = 0,
    bgImageHeight = 0,
    sliderImageWidth = 0,
    sliderImageHeight = 0,
    end = 206,
  ) => {
    if (sliderMoveBtn.current) {
      sliderMoveBtn.current.style.transform = 'translate(0px, 0px)';
    }

    if (sliderImgDiv.current) {
      sliderImgDiv.current.style.transform = 'translate(0px, 0px)';
    }

    currentCaptchaConfig.current = {
      startSlidingTime: new Date(),
      endSlidingTime: new Date(),
      trackList: [],
      movePercent: 0,
      bgImageWidth,
      bgImageHeight,
      sliderImageWidth,
      sliderImageHeight,
      end,
      startX: 0,
      startY: 0,
      moveX: 0,
    };
  };

  const fetchVerify = useCallback(async () => {
    const data = await props.getVerifyCode();
    id.current = data.id;
    const captcha = data.captcha;
    setBgImg(captcha.backgroundImage);
    setVerifyImg(captcha.sliderImage);
    reset(
      captcha.backgroundImageWidth,
      captcha.backgroundImageHeight,
      captcha.sliderImageWidth,
      captcha.sliderImageHeight,
    );
  }, [props.getVerifyCode]);

  const validate = async () => {
    const result = await props.checkVerifyCode({
      id: id.current,
      ...currentCaptchaConfig.current,
    });
    if (result.matching) {
      reset();
      props.onSuccess?.(result);
    } else {
      fetchVerify();
      props.onFail?.();
    }
  };

  const move = (event: IEvent) => {
    const { x: pageX, y: pageY } = getPagePos(event);
    const { startX, startY, startSlidingTime, end, bgImageWidth, trackList } =
      currentCaptchaConfig.current;

    const track = {
      x: pageX - startX,
      y: pageY - startY,
      type: 'move',
      t: new Date().getTime() - startSlidingTime.getTime(),
    };

    trackList.push(track);

    let moveX = pageX - startX;
    if (moveX < 0) {
      moveX = 0;
    } else if (moveX > end) {
      moveX = end;
    }

    currentCaptchaConfig.current.moveX = moveX;
    currentCaptchaConfig.current.movePercent = moveX / bgImageWidth;

    if (sliderMoveBtn.current) {
      sliderMoveBtn.current.style.transform = 'translate(' + moveX + 'px, 0px)';
    }
    if (sliderImgDiv.current) {
      sliderImgDiv.current.style.transform = 'translate(' + moveX + 'px, 0px)';
    }
  };

  const up = (event: IEvent) => {
    document.removeEventListener(getEventShim().move, move as any);
    document.removeEventListener(getEventShim().end, up as any);

    currentCaptchaConfig.current.endSlidingTime = new Date();
    const { x: pageX, y: pageY } = getPagePos(event);
    const { startX, startY, startSlidingTime, trackList } =
      currentCaptchaConfig.current;
    const track = {
      x: pageX - startX,
      y: pageY - startY,
      type: 'up',
      t: new Date().getTime() - startSlidingTime.getTime(),
    };

    trackList.push(track);

    currentCaptchaConfig.current.bgImageWidth =
      bgImgRef.current?.clientWidth ?? 0;
    currentCaptchaConfig.current.bgImageHeight =
      bgImgRef.current?.clientHeight ?? 0;

    validate();
  };

  const handleMouseDown = (event: IEvent) => {
    const { x: startX, y: startY } = getPagePos(event);

    currentCaptchaConfig.current.startX = startX;
    currentCaptchaConfig.current.startY = startY;
    const { startSlidingTime, trackList } = currentCaptchaConfig.current;

    const pageX = currentCaptchaConfig.current.startX;
    const pageY = currentCaptchaConfig.current.startY;

    trackList.push({
      x: pageX - startX,
      y: pageY - startY,
      type: 'down',
      t: new Date().getTime() - startSlidingTime.getTime(),
    });

    document.addEventListener(getEventShim().move, move as any, {
      passive: false,
    });
    document.addEventListener(getEventShim().end, up as any, {
      passive: false,
    });
  };

  useEffect(() => {
    fetchVerify();

    return () => {
      document.removeEventListener(getEventShim().move, move as any);
      document.removeEventListener(getEventShim().end, up as any);
    };
  }, [fetchVerify]);

  return (
    <div className={cls(style.slider, props.className)}>
      <div className={style['content']}>
        <div className={style['bg-img-div']}>
          <img id="bg-img" src={bgImg} ref={bgImgRef} />
        </div>
        <div className={style['slider-img-div']} ref={sliderImgDiv}>
          <img id="slider-img" src={verifyImg} />
        </div>
      </div>
      <div className={style['slider-move']}>
        <div className={style['slider-move-track']}>拖动滑块完成拼图</div>
        <div
          ref={sliderMoveBtn}
          className={style['slider-move-btn']}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className={style['slider-move-btn-img']}>
            <Slider />
          </div>
        </div>
      </div>
      <div className={style['bottom']}>
        <div className={style['refresh-btn']} onClick={fetchVerify}>
          <Refresh />
        </div>
        <div className={style['close-btn']} onClick={props.onClose}>
          <Close />
        </div>
      </div>
    </div>
  );
}
