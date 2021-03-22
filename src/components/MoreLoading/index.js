import tpl from './index.tpl';
import './index.scss';
import { tplReplace } from '../../libs/tools';

export default {
  name: 'moreLoading',
  _tpl(isLoading) {
    return tplReplace(tpl(), {
      isLoading : isLoading ? "loading" : "",
      text: isLoading ? "正在加载中请稍后" : "没有更多内容了"
    });
  },
  remove(oList) {
    const oMoreReading = oList.querySelector(".more-loading");
    oMoreReading && oMoreReading.remove();
  },
  add(oList, isLoading) {
    const oMoreReading = oList.querySelector(".more-loading");
    if (!oMoreReading) {
      oList.innerHTML += this._tpl(isLoading);
    }
  }
}