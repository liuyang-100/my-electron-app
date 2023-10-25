const data: any = {
  componentName: 'checked-00101',
  groupName: '图文',
  filesName: [
    'allItems.json',
    'blogCollectionTemplate.json',
    'blogTemplate.json',
    'buyerActivateAccount.json',
    'buyerLogin.json',
    'buyerRegister.json',
    'buyerResetPassword.json',
    'cart.json',
    'categoryTemplate.json',
    'home.json',
    'itemCollectionList.json',
    'itemCollectionTemplate.json',
    'itemTemplate.json',
    'pageTemplate.json',
    'searchItem.json',
  ],
};

const setData = (type: any, newData: string | Array<string>) => {
  if (type && data[type]) {
    data[type] = newData;
  }
};

const getData = () => {
  return data;
};

export { setData, getData };
