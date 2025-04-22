export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('mousedown', handleOverlayClick);
    document.addEventListener('keydown', closeByEsc);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

export function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
    document.removeEventListener('keydown', closeByEsc);
}

function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
}