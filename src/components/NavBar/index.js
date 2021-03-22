import indexTpl from './tpl/index.tpl';
import itemTpl from './tpl/item.tpl';
import { tplReplace, scrollToTop } from '../../libs/tools';
import './index.scss';

export default {
  name: 'NavBar',
  _curIdx: 0,
  tpl(data) {
    let itemList = "";
    data.map(({type, title}, idx) => {
      itemList += tplReplace(itemTpl(), {
        isCurrent: idx === 0? 'current' : '',
        type,
        title
      });
    })

    return tplReplace(indexTpl(), {
      itemList,
      wrapperW: .6 * data.length
    });
  },
  bindEvent(setType) {
    const oNavBar = document.querySelector('.nav'),
      oItem = document.querySelectorAll('.item');
    oNavBar.addEventListener('click', this._setNav.bind(this, oItem, setType));
  },
  _setNav(items, setType) {
    const tar = arguments[2].target,
      className = tar.className.trim();
    if (className === 'item') {
      const type = tar.dataset.type;
      setType(type);
      scrollToTop();
      items[this._curIdx].className = 'item';
      this._curIdx = [].indexOf.call(items, tar);
      items[this._curIdx].className = 'item current';
    }
  }
}