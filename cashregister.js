function checkCashRegister(price, cash, cid) {
  const currencyUnits = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
  ];

  const totalInDrawer = cid.reduce((total, [, amount]) => total + amount, 0).toFixed(2);

  let changeDue = (cash - price).toFixed(2);

  if (Number(totalInDrawer) < Number(changeDue)) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (Number(totalInDrawer) === Number(changeDue)) {
    return { status: "CLOSED", change: cid };
  }

  let change = [];

  for (let i = currencyUnits.length - 1; i >= 0; i--) {
    const [unit, value] = currencyUnits[i];
    const availableAmount = cid[i][1];
    const maxUnitCount = Math.floor(availableAmount / value);
    const requiredUnits = Math.min(maxUnitCount, Math.floor(changeDue / value));

    if (requiredUnits > 0) {
      const requiredAmount = (requiredUnits * value).toFixed(2);
      change.push([unit, parseFloat(requiredAmount)]);
      changeDue = (changeDue - requiredAmount).toFixed(2);
    }
  }

  if (Number(changeDue) > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change };
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
