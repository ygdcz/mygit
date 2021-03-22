import Header from '../components/Header';
import NewsList from '../components/NewsList';
import NoDataTip from '../components/NoDataTip';
import './imports';

;((doc) => {
  const oApp = doc.querySelector('#app');
  const followList = JSON.parse(localStorage.getItem('followList'));
  let oListWrapper = null;
  let listWrapperTpl = null;

  function init() {
    render();
    bindEvent();
  }

  function render() {
    const headerTpl = Header.tpl({
      url: '/',
      title: '我的新闻',
      showLeftIcon: true,
      showRightIcon: false
    });

    if(followList.length) {
      listWrapperTpl = NewsList.WrapperTpl(44);
      oApp.innerHTML += (headerTpl + listWrapperTpl);
      oListWrapper = doc.querySelector('.news-list');
      renderList(followList);
    } else {
      listWrapperTpl = NoDataTip.tpl('还没有收藏新闻');
      oApp.innerHTML += (headerTpl + listWrapperTpl);
    }
  }

  function bindEvent() {
    followList && NewsList.bindEvent(oListWrapper, setCurrentNews);
  }

  function setCurrentNews(options) {
    const { idx } = options;
    const currentNews = followList[idx];
    localStorage.setItem('currentNews', JSON.stringify(currentNews));
  }

  function renderList(data) {
    const newsListTpl = NewsList.tpl({
      data,
      page: -1
    });
    oListWrapper.innerHTML += newsListTpl;
    NewsList.imgShow();
  }

  init();
})(document);