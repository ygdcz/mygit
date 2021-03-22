import './imports';
import {IndexModel} from '../model/index';
import Header from "../components/Header/index";
import { NEWS_TYPE } from '../data';
import NavBar from "../components/NavBar";
import NewsList from '../components/NewsList';
import PageLoading from '../components/pageLoading';
import { scrollToBottom } from "../libs/tools";
import MoreReading from "../components/MoreLoading";
import MoreLoading from '../components/MoreLoading';

((doc) => {
  const oApp = doc.querySelector('#app');
  let oWrapperList = null;
  let t = null;

  const config = {
    type: 'top',
    count: 10,
    pageNum: 0,
    isLoading: false
  };

  const newsData = {};

  const init = async () => {
    render();
    await setNewsList();
    bindEvent();
  };

  const render = () => {
    const headTpl = Header.tpl({
      url: '/',
      title: '新闻头条',
      showLeftIcon: false,
      showRightIcon: true
    });
    const navTpl = NavBar.tpl(NEWS_TYPE);
    const listWrapperTpl = NewsList.WrapperTpl(80);

    oApp.innerHTML += (headTpl + navTpl + listWrapperTpl);
    oWrapperList = document.querySelector('.news-list');
  };

  function renderList (data) {
    const page = config.pageNum;
    const newsListTpl = NewsList.tpl({
      data,
      page
    });
    MoreLoading.remove(oWrapperList);
    oWrapperList.innerHTML += newsListTpl;
    config.isLoading = false;
  }

  const bindEvent = () => {
    window.addEventListener("scroll", scrollToBottom.bind(null, getMoreList), false);
    NavBar.bindEvent(setType);
    NewsList.bindEvent(oWrapperList, setCurrentNews);
  }

  function setType (type) {
    config.type = type;
    config.pageNum = 0;
    oWrapperList.innerHTML = "";
    setNewsList();
  }

  async function setNewsList() {
    const {type, count, pageNum } = config;

    if(newsData[type]){
      renderList(newsData[type][pageNum]);
      return;
    }

    newsData[type] = await new IndexModel().getNewsList(type, count);
    oWrapperList.innerHTML = PageLoading.tpl();
    setTimeout(() => {
      oWrapperList.innerHTML = "";
      renderList(newsData[type][pageNum]);
    }, 500);
    NewsList.imgShow();
  }

  function getMoreList() {
    // 初始化为false
    if(!config.isLoading) {
      config.pageNum++;
      clearTimeout(t);
      const { pageNum, type } = config;
      if (pageNum >= newsData[type].length) {
        MoreReading.add(oWrapperList, false);
      } else {
        config.isLoading = true;
        MoreReading.add(oWrapperList, true);
        t = setTimeout(() => {
          setNewsList();
        }, 1000);
      }
    }
  }

  function setCurrentNews(options) {
    const {page, idx} = options;
    const currentNews = newsData[config.type][page][idx];
    localStorage.setItem('currentNews', JSON.stringify(currentNews));
  }

  init();
})(document);