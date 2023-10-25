const fs = require('fs');
const { join } = require('path');

// prototype工程路径
const compontentPath = process.argv[5];
// '/Users/liuyang/Documents/web/sa-fe-c-theme-prototype';
// 添加的新组件名称
const componentName = process.argv[2];
// 在分类中的位置
const groupName = process.argv[3];
// ['announce.json','buyerPay.json','footer.json','globalSetting.json','header.json',] 部分不需要全局组件的落地页
// 正常情况下所有的需要全局组件的落地页
const filesName = process.argv[4];
const folderPath = join(compontentPath, 'decorate/themes');

const readFileFn = (path, setData) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let newData = JSON.parse(data);
    if (setData) {
      newData = setData(newData);
    }

    fs.writeFile(path, JSON.stringify(newData), 'utf8', (err) => {
      if (err) throw err;
      console.log('文件已更新！');
    });
  });
};

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  files.forEach((item) => {
    const filePath = join(folderPath, item);

    const componentsConfigPath = join(filePath, 'componentsConfig.json');
    const groupsPath = join(filePath, 'groups.json');
    const pagePath = join(filePath, 'pages');

    readFileFn(componentsConfigPath, (data) => {
      if (!data?.includes(componentName)) {
        data.push(componentName);
      }
      return data;
    });

    if (groupName) {
      readFileFn(groupsPath, (data) => {
        data?.forEach((item) => {
          if (item.label === groupName) {
            if (!item.items?.includes(componentName)) {
              item.items.push(componentName);
            }
          }
        });
        return data;
      });
    }

    fs.readdir(pagePath, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }
      files.forEach((item) => {
        if (filesName.includes(item)) {
          const filesPath = join(pagePath, item);
          readFileFn(filesPath, (data) => {
            if (!data.includes(componentName)) {
              data.push(componentName);
            }
            return data;
          });
        }
      });
    });
  });
});
