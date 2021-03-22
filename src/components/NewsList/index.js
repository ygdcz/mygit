import tpl0 from './tpl/tpl0.tpl';
import tpl1 from './tpl/tpl1.tpl';
import tpl2 from './tpl/tpl2.tpl';
import tpl3 from './tpl/tpl3.tpl';
import wrapperTpl from './tpl/wrapper.tpl';
import './index.scss';
import { tplReplace,getItemNode } from '../../libs/tools';

export default {
  name: 'newsList',
  WrapperTpl (top) { // css top: xx
    return tplReplace(wrapperTpl(), {
      top
    })
  },
  tpl(opt) {
    const {data, page} = opt;
    let list = "";
    let tpl = "";
    data.map((item, index) => {
      if (!item.thumbnail_pic_s)
        tpl = tpl0;
      else if (item.thumbnail_pic_s && !item.thumbnail_pic_s02)
        tpl = tpl1;
      else if (item.thumbnail_pic_s02 && ! item.thumbnail_pic_s03)
        tpl = tpl2;
      else if (item.thumbnail_pic_s03)
        tpl = tpl3;

      list += tplReplace(tpl(), {
        pageNum: page,
        index,
        title: item.title,
        thumbnail_pic_s: item.thumbnail_pic_s,
        thumbnail_pic_s02: item.thumbnail_pic_s02,
        thumbnail_pic_s03: item.thumbnail_pic_s03,
        uniquekey: item.uniquekey,
        category: item.category,
        date: item.date,
        author: item.author_name
      });
    });

    return list;
  },
  imgShow() {
    const oImgs= document.querySelectorAll('img');
    [...oImgs].map((img) => {
      img.onload = () => {
        img.style.opacity = '1';
      }
    })
  },
  bindEvent(oList, setCurrentNews) {
    oList.addEventListener("click", this._goToDetail.bind(this, setCurrentNews), false);
  },
  _goToDetail(setCurrentNews) {
    const tar = arguments[1].target,
      node = getItemNode(tar);
    const options = {
      page: node.dataset.page,
      idx: node.dataset.index
    };
    window.location.href = `detail.html?path=${location.pathname}`;
    setCurrentNews(options);
  }
}