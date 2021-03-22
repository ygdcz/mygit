import { HTTP } from "../libs/http";
import { setPageData } from "../libs/tools";

class IndexModel extends HTTP {
  getNewsList(type, count) {
    return new Promise((resolve, reject) => {
      this.ajax({
        url: 'Juhe/getNewsList',
        type: 'POST',
        dataType: 'JSON',
        data: {
          field: type
        },
        success (data) {
          resolve(setPageData(data.result.data, count));
        },
        error (e) {
          reject(e);
        }
      })
    });
  }
}

export {
  IndexModel
}