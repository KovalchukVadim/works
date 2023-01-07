const fileSelector = document.getElementById('file-selector');
const btn = document.getElementById('btn')
const bar = document.getElementById('bar')
const temp = document.getElementById('temp')

function openFile(event) {
    let input = event.target
    let reader = new FileReader()
    reader.onload = function() {
        let contents = reader.result

        const inputBar = bar.value
        const inputTemp = temp.value

        const firstNum = '1101'
        const secNum = '1102'
        const thirdNum = '1103'
        const sensorHeight = '0081'
        const fiveGroup = '0000'

        let midWind1 = contents.match(/\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;\d+\.\d\;\d+\.\d\;\d+\.\d\;\-?\d+.\d\;/g)
        let midWind2 = contents.match(/\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;\d+\.\d\;\d+\.\d\;\d+\.\d\;\-?\d+.\d\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;/g)
        let midWind3 = contents.match(/\;\d+\.?\d+\;\d+\.?\d+\;\d+\.?\d+\;\-?\d+\.?\d+\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;/g)

        function ccl(ar) {
            if (ar) {
                let clearMidWind1 = ar.map(element => {
                    const res = []
                    let newArr = element.replace(/\d+\.\d/, '')
                    let nn = newArr.match(/\d+\.\d/)
                    res.push(nn[0])
                    let b = res.map(Number);
                    return b
                });
                const merge3 = clearMidWind1.flat(1);
                let sum = merge3.reduce((partial_sum, a) => partial_sum + a, 0) / merge3.length;
                return sum
            }
        }

        function wwl(ar) {
            if (ar) {
                let clearMidWind1 = ar.map(element => {
                    const res = []
                    let newArr = element.replace(/\d+\.\d\;\d+\.\d/, '')
                    let nn = newArr.match(/\d+\.\d/)
                    res.push(nn[0])
                    let b = res.map(Number);
                    return b
                });
                const merge3 = clearMidWind1.flat(1);
                let sum = merge3.reduce((partial_sum, a) => partial_sum + a, 0) / merge3.length;
                return sum
            }
        }



        let wxt1 = contents.match(/\d{4}\-\d{2}\-[0-9,A-Z]{5}\:\d{2}\:\d{2}\.[0-9]{3}\+[0-9]{2}\:[0-9]{2}\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;\d+\.?\d+\;\d+\.?\d+\;\d+\.?\d+\;\-?\d+\.\d+/)
        let wxt2 = contents.match(/\d{4}\-\d{2}\-[0-9,A-Z]{5}\:\d{2}\:\d{2}\.[0-9]{3}\+[0-9]{2}\:[0-9]{2}\;\/\/\/\;\/\/\/\;\/\/\/\;\/\/\/\;\d+\.?\d+\;\d+\.?\d+\;\d+\.?\d+\;\-?\d+\.\d+/)
        let wxt3 = contents.match(/\d{4}\-\d{2}\-[0-9,A-Z]{5}\:\d{2}\:\d{2}\.[0-9]{3}\+[0-9]{2}\:[0-9]{2}\;\d+\.?\d+\;\d+\.?\d+\;\d+\.?\d+\;\-?\d+\.\d+/)



        function wxtTime(ar) {
            if (ar) {
                let wxtMonth = ar[0].match(/\-[0-9]{2}\-/)
                let wxtHours = ar[0].match(/T[0-9]{2}\:[0-5]/)
                let wxtConcat = wxtMonth + wxtHours
                let wxtClear = wxtConcat.replace(/\D/g, '')
                return wxtClear
            }
        }

        function wxtGetHpa(ar) {
            if (ar) {
                let wxtHpa = ar[0].match(/[0-9]{3,}\.\d/)
                let multy = wxtHpa[0] * 0.75
                let mm = Math.round(multy)
                if (mm >= inputBar) {
                    let res = mm - inputBar
                    if (res < 10) {
                        return '00' + res
                    } else {
                        return '0' + res
                    }
                } else {
                    let dec = mm - inputBar
                    let newDec = Math.abs(dec)
                    if (newDec < 10) {
                        return '05' + newDec
                    } else {
                        return '5' + newDec
                    }
                }
            }
        }

        function wxtGetTemp(ar) {
            if (ar) {
                let wxtTemp = ar[0].match(/\-?\d+.\d$/)
                let dgr = Math.round(wxtTemp)
                let res = dgr - inputTemp
                if (res < 0) {
                    if (res <= -10) {
                        let newRes = Math.abs(res)
                        return 50 + newRes
                    } else {
                        let newRes = Math.abs(res)
                        return '5' + newRes
                    }
                } else {
                    if (res < 10) {
                        return '0' + res
                    } else {
                        return res
                    }
                }
            }
        }

        function wxtGetWind(ar) {
            let wind = ccl(ar) / 6
            let clearWind = Math.round(wind)
            if (clearWind < 10) {
                return '0' + clearWind
            } else {
                return clearWind
            }
        }

        function wxtGetWindSpeed(ar) {
            let clear = wwl(ar)
            let clearWind = Math.round(clear)
            if (clearWind < 10) {
                return '0' + clearWind
            } else {
                return clearWind
            }
        }

        function titleFunc() {
            let timeMeteo = contents.match(/\d{4}\-\d{2}\-[0-9,A-Z]{5}\:\d{2}/)
            let clrTimeMeteo = timeMeteo[0].replace(/[A-Z]/, ' ')
            return 'Метеосередній' + ' ' + clrTimeMeteo + '\n'
        }

        function meteo(name, date, sensorH, hpa, tmp, fiveGroup, tmp2, wind, windSp) {
            let wxt = name + '-' + date + '-' + sensorH + '-' + hpa + tmp + '-' + fiveGroup + '-' + tmp2 + wind + windSp + '\n'
            return wxt
        }
        let wxtMeteResult1 = meteo(firstNum, wxtTime(wxt1), sensorHeight, wxtGetHpa(wxt1), wxtGetTemp(wxt1), fiveGroup, wxtGetTemp(wxt1), wxtGetWind(midWind1), wxtGetWindSpeed(midWind1))
        let wxtMeteResult2 = meteo(secNum, wxtTime(wxt2), sensorHeight, wxtGetHpa(wxt2), wxtGetTemp(wxt2), fiveGroup, wxtGetTemp(wxt2), wxtGetWind(midWind2), wxtGetWindSpeed(midWind2))
        let wxtMeteResult3 = meteo(thirdNum, wxtTime(wxt3), sensorHeight, wxtGetHpa(wxt3), wxtGetTemp(wxt3), fiveGroup, wxtGetTemp(wxt3), wxtGetWind(midWind3), wxtGetWindSpeed(midWind3))

        console.log(wxtMeteResult1)
        console.log(wxtMeteResult2)
        console.log(wxtMeteResult3)

        let today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();

        let month = today.getMonth() + 1;
        let day = today.getDate();
        let year = today.getFullYear();
        if (month < 10) { month = '0' + month; }
        if (day < 10) { day = '0' + day; }
        let dateday = day + '-' + month + '-' + year;

        const blob = new Blob([titleFunc(), wxtMeteResult1, wxtMeteResult2, wxtMeteResult3], { type: 'text/plain;charset=utf-8' })
        return saveAs(blob, `${dateday}.txt`)
    }
    reader.readAsText(input.files[0])
}