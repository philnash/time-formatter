class TimeFormatter extends HTMLElement {
  static get observedAttributes() {
    return [
      "datetime",
      "year",
      "month",
      "day",
      "hour",
      "minute",
      "second",
      "time",
      "weekday",
      "date-style",
      "time-style",
      "time-zone-name",
      "time-zone",
    ];
  }

  constructor() {
    super();
    this.language = this.getLanguage();
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  dateTimeToLocalTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const timeZone =
      this.getAttribute("time-zone") ||
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = this.getAttribute("language") || this.language;
    const options = {
      timeZone: timeZone,
    };
    [
      "year",
      "month",
      "day",
      "hour",
      "minute",
      "second",
      "weekday",
      "era",
    ].forEach((attr) => {
      this.maybeSetOption(options, attr);
    });
    this.maybeSetOption(options, "date-style", "dateStyle");
    this.maybeSetOption(options, "time-style", "timeStyle");
    this.maybeSetOption(options, "time-zone-name", "timeZoneName");

    const formatter = Intl.DateTimeFormat(language, options);
    return formatter.format(date);
  }

  maybeSetOption(options, attrName, optionName) {
    if (typeof optionName === "undefined") {
      optionName = attrName;
    }
    if (this.getAttribute(attrName)) {
      options[optionName] = this.getAttribute(attrName);
    }
  }

  getLanguage() {
    return navigator.languages
      ? navigator.languages[0]
      : navigator.language || navigator.userLanguage;
  }

  render() {
    const oldChildValue = this.innerHTML;
    try {
      this.innerHTML = "";
      this.appendChild(
        document.createTextNode(
          this.dateTimeToLocalTime(this.getAttribute("datetime"))
        )
      );
    } catch (error) {
      console.error(error);
      this.innerHTML = oldChildValue;
    }
  }
}

window.customElements.define("time-formatter", TimeFormatter);
