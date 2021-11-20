export const setCookie = (cname, cvalue, exdays = 365) => {
  if (!cvalue) return;
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

// export const loginValidation = (email, password) => {

// }

export const createDate = (day, month, year) => {
	let dayFormat = day.length==1 ? `0${day}` : `${day}` 
	let monthFormat = month.length==1 ? `0${month}` : `${month}`
	return `${year}-${monthFormat}-${dayFormat}`;
}