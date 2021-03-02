<div style="text-align:center" align="center">
  <h1>🕖🕗🕘🕙🕚 <code>&lt;time-formatter&gt;</code> 🕐🕑🕒🕓🕔</h1>

  <p><em>A web component that converts a date time into your user's time zone and formats it locally.</em></p>
</div>

## Installation

Install the component with:

```bash
npm install @philnash/time-formatter
```

## About

`<time-formatter>` relies on [`navigator.languages`](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/languages) to get a user's preferred language and [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) to convert and format a date time into a string. It brings the two features together into a web component that makes it easy to use and declarative.

## Browser support

This requires support for:

- Custom elements - https://caniuse.com/custom-elementsv1
- NavigatorLanguage API - https://caniuse.com/mdn-api_navigatorlanguage_languages (falls back to `navigator.language` or `navigator.userLanguage`)
- `Intl.DateTimeFormat.format` - https://caniuse.com/mdn-javascript_builtins_intl_datetimeformat_format
- `Intl.DateTimeFormat` computed `timeZone` - https://caniuse.com/mdn-javascript_builtins_intl_datetimeformat_resolvedoptions_computed_timezone

## Demo

You can see the element in action in [this example here](https://philnash.github.io/time-formatter/example/). Two `<time-formatter>` elements are used, one showing your time zone and one showing a time zone of your choice. You can choose the different levels for each of the formatting options and see how the date is formatted.

## Usage

Import the `@philnash/time-formatter` module and that will register the `<time-formatter>` custom element.

```javascript
import "@philnash/time-formatter";
```

If you want to use the `TimeFormatter` class directly, you can import it with:

```javascript
import { TimeFormatter } from "@philnash/time-formatter";
```

To use `<time-formatter>` you will need a date time string in the format `YYYY-MM-DDTHH:mm:ss.sssZ` [as described in ecma262](https://tc39.es/ecma262/#sec-date-time-string-format). In the initial version of this component, `Date.parse` is used to parse this string and non-standard date time strings can be parsed differently by different browsers.

Add the `<time-formatter>` to the page with a `datetime` attribute and default content:

```html
<time-formatter datetime="1984-09-14T01:36:00.000+01:00"
  >14/09/1984</time-formatter
>
```

The default content will be replaced with the result of parsing the `datetime` attribute, and formatted according to the user's local time zone and language settings using `Intl.DateTimeFormat`. You can provide options for how the time is formatted and the default is the default used by `Intl.DateTimeFormat`, which is just the date. If the user's preferred language is set to `en-GB` the above example would be rendered as `14/09/1984` and if the preferred language is `en-US` then it would be rendered as `09/14/1984`.

You can pass options for each component of the date time to describe how it should be rendered. The [options are listed here](https://tc39.es/proposal-intl-datetime-style/#sec-datetimeformat-abstracts).

So, taking the above datetime and passing different formatting options you may get the following results:

_Note my current prefered language is `en-GB` and my current time zone is `Australia/Melbourne`:_

```html
<time-formatter datetime="1984-09-14T01:36:00.000+01:00" year="numeric"
  >14/09/1984</time-formatter
>
<!-- 1984 -->
<time-formatter
  datetime="1984-09-14T01:36:00.000+01:00"
  hour="numeric"
  minute="numeric"
  second="numeric"
  >14/09/1984</time-formatter
>
<!-- 10:36:00 -->
<time-formatter
  datetime="1984-09-14T01:36:00.000+01:00"
  era="short"
  year="numeric"
  month="long"
  weekday="long"
  day="numeric"
  hour="numeric"
  minute="numeric"
  second="numeric"
  time-zone-name="long"
  >14/09/1984</time-formatter
>
<!-- Friday, 14 September 1984 AD, 10:36:00 Australian Eastern Standard Time -->
```

You can also pass the time zone name and language if you know your user's preference.

```html
<time-formatter
  datetime="1984-09-14T01:36:00.000+01:00"
  era="short"
  year="numeric"
  month="long"
  weekday="long"
  day="numeric"
  hour="numeric"
  minute="numeric"
  second="numeric"
  time-zone-name="long"
  >14/09/1984</time-formatter
>
<!-- vendredi 14 septembre 1984 ap. J.-C. à 02:36:00 heure d’été d’Europe centrale -->
```

### Errors/fallbacks

If the datetime cannot be parsed or any other error occurs in trying to calculate or format the date, then the default child content will remain. An error will be logged to the console.

## TODO

- [ ] Feedback
- [ ] npm package and install instructions
- [ ] Live example
- [ ] Tests

## LICENSE

MIT (c) 2020 Phil Nash
