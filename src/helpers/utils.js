export function getDateUTC() {
    const date = new Date();
    const utc =  Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    );
    return new Date(utc);
}

export function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
}

/**
 * Get string formatted a date by format.
 * @param {Date} date.
 * @param {string} format.
 * @returns {string} Return string formatted date.
 */
export function formatDate(date, format) {
    const map = {
        MM: ('0' + (date.getMonth() + 1)).slice(-2),
        dd: ('0' + date.getDate()).slice(-2),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    }
    return format.replace(/yyyy|yy|MM|dd/gi, matched => map[matched])
}

/**
 * Get string formatted a datetime by format.
 * @param {Date} date.
 * @param {string} format.
 * @returns {string} Return string formatted time.
 */
export function formatDateTime(date, format) {
    const map = {
        MM: ('0' + (date.getMonth() + 1)).slice(-2),
        dd: ('0' + date.getDate()).slice(-2),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear(),
        HH: ('0' + date.getHours()).slice(-2),
        mm: ('0' + date.getMinutes()).slice(-2),
        ss: ('0' + date.getSeconds()).slice(-2),
    }
    return format.replace(/yyyy|yy|MM|dd|HH|mm|ss/gi, matched => map[matched])
}

/**
 * Get date formatted a string month abbreviation by format.
 * @param {Date} date.
 * @returns {string} Return string formatted time.
 */
export function formatMonthAbrv(date) {
    var months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return months[date.getMonth()];
}

/**
 * Get object parsed from json.
 * @param {String} json.
 * @returns {Object} Return object parsed.
 */
export function fromJSON(json) {
    return JSON.parse(json);
}

/**
 * Get json parsed from obj.
 * @param {Object} obj.
 * @returns {string} Return json string parsed.
 */
export function toJSON(obj) {
    return JSON.stringify(obj);
}

export function csvToArray(str, delimiter = ";") {
    var allTextLines = str.split(/\r\n|\n/);
    var headers = allTextLines[0].split(delimiter);
    var lines = [];

    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(delimiter);
        if (data.length == headers.length) {
            var tarr = {"latitud":0, "longitud":0};

            for (var j = 0; j < headers.length; j++) {
                if(headers[j] === "latitud") {
                    tarr.latitud = parseFloat(String(data[j]).trim())
                }else if(headers[j] === "longitud") {
                    tarr.longitud = parseFloat(String(data[j]).trim())
                }
            }
            lines.push(tarr);
        }
    }
    return lines;
}
