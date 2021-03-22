import tpl from './index.tpl';
import './index.scss';
import { tplReplace } from '../../libs/tools';

export default {
  name: 'follow',
  follow() {
    return tplReplace(tpl(), {
      star: 'star'
    });
  },
  unFollow() {
    return tplReplace(tpl(), {
      star: 'star-o'
    });
  },
  bindEvent(doFollow) {
    const oFollow = document.querySelector('.follow');
    oFollow.addEventListener('click', this._setFollow.bind(this, oFollow, doFollow), false);
  },
  _setFollow(oFollow, doFollow) { // doFollow操作localstorage，组件只负责操作自身的功能，该函数应该在页面上初始化,在组件调用
    const className = oFollow.className;
    oFollow.className = 'follow iconfont icon-';

    switch(className) {
      case 'follow iconfont icon-star':
        oFollow.className += 'star-o';
        doFollow(false);
        break;
      case 'follow iconfont icon-star-o':
        oFollow.className += 'star';
        doFollow(true);
        break;
      default:
        break;
    }



  }
}