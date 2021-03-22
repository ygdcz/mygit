import './imports';
import Header from '../components/Header';
import { getUrlQueryValue } from '../libs/tools';
import Iframe from '../components/Iframe';
import Follow from '../components/follow';

;((doc) => {
  const oApp = doc.querySelector('div');
  const currentNews = JSON.parse(localStorage.getItem('currentNews'));
  const followList  = JSON.parse(localStorage.getItem('followList')) || [];
  
  const init = function() {
    render();
    bindEvent();
  };

  const render = function() {
    const headerTpl = Header.tpl({
      url: getUrlQueryValue('path'),
      title: '新闻详情',
      showLeftIcon: true,
      showRightIcon: false
    });

    const iframeTpl = Iframe.tpl(currentNews.url);
    const followTpl = createFollowTpl();
    oApp.innerHTML += (headerTpl + iframeTpl + followTpl);
  }

  function createFollowTpl() {
    const isExist = followList.find(item => item.uniquekey === currentNews.uniquekey);
    return isExist ? Follow.follow() : Follow.unFollow();
  }

  const bindEvent = function () {
    Follow.bindEvent(doFollow);
  }

  function doFollow (status) {
    let followList = JSON.parse(localStorage.getItem('followList') || '[]');
    if(status) {
      followList.push(currentNews);
    } else {
      followList = followList.filter(item => {
        return item.uniquekey !== currentNews.uniquekey});
    }

    localStorage.setItem('followList', JSON.stringify(followList));
  }

  init();
})(document);