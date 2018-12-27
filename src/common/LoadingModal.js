import { Modal } from 'antd';

const LoadingModal = (time, title, width, className) => {
  // console.log()
  const secondsToGo = time || 20;
  const modal = Modal.info({
    title: title || 'Submission in progress',
    iconType: 'loading',
    width: width || 240,
    className: className || 'rt-modal-loading',
  });
  // setInterval(() => {
  //   secondsToGo -= 1;
  //   modal.update({
  //     content: `This modal will be destroyed after ${secondsToGo} second.`,
  //   });
  // }, 1000);
  setTimeout(() => {
    modal.destroy();
  }, secondsToGo * 1000);
  return modal;
};

export default LoadingModal;
