/* eslint-env browser */

function headerLoad() {
  const userMenu = $('#user-menu');
  const mobileMenu = $('#mobile-menu');
  userMenu.addClass('hidden');
  mobileMenu.addClass('hidden');
  $('#user-menu-button').click(() => {
    const isHidden = userMenu.is('.hidden');
    if (isHidden) {
      userMenu.removeClass('hidden');
    } else {
      userMenu.addClass('hidden');
    }
  });

  $('#mobile-menu-button').click(() => {
    const isHidden = mobileMenu.is('.hidden');
    if (isHidden) {
      mobileMenu.removeClass('hidden');
    } else {
      mobileMenu.addClass('hidden');
    }
  });
}

function resetClick(event, container) {
  const menu = $(`#${container}`);
  const menuButton = $(`#${container}-button`);
  // if the target of the click isn't the container nor a descendant of the container
  if (!menuButton.is(event.target)
      && !menu.is(event.target)
      && menu.has(event.target).length === 0) {
    menu.addClass('hidden');
  }
}

$(document).mouseup((e) => {
  resetClick(e, 'user-menu');
  resetClick(e, 'mobile-menu');
});

document.addEventListener('turbolinks:load', headerLoad, false);
