class PageTopBtn {
  constructor() {
    this.DOM = {};
    this.DOM.btn = document.querySelector(".page-top-btn");
    this.eventType = this._getEventType();
    this._addEvent();
  }

  _getEventType() {
    const isTouchCapable = "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof DocumentTouch);

    return isTouchCapable ? "touchstart" : "click";
  }

  _scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  _addEvent() {
    this.DOM.btn.addEventListener(this.eventType, this._scrollToTop.bind(this));
  }
}