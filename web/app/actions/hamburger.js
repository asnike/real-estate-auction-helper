export const HAMBURGER_MENU_CLICK = 'HAMBURGER_MENU_CLICK';
export const HAMBURGER_MENU_OPENED = 'HAMBURGER_MENU_OPENED';
export const HAMBURGER_MENU_CLOSED = 'HAMBURGER_MENU_CLOSED';

function hamburgerClick(){
	return {
		type:HAMBURGER_MENU_CLICK,
	}
}
function hamburgerOpen(){
	return {
		type:HAMBURGER_MENU_OPENED
	}
}
function hamburgerClose(){
	return {
		type:HAMBURGER_MENU_CLOSED
	}
}
export function hamburgerMenuClick(){
	return dispatch => {
		dispatch(hamburgerClick());
	}
}