const info = (...competitions) => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(...competitions);
    }
    
    
  }
  
  const greska = (...competitions) => {
    console.error(...competitions);
  }
  
  module.exports = {info, greska}