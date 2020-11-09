/*! For license information please see vttparser-0.9.0.js.LICENSE */
(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{383:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,n={"":!0,up:!0};function o(t){return"number"==typeof t&&t>=0&&t<=100}i=function(){var t=100,e=3,r=0,i=100,s=0,a=100,c="";Object.defineProperties(this,{width:{enumerable:!0,get:function(){return t},set:function(e){if(!o(e))throw new Error("Width must be between 0 and 100.");t=e}},lines:{enumerable:!0,get:function(){return e},set:function(t){if("number"!=typeof t)throw new TypeError("Lines must be set to a number.");e=t}},regionAnchorY:{enumerable:!0,get:function(){return i},set:function(t){if(!o(t))throw new Error("RegionAnchorX must be between 0 and 100.");i=t}},regionAnchorX:{enumerable:!0,get:function(){return r},set:function(t){if(!o(t))throw new Error("RegionAnchorY must be between 0 and 100.");r=t}},viewportAnchorY:{enumerable:!0,get:function(){return a},set:function(t){if(!o(t))throw new Error("ViewportAnchorY must be between 0 and 100.");a=t}},viewportAnchorX:{enumerable:!0,get:function(){return s},set:function(t){if(!o(t))throw new Error("ViewportAnchorX must be between 0 and 100.");s=t}},scroll:{enumerable:!0,get:function(){return c},set:function(t){var e=function(t){return"string"==typeof t&&!!n[t.toLowerCase()]&&t.toLowerCase()}(t);if(!1===e)throw new SyntaxError("An invalid or illegal string was specified.");c=e}}})},e.default=i},70:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i(r(68)),i(r(383));function i(t){return t&&t.__esModule?t:{default:t}}var n=function(){};function o(t,e){return void 0===e&&(e=1),"rgba("+[parseInt(t.substring(0,2),16),parseInt(t.substring(2,4),16),parseInt(t.substring(4,6),16),e].join(",")+")"}var s=1;function a(t,e,r){switch(r){case"webvtt.font.color":case"webvtt.font.opacity":var i=Services.prefs.getCharPref("webvtt.font.color"),n=Services.prefs.getIntPref("webvtt.font.opacity")/100;c.fontSet=o(i,n);break;case"webvtt.font.scale":s=Services.prefs.getIntPref("webvtt.font.scale")/100;break;case"webvtt.bg.color":case"webvtt.bg.opacity":var a=Services.prefs.getCharPref("webvtt.bg.color"),h=Services.prefs.getIntPref("webvtt.bg.opacity")/100;c.backgroundSet=o(a,h);break;case"webvtt.edge.color":case"webvtt.edge.type":var l=Services.prefs.getIntPref("webvtt.edge.type"),u=Services.prefs.getCharPref("webvtt.edge.color");c.edgeSet=["","0px 0px ","4px 4px 4px ","-2px -2px ","2px 2px "][l]+o(u)}}if("undefined"!=typeof Services){var c={};["webvtt.font.color","webvtt.font.opacity","webvtt.font.scale","webvtt.bg.color","webvtt.bg.opacity","webvtt.edge.color","webvtt.edge.type"].forEach(function(t){a(0,0,t),Services.prefs.addObserver(t,a,!1)})}var h=Object.create||function(){function t(){}return function(e){if(1!==arguments.length)throw new Error("Object.create shim only accepts one parameter.");return t.prototype=e,new t}}();function l(t,e){this.name="ParsingError",this.code=t.code,this.message=e||t.message}function u(t){function e(t,e,r,i){return 3600*(0|t)+60*(0|e)+(0|r)+(0|i)/1e3}var r=t.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);return r?r[3]?e(r[1],r[2],r[3].replace(":",""),r[4]):r[1]>59?e(r[1],r[2],0,r[4]):e(0,r[1],r[2],r[4]):null}function f(){this.values=h(null)}function p(t,e,r,i){var n=i?t.split(i):[t];for(var o in n)if("string"==typeof n[o]){var s=n[o].split(r);if(2===s.length)e(s[0],s[1])}}function d(t,e,r){var i=t;function n(){var e=u(t);if(null===e)throw new l(l.Errors.BadTimeStamp,"Malformed timestamp: "+i);return t=t.replace(/^[^\sa-zA-Z-]+/,""),e}function o(){t=t.replace(/^\s+/,"")}if(o(),e.startTime=n(),o(),"--\x3e"!==t.substr(0,3))throw new l(l.Errors.BadTimeStamp,"Malformed time stamp (time stamps must be separated by '--\x3e'): "+i);t=t.substr(3),o(),e.endTime=n(),o(),function(t,e){var i=new f;p(t,function(t,e){switch(t){case"region":for(var n=r.length-1;n>=0;n--)if(r[n].id===e){i.set(t,r[n].region);break}break;case"vertical":i.alt(t,e,["rl","lr"]);break;case"line":var o=e.split(","),s=o[0];i.integer(t,s),i.percent(t,s)&&i.set("snapToLines",!1),i.alt(t,s,["auto"]),2===o.length&&i.alt("lineAlign",o[1],["start","middle","end"]);break;case"position":o=e.split(","),i.percent(t,o[0]),2===o.length&&i.alt("positionAlign",o[1],["start","middle","end"]);break;case"size":i.percent(t,e);break;case"align":i.alt(t,e,["start","middle","end","left","right"])}},/:/,/\s/)}(t)}l.prototype=h(Error.prototype),l.prototype.constructor=l,l.Errors={BadSignature:{code:0,message:"Malformed WebVTT signature."},BadTimeStamp:{code:1,message:"Malformed time stamp."}},f.prototype={set:function(t,e){this.get(t)||""===e||(this.values[t]=e)},get:function(t,e,r){return r?this.has(t)?this.values[t]:e[r]:this.has(t)?this.values[t]:e},has:function(t){return t in this.values},alt:function(t,e,r){for(var i=0;i<r.length;++i)if(e===r[i]){this.set(t,e);break}},integer:function(t,e){/^-?\d+$/.test(e)&&this.set(t,parseInt(e,10))},percent:function(t,e){return!!(e.match(/^([\d]{1,3})(\.[\d]*)?%$/)&&(e=parseFloat(e))>=0&&e<=100)&&(this.set(t,e),!0)}};var g={"&amp;":"&","&lt;":"<","&gt;":">","&lrm;":"‎","&rlm;":"‏","&nbsp;":" "},v={c:"span",i:"i",b:"b",u:"u",ruby:"ruby",rt:"rt",v:"span",lang:"span"},b={v:"title",lang:"lang"},m={rt:"ruby"};function w(t,e){function r(){if(!e)return null;var t=e.match(/^([^<]*)(<[^>]+>?)?/);return function(t){return e=e.substr(t.length),t}(t[1]?t[1]:t[2])}function i(t){return g[t]}function n(t){for(;d=t.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);)t=t.replace(d[0],i);return t}function o(t,e){return!m[e.localName]||m[e.localName]===t.localName}function s(e,r){var i=v[e];if(!i)return null;var n=t.document.createElement(i);n.localName=i;var o=b[e];return o&&r&&(n[o]=r.trim()),n}for(var a,c=t.document.createElement("div"),h=c,l=[];null!==(a=r());)if("<"!==a[0])h.appendChild(t.document.createTextNode(n(a)));else{if("/"===a[1]){l.length&&l[l.length-1]===a.substr(2).replace(">","")&&(l.pop(),h=h.parentNode);continue}var f,p=u(a.substr(1,a.length-2));if(p){f=t.document.createProcessingInstruction("timestamp",p),h.appendChild(f);continue}var d=a.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);if(!d)continue;if(!(f=s(d[1],d[3])))continue;if(!o(h,f))continue;d[2]&&(f.className=d[2].substr(1).replace("."," ")),l.push(d[1]),h.appendChild(f),h=f}return c}var y=[1470,1472,1475,1478,1488,1489,1490,1491,1492,1493,1494,1495,1496,1497,1498,1499,1500,1501,1502,1503,1504,1505,1506,1507,1508,1509,1510,1511,1512,1513,1514,1520,1521,1522,1523,1524,1544,1547,1549,1563,1566,1567,1568,1569,1570,1571,1572,1573,1574,1575,1576,1577,1578,1579,1580,1581,1582,1583,1584,1585,1586,1587,1588,1589,1590,1591,1592,1593,1594,1595,1596,1597,1598,1599,1600,1601,1602,1603,1604,1605,1606,1607,1608,1609,1610,1645,1646,1647,1649,1650,1651,1652,1653,1654,1655,1656,1657,1658,1659,1660,1661,1662,1663,1664,1665,1666,1667,1668,1669,1670,1671,1672,1673,1674,1675,1676,1677,1678,1679,1680,1681,1682,1683,1684,1685,1686,1687,1688,1689,1690,1691,1692,1693,1694,1695,1696,1697,1698,1699,1700,1701,1702,1703,1704,1705,1706,1707,1708,1709,1710,1711,1712,1713,1714,1715,1716,1717,1718,1719,1720,1721,1722,1723,1724,1725,1726,1727,1728,1729,1730,1731,1732,1733,1734,1735,1736,1737,1738,1739,1740,1741,1742,1743,1744,1745,1746,1747,1748,1749,1765,1766,1774,1775,1786,1787,1788,1789,1790,1791,1792,1793,1794,1795,1796,1797,1798,1799,1800,1801,1802,1803,1804,1805,1807,1808,1810,1811,1812,1813,1814,1815,1816,1817,1818,1819,1820,1821,1822,1823,1824,1825,1826,1827,1828,1829,1830,1831,1832,1833,1834,1835,1836,1837,1838,1839,1869,1870,1871,1872,1873,1874,1875,1876,1877,1878,1879,1880,1881,1882,1883,1884,1885,1886,1887,1888,1889,1890,1891,1892,1893,1894,1895,1896,1897,1898,1899,1900,1901,1902,1903,1904,1905,1906,1907,1908,1909,1910,1911,1912,1913,1914,1915,1916,1917,1918,1919,1920,1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1941,1942,1943,1944,1945,1946,1947,1948,1949,1950,1951,1952,1953,1954,1955,1956,1957,1969,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2e3,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2036,2037,2042,2048,2049,2050,2051,2052,2053,2054,2055,2056,2057,2058,2059,2060,2061,2062,2063,2064,2065,2066,2067,2068,2069,2074,2084,2088,2096,2097,2098,2099,2100,2101,2102,2103,2104,2105,2106,2107,2108,2109,2110,2112,2113,2114,2115,2116,2117,2118,2119,2120,2121,2122,2123,2124,2125,2126,2127,2128,2129,2130,2131,2132,2133,2134,2135,2136,2142,2208,2210,2211,2212,2213,2214,2215,2216,2217,2218,2219,2220,8207,64285,64287,64288,64289,64290,64291,64292,64293,64294,64295,64296,64298,64299,64300,64301,64302,64303,64304,64305,64306,64307,64308,64309,64310,64312,64313,64314,64315,64316,64318,64320,64321,64323,64324,64326,64327,64328,64329,64330,64331,64332,64333,64334,64335,64336,64337,64338,64339,64340,64341,64342,64343,64344,64345,64346,64347,64348,64349,64350,64351,64352,64353,64354,64355,64356,64357,64358,64359,64360,64361,64362,64363,64364,64365,64366,64367,64368,64369,64370,64371,64372,64373,64374,64375,64376,64377,64378,64379,64380,64381,64382,64383,64384,64385,64386,64387,64388,64389,64390,64391,64392,64393,64394,64395,64396,64397,64398,64399,64400,64401,64402,64403,64404,64405,64406,64407,64408,64409,64410,64411,64412,64413,64414,64415,64416,64417,64418,64419,64420,64421,64422,64423,64424,64425,64426,64427,64428,64429,64430,64431,64432,64433,64434,64435,64436,64437,64438,64439,64440,64441,64442,64443,64444,64445,64446,64447,64448,64449,64467,64468,64469,64470,64471,64472,64473,64474,64475,64476,64477,64478,64479,64480,64481,64482,64483,64484,64485,64486,64487,64488,64489,64490,64491,64492,64493,64494,64495,64496,64497,64498,64499,64500,64501,64502,64503,64504,64505,64506,64507,64508,64509,64510,64511,64512,64513,64514,64515,64516,64517,64518,64519,64520,64521,64522,64523,64524,64525,64526,64527,64528,64529,64530,64531,64532,64533,64534,64535,64536,64537,64538,64539,64540,64541,64542,64543,64544,64545,64546,64547,64548,64549,64550,64551,64552,64553,64554,64555,64556,64557,64558,64559,64560,64561,64562,64563,64564,64565,64566,64567,64568,64569,64570,64571,64572,64573,64574,64575,64576,64577,64578,64579,64580,64581,64582,64583,64584,64585,64586,64587,64588,64589,64590,64591,64592,64593,64594,64595,64596,64597,64598,64599,64600,64601,64602,64603,64604,64605,64606,64607,64608,64609,64610,64611,64612,64613,64614,64615,64616,64617,64618,64619,64620,64621,64622,64623,64624,64625,64626,64627,64628,64629,64630,64631,64632,64633,64634,64635,64636,64637,64638,64639,64640,64641,64642,64643,64644,64645,64646,64647,64648,64649,64650,64651,64652,64653,64654,64655,64656,64657,64658,64659,64660,64661,64662,64663,64664,64665,64666,64667,64668,64669,64670,64671,64672,64673,64674,64675,64676,64677,64678,64679,64680,64681,64682,64683,64684,64685,64686,64687,64688,64689,64690,64691,64692,64693,64694,64695,64696,64697,64698,64699,64700,64701,64702,64703,64704,64705,64706,64707,64708,64709,64710,64711,64712,64713,64714,64715,64716,64717,64718,64719,64720,64721,64722,64723,64724,64725,64726,64727,64728,64729,64730,64731,64732,64733,64734,64735,64736,64737,64738,64739,64740,64741,64742,64743,64744,64745,64746,64747,64748,64749,64750,64751,64752,64753,64754,64755,64756,64757,64758,64759,64760,64761,64762,64763,64764,64765,64766,64767,64768,64769,64770,64771,64772,64773,64774,64775,64776,64777,64778,64779,64780,64781,64782,64783,64784,64785,64786,64787,64788,64789,64790,64791,64792,64793,64794,64795,64796,64797,64798,64799,64800,64801,64802,64803,64804,64805,64806,64807,64808,64809,64810,64811,64812,64813,64814,64815,64816,64817,64818,64819,64820,64821,64822,64823,64824,64825,64826,64827,64828,64829,64848,64849,64850,64851,64852,64853,64854,64855,64856,64857,64858,64859,64860,64861,64862,64863,64864,64865,64866,64867,64868,64869,64870,64871,64872,64873,64874,64875,64876,64877,64878,64879,64880,64881,64882,64883,64884,64885,64886,64887,64888,64889,64890,64891,64892,64893,64894,64895,64896,64897,64898,64899,64900,64901,64902,64903,64904,64905,64906,64907,64908,64909,64910,64911,64914,64915,64916,64917,64918,64919,64920,64921,64922,64923,64924,64925,64926,64927,64928,64929,64930,64931,64932,64933,64934,64935,64936,64937,64938,64939,64940,64941,64942,64943,64944,64945,64946,64947,64948,64949,64950,64951,64952,64953,64954,64955,64956,64957,64958,64959,64960,64961,64962,64963,64964,64965,64966,64967,65008,65009,65010,65011,65012,65013,65014,65015,65016,65017,65018,65019,65020,65136,65137,65138,65139,65140,65142,65143,65144,65145,65146,65147,65148,65149,65150,65151,65152,65153,65154,65155,65156,65157,65158,65159,65160,65161,65162,65163,65164,65165,65166,65167,65168,65169,65170,65171,65172,65173,65174,65175,65176,65177,65178,65179,65180,65181,65182,65183,65184,65185,65186,65187,65188,65189,65190,65191,65192,65193,65194,65195,65196,65197,65198,65199,65200,65201,65202,65203,65204,65205,65206,65207,65208,65209,65210,65211,65212,65213,65214,65215,65216,65217,65218,65219,65220,65221,65222,65223,65224,65225,65226,65227,65228,65229,65230,65231,65232,65233,65234,65235,65236,65237,65238,65239,65240,65241,65242,65243,65244,65245,65246,65247,65248,65249,65250,65251,65252,65253,65254,65255,65256,65257,65258,65259,65260,65261,65262,65263,65264,65265,65266,65267,65268,65269,65270,65271,65272,65273,65274,65275,65276,67584,67585,67586,67587,67588,67589,67592,67594,67595,67596,67597,67598,67599,67600,67601,67602,67603,67604,67605,67606,67607,67608,67609,67610,67611,67612,67613,67614,67615,67616,67617,67618,67619,67620,67621,67622,67623,67624,67625,67626,67627,67628,67629,67630,67631,67632,67633,67634,67635,67636,67637,67639,67640,67644,67647,67648,67649,67650,67651,67652,67653,67654,67655,67656,67657,67658,67659,67660,67661,67662,67663,67664,67665,67666,67667,67668,67669,67671,67672,67673,67674,67675,67676,67677,67678,67679,67840,67841,67842,67843,67844,67845,67846,67847,67848,67849,67850,67851,67852,67853,67854,67855,67856,67857,67858,67859,67860,67861,67862,67863,67864,67865,67866,67867,67872,67873,67874,67875,67876,67877,67878,67879,67880,67881,67882,67883,67884,67885,67886,67887,67888,67889,67890,67891,67892,67893,67894,67895,67896,67897,67903,67968,67969,67970,67971,67972,67973,67974,67975,67976,67977,67978,67979,67980,67981,67982,67983,67984,67985,67986,67987,67988,67989,67990,67991,67992,67993,67994,67995,67996,67997,67998,67999,68e3,68001,68002,68003,68004,68005,68006,68007,68008,68009,68010,68011,68012,68013,68014,68015,68016,68017,68018,68019,68020,68021,68022,68023,68030,68031,68096,68112,68113,68114,68115,68117,68118,68119,68121,68122,68123,68124,68125,68126,68127,68128,68129,68130,68131,68132,68133,68134,68135,68136,68137,68138,68139,68140,68141,68142,68143,68144,68145,68146,68147,68160,68161,68162,68163,68164,68165,68166,68167,68176,68177,68178,68179,68180,68181,68182,68183,68184,68192,68193,68194,68195,68196,68197,68198,68199,68200,68201,68202,68203,68204,68205,68206,68207,68208,68209,68210,68211,68212,68213,68214,68215,68216,68217,68218,68219,68220,68221,68222,68223,68352,68353,68354,68355,68356,68357,68358,68359,68360,68361,68362,68363,68364,68365,68366,68367,68368,68369,68370,68371,68372,68373,68374,68375,68376,68377,68378,68379,68380,68381,68382,68383,68384,68385,68386,68387,68388,68389,68390,68391,68392,68393,68394,68395,68396,68397,68398,68399,68400,68401,68402,68403,68404,68405,68416,68417,68418,68419,68420,68421,68422,68423,68424,68425,68426,68427,68428,68429,68430,68431,68432,68433,68434,68435,68436,68437,68440,68441,68442,68443,68444,68445,68446,68447,68448,68449,68450,68451,68452,68453,68454,68455,68456,68457,68458,68459,68460,68461,68462,68463,68464,68465,68466,68472,68473,68474,68475,68476,68477,68478,68479,68608,68609,68610,68611,68612,68613,68614,68615,68616,68617,68618,68619,68620,68621,68622,68623,68624,68625,68626,68627,68628,68629,68630,68631,68632,68633,68634,68635,68636,68637,68638,68639,68640,68641,68642,68643,68644,68645,68646,68647,68648,68649,68650,68651,68652,68653,68654,68655,68656,68657,68658,68659,68660,68661,68662,68663,68664,68665,68666,68667,68668,68669,68670,68671,68672,68673,68674,68675,68676,68677,68678,68679,68680,126464,126465,126466,126467,126469,126470,126471,126472,126473,126474,126475,126476,126477,126478,126479,126480,126481,126482,126483,126484,126485,126486,126487,126488,126489,126490,126491,126492,126493,126494,126495,126497,126498,126500,126503,126505,126506,126507,126508,126509,126510,126511,126512,126513,126514,126516,126517,126518,126519,126521,126523,126530,126535,126537,126539,126541,126542,126543,126545,126546,126548,126551,126553,126555,126557,126559,126561,126562,126564,126567,126568,126569,126570,126572,126573,126574,126575,126576,126577,126578,126580,126581,126582,126583,126585,126586,126587,126588,126590,126592,126593,126594,126595,126596,126597,126598,126599,126600,126601,126603,126604,126605,126606,126607,126608,126609,126610,126611,126612,126613,126614,126615,126616,126617,126618,126619,126625,126626,126627,126629,126630,126631,126632,126633,126635,126636,126637,126638,126639,126640,126641,126642,126643,126644,126645,126646,126647,126648,126649,126650,126651,1114109];function x(){}function S(t,e,r){var i="undefined"!=typeof navigator&&/MSIE\s8\.0/.test(navigator.userAgent),n="rgba(255, 255, 255, 1)",o="rgba(0, 0, 0, 0.8)",s="";void 0!==c&&(n=c.fontSet,o=c.backgroundSet,s=c.edgeSet),i&&(n="rgb(255, 255, 255)",o="rgb(0, 0, 0)"),x.call(this),this.cue=e,this.cueDiv=w(t,e.text);var a={color:n,backgroundColor:o,textShadow:s,position:"relative",left:0,right:0,top:0,bottom:0,display:"inline"};i||(a.writingMode=""===e.vertical?"horizontal-tb":"lr"===e.vertical?"vertical-lr":"vertical-rl",a.unicodeBidi="plaintext"),this.applyStyles(a,this.cueDiv),this.div=t.document.createElement("div"),a={textAlign:"middle"===e.align?"center":e.align,font:r.font,whiteSpace:"pre-line",position:"absolute"},i||(a.direction=function(t){var e,r=[],i="";if(!t||!t.childNodes)return"ltr";function n(t,e){for(var r=e.childNodes.length-1;r>=0;r--)t.push(e.childNodes[r])}function o(t){if(!t||!t.length)return null;var e=t.pop(),r=e.textContent||e.innerText;if(r){var i=r.match(/^.*(\n|\r)/);return i?(t.length=0,i[0]):r}return"ruby"===e.tagName?o(t):e.childNodes?(n(t,e),o(t)):void 0}for(n(r,t);i=o(r);)for(var s=0;s<i.length;s++){e=i.charCodeAt(s);for(var a=0;a<y.length;a++)if(y[a]===e)return"rtl"}return"ltr"}(this.cueDiv),a.writingMode=""===e.vertical?"horizontal-tb":"lr"===e.vertical?"vertical-lr":"vertical-rl".stylesunicodeBidi="plaintext"),this.applyStyles(a),this.div.appendChild(this.cueDiv);var h=0;switch(e.positionAlign){case"start":h=e.position;break;case"middle":h=e.position-e.size/2;break;case"end":h=e.position-e.size}""===e.vertical?this.applyStyles({left:this.formatStyle(h,"%"),width:this.formatStyle(e.size,"%")}):this.applyStyles({top:this.formatStyle(h,"%"),height:this.formatStyle(e.size,"%")}),this.move=function(t){this.applyStyles({top:this.formatStyle(t.top,"px"),bottom:this.formatStyle(t.bottom,"px"),left:this.formatStyle(t.left,"px"),right:this.formatStyle(t.right,"px"),height:this.formatStyle(t.height,"px"),width:this.formatStyle(t.width,"px")})}}function E(t){var e,r,i,n,o="undefined"!=typeof navigator&&/MSIE\s8\.0/.test(navigator.userAgent);if(t.div){r=t.div.offsetHeight,i=t.div.offsetWidth,n=t.div.offsetTop;var s=(s=t.div.childNodes)&&(s=s[0])&&s.getClientRects&&s.getClientRects();t=t.div.getBoundingClientRect(),e=s?Math.max(s[0]&&s[0].height||0,t.height/s.length):0}this.left=t.left,this.right=t.right,this.top=t.top||n,this.height=t.height||r,this.bottom=t.bottom||n+(t.height||r),this.width=t.width||i,this.lineHeight=void 0!==e?e:t.lineHeight,o&&!this.lineHeight&&(this.lineHeight=13)}function T(t,e,r,i){var n=new E(e),o=e.cue,s=function(t){if("number"==typeof t.line&&(t.snapToLines||t.line>=0&&t.line<=100))return t.line;if(!t.track||!t.track.textTrackList||!t.track.textTrackList.mediaElement)return-1;for(var e=t.track,r=e.textTrackList,i=0,n=0;n<r.length&&r[n]!==e;n++)"showing"===r[n].mode&&i++;return-1*++i}(o),a=[];if(o.snapToLines){var c;switch(o.vertical){case"":a=["+y","-y"],c="height";break;case"rl":a=["+x","-x"],c="width";break;case"lr":a=["-x","+x"],c="width"}var h=n.lineHeight,l=h*Math.round(s),u=r[c]+h,f=a[0];Math.abs(l)>u&&(l=l<0?-1:1,l*=Math.ceil(u/h)*h),s<0&&(l+=""===o.vertical?r.height:r.width,a=a.reverse()),n.move(f,l)}else{var p=n.lineHeight/r.height*100;switch(o.lineAlign){case"middle":s-=p/2;break;case"end":s-=p}switch(o.vertical){case"":e.applyStyles({top:e.formatStyle(s,"%")});break;case"rl":e.applyStyles({left:e.formatStyle(s,"%")});break;case"lr":e.applyStyles({right:e.formatStyle(s,"%")})}a=["+y","-x","+x","-y"],n=new E(e)}var d=function(t,e){for(var n,o=new E(t),s=1,a=0;a<e.length;a++){for(;t.overlapsOppositeAxis(r,e[a])||t.within(r)&&t.overlapsAny(i);)t.move(e[a]);if(t.within(r))return t;var c=t.intersectPercentage(r);s>c&&(n=new E(t),s=c),t=new E(o)}return n||o}(n,a);e.move(d.toCSSCompatValues(r))}x.prototype.applyStyles=function(t,e){for(var r in e=e||this.div,t)t.hasOwnProperty(r)&&(e.style[r]=t[r])},x.prototype.formatStyle=function(t,e){return 0===t?0:t+e},S.prototype=h(x.prototype),S.prototype.constructor=S,E.prototype.move=function(t,e){switch(e=void 0!==e?e:this.lineHeight,t){case"+x":this.left+=e,this.right+=e;break;case"-x":this.left-=e,this.right-=e;break;case"+y":this.top+=e,this.bottom+=e;break;case"-y":this.top-=e,this.bottom-=e}},E.prototype.overlaps=function(t){return this.left<t.right&&this.right>t.left&&this.top<t.bottom&&this.bottom>t.top},E.prototype.overlapsAny=function(t){for(var e=0;e<t.length;e++)if(this.overlaps(t[e]))return!0;return!1},E.prototype.within=function(t){return this.top>=t.top&&this.bottom<=t.bottom&&this.left>=t.left&&this.right<=t.right},E.prototype.overlapsOppositeAxis=function(t,e){switch(e){case"+x":return this.left<t.left;case"-x":return this.right>t.right;case"+y":return this.top<t.top;case"-y":return this.bottom>t.bottom}},E.prototype.intersectPercentage=function(t){return Math.max(0,Math.min(this.right,t.right)-Math.max(this.left,t.left))*Math.max(0,Math.min(this.bottom,t.bottom)-Math.max(this.top,t.top))/(this.height*this.width)},E.prototype.toCSSCompatValues=function(t){return{top:this.top-t.top,bottom:t.bottom-this.bottom,left:this.left-t.left,right:t.right-this.right,height:this.height,width:this.width}},E.getSimpleBoxPosition=function(t){var e=t.div?t.div.offsetHeight:t.tagName?t.offsetHeight:0,r=t.div?t.div.offsetWidth:t.tagName?t.offsetWidth:0,i=t.div?t.div.offsetTop:t.tagName?t.offsetTop:0;return{left:(t=t.div?t.div.getBoundingClientRect():t.tagName?t.getBoundingClientRect():t).left,right:t.right,top:t.top||i,height:t.height||e,bottom:t.bottom||i+(t.height||e),width:t.width||r}},n.StringDecoder=function(){return{decode:function(t){if(!t)return"";if("string"!=typeof t)throw new Error("Error - expected string data.");return decodeURIComponent(encodeURIComponent(t))}}},n.convertCueToDOMTree=function(t,e){return t&&e?w(t,e):null};n.processCues=function(t,e,r){if(!t||!e||!r)return null;for(;r.firstChild;)r.removeChild(r.firstChild);var i=t.document.createElement("div");if(i.style.position="absolute",i.style.left="0",i.style.right="0",i.style.top="0",i.style.bottom="0",i.style.margin="1.5%",r.appendChild(i),function(t){for(var e=0;e<t.length;e++)if(t[e].hasBeenReset||!t[e].displayState)return!0;return!1}(e)){var n=[],o=E.getSimpleBoxPosition(i),a={font:Math.round(.05*o.height*100)/100*s+"px sans-serif"};!function(){for(var r,s,c=0;c<e.length;c++)s=e[c],r=new S(t,s,a),i.appendChild(r.div),T(0,r,o,n),s.displayState=r.div,n.push(E.getSimpleBoxPosition(r))}()}else for(var c=0;c<e.length;c++)i.appendChild(e[c].displayState)},(n.Parser=function(t,e){this.window=t,this.state="INITIAL",this.buffer="",this.decoder=e||new TextDecoder("utf8"),this.regionList=[]}).prototype={reportOrThrowError:function(t){if(!(t instanceof l))throw t;this.onparsingerror&&this.onparsingerror(t)},parse:function(t,e){var r=this;function i(){for(var t=r.buffer,e=0;e<t.length&&"\r"!==t[e]&&"\n"!==t[e];)++e;var i=t.substr(0,e);return"\r"===t[e]&&++e,"\n"===t[e]&&++e,r.buffer=t.substr(e),i}function n(t){p(t,function(t,e){switch(t){case"Region":!function(t){var e=new f;if(p(t,function(t,r){switch(t){case"id":e.set(t,r);break;case"width":e.percent(t,r);break;case"lines":e.integer(t,r);break;case"regionanchor":case"viewportanchor":var i=r.split(",");if(2!==i.length)break;var n=new f;if(n.percent("x",i[0]),n.percent("y",i[1]),!n.has("x")||!n.has("y"))break;e.set(t+"X",n.get("x")),e.set(t+"Y",n.get("y"));break;case"scroll":e.alt(t,r,["up"])}},/=/,/\s/),e.has("id")){var i=new r.window.VTTRegion;i.width=e.get("width",100),i.lines=e.get("lines",3),i.regionAnchorX=e.get("regionanchorX",0),i.regionAnchorY=e.get("regionanchorY",100),i.viewportAnchorX=e.get("viewportanchorX",0),i.viewportAnchorY=e.get("viewportanchorY",100),i.scroll=e.get("scroll",""),r.onregion&&r.onregion(i),r.regionList.push({id:e.get("id"),region:i})}}(e)}},/:/)}t&&(r.buffer+=r.decoder.decode(t,{stream:!0}));try{var o;if("INITIAL"===r.state){if(!/\r\n|\n/.test(r.buffer))return this;var s=(o=i()).match(/^WEBVTT([ \t].*)?$/);if(!s||!s[0])throw new l(l.Errors.BadSignature);r.state="HEADER"}for(var a=!1;r.buffer;){if(!/\r\n|\n/.test(r.buffer))return this;switch(a?a=!1:o=i(),r.state){case"HEADER":/:/.test(o)?n(o):o||(r.state="ID");continue;case"NOTE":o||(r.state="ID");continue;case"ID":if(/^NOTE($|[ \t])/.test(o)){r.state="NOTE";break}if(!o)continue;if(r.cue=new r.window.VTTCue(0,0,""),r.state="CUE",-1===o.indexOf("--\x3e")){r.cue.id=o;continue}case"CUE":try{d(o,r.cue,r.regionList)}catch(t){r.reportOrThrowError(t),r.cue=null,r.state="BADCUE";continue}r.state="CUETEXT";continue;case"CUETEXT":var c=-1!==o.indexOf("--\x3e");if(!o||c&&(a=!0)){r.oncue&&r.oncue(r.cue),r.cue=null,r.state="ID";continue}r.cue.text&&(r.cue.text+="\n"),r.cue.text+=o;continue;case"BADCUE":o||(r.state="ID");continue}}if(!e)return"CUETEXT"===r.state&&r.cue&&r.oncue&&r.oncue(r.cue),r.flush(),this}catch(t){r.reportOrThrowError(t),"CUETEXT"===r.state&&r.cue&&r.oncue&&r.oncue(r.cue),r.cue=null,r.state="INITIAL"===r.state?"BADWEBVTT":"BADCUE"}return this},flush:function(){try{if(this.buffer+=this.decoder.decode(),(this.cue||"HEADER"===this.state)&&(this.buffer+="\n\n",this.parse(null,!0)),"INITIAL"===this.state)throw new l(l.Errors.BadSignature)}catch(t){this.reportOrThrowError(t)}return this.onflush&&this.onflush(),this}},e.default=n}}]);