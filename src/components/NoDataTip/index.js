import tpl from './index.tpl';
import './index.scss';
import { tplReplace } from '../../libs/tools';

export default {
  name: 'noDataTip',
  tpl(text) {
    return tplReplace(tpl(), {
      text
    });
  }
}