//加载请求配置文件
import request from "../utils/request";
//设置请求配置
export const fetchData = (query) => {
  return request({
    url: "/ms/table/list",
    method: "post",
    data: query,
  });
};
