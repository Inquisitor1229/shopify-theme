'use strict';

class Accordion {
    constructor(domNode) {
        this.rootEl = domNode;
        this.buttonEl = this.rootEl.querySelector('button[aria-expanded]');
        const controlsId = this.buttonEl.getAttribute('aria-controls');
        this.contentEl = document.getElementById(controlsId);

        this.open = this.buttonEl.getAttribute('aria-expanded') === 'true';

        this.buttonEl.addEventListener('click', this.onButtonClick.bind(this));
    }

    onButtonClick() {
        this.toggle(!this.open);
    }

    toggle(open) {
        if (open === this.open) {
            return;
        }

        this.open = open;

        this.buttonEl.setAttribute('aria-expanded', `${open}`);
        if (open) {
            this.contentEl.removeAttribute('hidden');
        } else {
            this.contentEl.setAttribute('hidden', '');
        }
    }

    open() {
        this.toggle(true);
    }

    close() {
        this.toggle(false);
    }
}

class changeProductHeading {
    constructor(element) {
        this.element = element;
        this.inputEl = this.element;
        this.inputEl.addEventListener('click', this.changeValue.bind(this));
    }

    changeValue() {
        console.log(this.element)
        switch (this.element.getAttribute('name')) {
            case 'product_size':
            {
                document.getElementById('size_1').removeAttribute('checked');
                document.getElementById('product_heading_size').textContent = this.element.value;
                break;
            }
            case 'product_color':
            {
                document.getElementById('color_1').removeAttribute('checked');
                document.getElementById('product_heading_color').textContent = this.element.value;
                break;
            }
            default:
                return;
        }
    }
}

class changeQuantity {
    constructor(element) {
        this.element = element;
        this.buttonEl = this.element;
        this.buttonEl.addEventListener('click', this.changeValue.bind(this));
    }

    changeValue() {
        const quantityEl = document.querySelector('.quantity__control input');
        if (this.element.classList.contains('quantity__button--decrease') && quantityEl.value > 1) {
            quantityEl.value--;
        } else if (this.element.classList.contains('quantity__button--increase') && quantityEl.value < 999){
            quantityEl.value++;
        } else {
            return;
        }
    }
}

function toggleBurgerMenu() {
    if (document.getElementById('burger_menu').hasAttribute('hidden')) {
        document.getElementById('burger_menu').removeAttribute('hidden')
    } else {
        document.getElementById('burger_menu').setAttribute('hidden', 'hidden')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    //аккордеон
    const accordions = document.querySelectorAll('.accordion h3');
    accordions.forEach((accordionEl) => {
        new Accordion(accordionEl);
    });

    //выбор цвета и размера продукта
    const selectionLabels = document.querySelectorAll('.product-options__list--js input');
    selectionLabels.forEach((selectionLabelsEl) => {
        new changeProductHeading(selectionLabelsEl);
    });

    //изменение колличества продукта
    const quantity = document.querySelectorAll('.quantity__control button');
    quantity.forEach((quantityButtonEl) => {
        new changeQuantity(quantityButtonEl);
    });

    //бургер меню
    const burgerMenuButton = document.getElementById('burger_menu_button');
    burgerMenuButton.addEventListener('click', toggleBurgerMenu);
});