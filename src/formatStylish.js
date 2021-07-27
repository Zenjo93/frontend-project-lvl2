export const formatStylish = (diffTree) => {
  // console.log('diffTree: ' + diffTree);

  let diff = '{ \n';

  diffTree.forEach(el => {
    
    if (el['status'] === 'removed') {
      diff = diff.concat(` - ${el['name']}: ${el['value']}\n`);
    
      
    }
    else if (el['status'] === 'added') {
      diff =  diff.concat(` + ${el['name']}: ${el['value']}\n`)
    }

    else if(el['status'] === 'changed') {
      diff = diff.concat(` - ${el['name']}: ${el['value'][0]}\n`)
      diff = diff.concat(` + ${el['name']}: ${el['value'][1]}\n`)
    }

    else {
      diff = diff.concat(` ${el['name']}: ${el['value']}\n`);
    }

    if (el['value'] === 'nested') {
      diff =  diff.concat(`${el['name']}: ${formatStylish(el['children'])}\n`)
    }

  })
  
return diff;

}

/*
{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
      setting6: {
          doge: {
            - wow: 
            + wow: so much
          }
          key: value
        + ops: vops
      }
  }

  */