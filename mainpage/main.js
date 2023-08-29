let date = new Date();

const renderCalender = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  document.querySelector(".year").textContent = `${viewYear}`;
  document.querySelector(".month").textContent = `${viewMonth + 1}`;

  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  document.querySelector(".backward").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    if (date.getMonth() === -1) {
      date.setMonth(11);
      date.setFullYear(date.getFullYear() - 1);
    }
    renderCalender();
  });

  document.querySelector(".forward").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    if (date.getMonth() === 12) {
      date.setMonth(0);
      date.setFullYear(date.getFullYear() + 1);
    }
    renderCalender();
  });

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);
  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
    dates[
      i
    ] = `<div class="date ${condition}" style="width: calc(100% / 7); display: inline-block; padding: 70px;">${date}</div>`;
  });

  document.querySelector(".dates").innerHTML = dates.join("");

  document.querySelector(".dates").style.display = "grid";
  document.querySelector(".dates").style.gridTemplateColumns = "repeat(7, 1fr)";

  document.querySelector(".dates").innerHTML = dates.join("");

  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll(".this")) {
      if (+date.innerText === today.getDate()) {
        date.classList.add("today");
        break;
      }
    }
  }
};

renderCalender();

const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalender();
};

const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalender();
};

const goToday = () => {
  date = new Date();
  renderCalender();
};
