/*
 * This code is to be used exclusively in connection with Ping Identity Corporation software or services.
 * Ping Identity Corporation only offers such software or services to legal entities who have entered into
 * a binding license agreement with Ping Identity Corporation.
 *
 * Copyright 2024 Ping Identity Corporation. All Rights Reserved
 */

(async function onLoad() {

    function isEven(num){
        return num % 2 === 0;
    }

    function getKey(string){
        //<tr><td><code> Key </code> </td><td> Value </td></tr>...
        var trimmed = ''
        var letter = ''
        var key = ''

        trimmed += string.replace("[tr]","").replaceAll("[/tr]","").replaceAll("[td]", "").replaceAll("[/td]", "").replaceAll("[code]", "")
        for(letter in trimmed){
            if(trimmed[letter] === "["){
                break
            }else{
                key += trimmed[letter]
            }
        }
        console.log("Returned key: " + key)
        return key
    }

    function getValue(key, string){
        //[tr][td][code] Key [/code] [/td][td] Value [/td][/tr]...
        var value = ''

        value += string.replace("[tr]","").replaceAll("[/tr]","").replaceAll("[td]", "").replaceAll("[/td]", "").replaceAll("[code]", "").replaceAll("[/code]", "").replace(key, "").trim()
        console.log("Returned value: " + value)
        return value
    }

    var name = "${name}"

    var startTable = false
    var endTable = false
    const stringsRead = []
    const array = []
    var table = ''
    var darkBackground = 0

    for (const val of document.querySelectorAll('div')) {
        var string = val.textContent.trim()
        val.style = "margin:auto;"


        console.log("String: " + string)

        if (string === "h3INSERT INTO SHARED STATE/h3" ||
            string === "h3AUTHID/h3" ||
            string === "h3HEADERS/h3" ||
            string === "h3CLIENT IP/h3" ||
            string === "h3COOKIES/h3" ||
            string === "h3HOSTNAME/h3" ||
            string === "h3LOCALE/h3" ||
            string === "h3PARAMETERS/h3" ||
            string === "h3SERVER URL/h3" ||
            string === "h3TRANSIENT STATE/h3" ||
            string === "h3INSERT INTO TRANSIENT STATE/h3" ||
            string === "h3CURRENT TRANSIENT STATE/h3" ||
            string === "h3CURRENT SECURED STATE/h3" ||
            string === "h3" + name + "/h3" ||
            string === "h3CURRENT SECURED STATE IS EMPTY/h3" ||
            string === "h3CURRENT TRANSIENT STATE IS EMPTY/h3" ||
            string === "h3CURRENT SHARED STATE IS EMPTY/h3" ||
            string === "h3CURRENT SHARED STATE/h3") {

            var trimmed = string.replace("h3", "").replace("/h3", "")
            console.log("Inside h3 tag with: " + trimmed)

            if (stringsRead.includes(string)) {
                val.outerHTML = ''
                continue
            } else {
                stringsRead.push(string)
            }

            if (string === "h3" + name + "/h3") {
                val.outerHTML = '<h1 style=" width: 100%; padding-top: 10px; padding-bottom: 10px; margin-top: 10px; text-align: center">' + trimmed + '</h1>'
            } else {

                val.outerHTML = '<hr style="color: black; size: 10px; width: 100%"><h3 style=" width: 100%; padding-top: 10px; padding-bottom: 10px; margin-top: 10px; text-align: left">' + trimmed + '</h3>'
            }
            continue
        }
        console.log(string + " above <table>")
        if(string === "[table]"){
            console.log("Starting table...")
            startTable = true
            table += '<table style="width: 100%; margin-bottom: 10px">'
            val.innerHTML = ''
            continue
        }

        if(startTable){
            if(string === "[/table]"){
                table += "</table>"
                val.innerHTML = table

                console.log("Ending Table...")
                console.log("table: " + table)
                table = ''
                startTable = false
                continue
            }

            if (array.includes(string)) {
                console.log("Skipping " + string +" ...")
                continue
            } else {
                array.push(string)
            }

            darkBackground++
            var key = getKey(string).trim()
            console.log("Key: " + key)

            var value = getValue(key, string)
            console.log("Value: " + value)

            if (isEven(darkBackground)) {
                table += '<tr style="background-color: #e5e5e5; border: 1px solid black; text-align: left; overflow-wrap: anywhere; padding: 10px;"><td  style="word-break: break-all; width:130px; border: 1px solid black; text-align: left; padding: 10px; overflow-wrap: anywhere"  ><code style="word-break: break-all; background: none">' + key + '</code></td><td  style="padding:10px; border: 1px solid black; text-align: left; word-break: break-all; overflow-wrap: anywhere">' + value + '</td></tr>';
            } else {
                table += '<tr style="border: 1px solid black; text-align: left; overflow-wrap: anywhere; padding: 10px; "><td  style="word-break: break-all; width:130px; border: 1px solid black; text-align: left; padding: 10px; overflow-wrap: anywhere"  ><code style="word-break: break-all;background: none">' + key + '</code></td><td  style="border: 1px solid black; text-align: left; word-break: break-all; overflow-wrap: anywhere; padding:10px">' + value + '</td></tr>';
            }
            console.log("table now: " + table)
            val.innerHTML = ''
        }

        if (val.textContent.startsWith("h4")) {
            val.innerHTML = '<h4 style="margin-top: 10px">' + val.innerHTML.replace("h4", "").replace("/h4", "") + '</h4>';
        }

        if(val.textContent.length === 0){
            val.remove()
        }

    }



    for(const val of document.querySelectorAll('h1')){
    var string = val.textContent.trim()
    if(string !== name.trim()){
        val.innerHTML = ''
    }else{
    }
}
})();
