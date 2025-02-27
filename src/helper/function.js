// convert eng number to persian number

const formatDigits = (number)=> {
    return number.toLocaleString("fa-IR", {
        maximumFractionDigits: 2,
    })
}

const etp = (number) => {
  return number.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
};

const pte = (number) => {
    return number.toString().replace(/\d/g, (d) => "0123456789"[d]);
  };

export { etp, pte, formatDigits };
