
export const typesAsociateCamunda = (type : string) : string => {
  switch (type){
    case 'checkbox':
      return 'Boolean'
    case 'number':
      return 'Double'
    case 'uploadFile':
    case 'viewerFile':
      return 'File'
    case 'dynamicSection':
      return 'Json'
    default :
      return 'String'
  }
};
