import tpl from './index.tpl';
import './index.scss';
import { tplReplace } from '../../libs/tools';

export default {
  name: 'iframe',
  tpl(url) {
    return tplReplace(tpl(), {
      url
    });
  }
}