export const formatNumber = (num) => {
    const absNum = Math.abs(num);
  
    if (absNum >= 1e3 && absNum < 1e6) {
      return (num / 1e3).toFixed(1) + "k";
    } else if (absNum >= 1e6 && absNum < 1e9) {
      return (num / 1e6).toFixed(1) + "M";
    } else if (absNum >= 1e9 && absNum < 1e12) {
      return (num / 1e9).toFixed(1) + "B";
    } else if (absNum >= 1e12) {
      return (num / 1e12).toFixed(1) + "T";
    }
  
    return num.toString();
  };
  