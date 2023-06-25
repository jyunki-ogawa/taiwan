class Modal {
  constructor(modal, cover, openTrigger, closeTrigger, modalOpen) {
    this.DOM = {};
    // this.DOM.body = document.getElementsByTagName('body');
    this.DOM.container = document.querySelector("#global-container");
    this.DOM.cover = document.querySelector(cover);
    this.DOM.openTrigger = document.querySelector(openTrigger);
    this.DOM.closeTrigger = document.querySelector(closeTrigger);
    this.DOM.body = document.querySelector("body");
    this.DOM.modal = document.querySelector(modal);
    this.DOM.FOCUSABLE_ELEMENTS = [
      "a[href]",
      "area[href]",
      'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
      "select:not([disabled]):not([aria-hidden])",
      "textarea:not([disabled]):not([aria-hidden])",
      "button:not([disabled]):not([aria-hidden])",
      "iframe",
      "object",
      "embed",
      "[contenteditable]",
      '[tabindex]:not([tabindex^="-"])',
    ];
    this.DOM.focusableElements = [
      ...this.DOM.modal.querySelectorAll(
        this.DOM.FOCUSABLE_ELEMENTS.join(",")
      ),
    ];
    this.DOM.beforeFocusedElement = null;
    this.modalOpen = modalOpen;

    this.eventType = this._getEventType();
    this._addEvent();
  }

  _getEventType() {
    const isTouchCapable =
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof DocumentTouch);

    return isTouchCapable ? "touchstart" : "click";
  }

  _addEvent() {
    this.DOM.cover.addEventListener(this.eventType, this._handleMenuTrigger.bind(this)
    );
    this.DOM.openTrigger.addEventListener(
      this.eventType,
      this._handleMenuTrigger.bind(this)
    );
    this.DOM.closeTrigger.addEventListener(
      this.eventType,
      this._handleMenuTrigger.bind(this)
    );
    this.DOM.modal.addEventListener(
      "keydown",
      this._handleKeydown.bind(this)
    );

  }

  _handleMenuTrigger() {
    if (!this.DOM.container.classList.contains(this.modalOpen)) {
      // モーダルを開く直前のフォーカスの取得
      this.DOM.beforeFocusedElement = document.activeElement;
      // モーダルを開く際の処理
      this._handleMenuOpen();
    } else {
      // モーダルを閉じる際の処理
      this._handleMenuClose();
    }
  }

  _handleKeydown(e) {
    const firstFocusableElement = this.DOM.focusableElements[0];
    const lastFocusableElement =
    this.DOM.focusableElements[this.DOM.focusableElements.length - 1];

    if (e.code === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          // モーダル内で最初のtabableの要素の時、最後のtabableの要素にフォーカスを移す
          lastFocusableElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          // モーダル内で最後のtabableの要素の時、最初のtabableの要素にフォーカスを移す
          firstFocusableElement.focus();
        }
      }
    }

    // Escapeの押下でモーダルを閉じる
    if (e.code === "Escape") {
      this._handleMenuClose();
    }    
  }

  _handleMenuOpen() {
    this.DOM.focusableElements.forEach(function(focusableElement){
      focusableElement.setAttribute('tabindex', "0");
    });
    // this.DOM.closeBtn.setAttribute('tabindex', "0");
    // this.DOM.container.setAttribute("aria-hidden", "true");
    this.DOM.container.classList.add(this.modalOpen);
    this.DOM.focusableElements[0].focus();
    this._bgScrollBehavior("fix");
    this._noSelectContents(true);
  }

  _handleMenuClose() {
    this.DOM.focusableElements.forEach(function(focusableElement){
      focusableElement.setAttribute('tabindex', "-1");
    });
    // this.DOM.closeBtn.setAttribute('tabindex', "-1");
    // this.DOM.container.setAttribute("aria-hidden", "false");
    this.DOM.container.classList.remove(this.modalOpen);
    this._bgScrollBehavior("scroll");
    this._noSelectContents(false);

    // モーダルを開く時に、直前にフォーカスが当たっていた要素にフォーカスを戻す
    if (this.DOM.beforeFocusedElement) {
      this.DOM.beforeFocusedElement.focus();
      this.DOM.beforeFocusedElement = null;
    }  
  }

  _bgScrollBehavior = (state) => {
    const isFixed = state === "fix";

    if (isFixed) {
      // スクロールを止める処理
      // .fixedのスタイルを用意
      const scrollY = document.documentElement.scrollTop;
      document.body.classList.add("fixed");
      ////fixedにすると強制的にページのトップにくるので、下の位置にスクロールして戻す
      document.documentElement.style.setProperty(
        ////topプロパティに指定するので、-1をかける
        "--scroll-y",
        `${scrollY * -1}px`
      );
    } else {
      // スクロール停止を解除する処理
      //parseIntで文字値を切り落とす（pxの文字が含まれているので）
      //ここでor条件にしているのは、css側でプロパティ名のミスでfalseが返ってくることを想定してデフォルト値を設定する
      const scrollY = parseInt(
        document.documentElement.style.getPropertyValue("--scroll-y") || "0"
      );
      document.body.classList.remove("fixed");
      window.scrollTo(0, scrollY * -1);
    }
  };

  _noSelectContents = (bool) => {
    // .user-select-noneのスタイルを用意
    if (bool) {
      this.DOM.container.classList.add("user-select-none");
    } else {
      this.DOM.container.classList.remove("user-select-none");
    }
  };

}
