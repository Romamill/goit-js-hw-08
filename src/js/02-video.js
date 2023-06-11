
import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.querySelector('iframe');
  const player = new VimeoPlayer(iframe);
  const localStorageKey = 'videoplayer-current-time';
  let timeUpdateListener;

  const handleTimeUpdate = throttle(data => {
    const currentTime = data.seconds;
    localStorage.setItem(localStorageKey, currentTime.toString());
  }, 1000);

  const restorePlayback = () => {
    const savedTime = localStorage.getItem(localStorageKey);
    if (savedTime !== null) {
      const currentTime = parseFloat(savedTime);
      player.setCurrentTime(currentTime)
        .then(() => {
          player.off('timeupdate', timeUpdateListener);
          timeUpdateListener = player.on('timeupdate', handleTimeUpdate);
        })
        .catch(error => {
          console.error('Failed to set current time:', error);
        });
    } else {
      timeUpdateListener = player.on('timeupdate', handleTimeUpdate);
    }
  };

  restorePlayback();
});
