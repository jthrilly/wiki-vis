
$(document).ready(function() {
	var map;

	// create a map in the "map" div, set the view to a given place and zoom
	map = L.map('map').setView([45.0, -110.0], 3);

	var baseLayer = new L.StamenTileLayer('toner');
	
	baseLayer.addTo(map);

	var loadData = function (data) {
		var colorFunction1 = new L.HSLLuminosityFunction(new L.Point(1,0.75), new L.Point(55,0.2), {outputHue: 240, outputSaturation: '0%'});
		var fillColorFunction1 = new L.HSLLuminosityFunction(new L.Point(1,0.9), new L.Point(55,0.5), {outputHue: 240, outputSaturation: '0%'});

		var electionData = {"state":"US","total":122196252,"candidates":{"59722":"Lib|Phillies|George Phillies","56224":"Ind|Duncan|Richard Duncan","3635":"AIP|Keyes|Alan Keyes","11527":"Lib|Barr|Bob Barr","12619":"Grn|McKinney|Cynthia McKinney","59661":"PCF|Lyttle|Bradford Lyttle","59660":"Obj|Stevens|Thomas Stevens","59207":"New|Polachek|John Joseph Polachek","59208":"AKI|Baldwin|Chuck Baldwin","100013":"NPD|None of these candidates| None of these candidates","3850":"Ind|Nader|Ralph Nader","28726":"RP|Weill|Ted Weill","59886":"Ind|Wamboldt|Jeffrey Wamboldt","302":"GOP|Paul|Ron Paul","3486":"SWP|Harris|James Harris","1918":"Dem|Obama|Barack Obama","7623":"PSL|La Riva|Gloria La Riva","59659":"HQ8|Allen|Jonathan Allen","59593":"Ind|Boss|Jeffrey Boss","1701":"GOP|McCain|John McCain","57761":"Una|McEnulty|Frank McEnulty","51183":"SWP|Calero|Roger Calero","1243":"SPU|Moore|Brian Moore","51335":"BoT|Jay|Charles Jay","51331":"Pro|Amondson|Gene Amondson"},"locals":{"Mississippi":{"name":"Mississippi","electoral":6,"fix":{"Jeff Davis":"Jefferson Davis"},"precincts":{"total":1887,"reporting":1885},"races":{"President":{"":{"votes":[{"votes":684475,"electoral":6,"id":"1701"},{"votes":517899,"electoral":0,"id":"1918"},{"votes":3719,"electoral":0,"id":"3850"},{"votes":2441,"electoral":0,"id":"59208"},{"votes":2416,"electoral":0,"id":"11527"},{"votes":1086,"electoral":0,"id":"12619"},{"votes":470,"electoral":0,"id":"28726"}],"final":"1701"}}},"abbr":"MS"},"Oklahoma":{"name":"Oklahoma","electoral":7,"fix":{"LeFlore":"Le Flore"},"precincts":{"total":2231,"reporting":2231},"races":{"President":{"":{"votes":[{"votes":959645,"electoral":7,"id":"1701"},{"votes":502286,"electoral":0,"id":"1918"}],"final":"1701"}}},"abbr":"OK"},"Delaware":{"name":"Delaware","precincts":{"total":339,"reporting":339},"electoral":3,"races":{"President":{"":{"votes":[{"votes":247386,"electoral":3,"id":"1918"},{"votes":151667,"electoral":0,"id":"1701"},{"votes":2401,"electoral":0,"id":"3850"},{"votes":1108,"electoral":0,"id":"11527"},{"votes":626,"electoral":0,"id":"59208"},{"votes":385,"electoral":0,"id":"12619"},{"votes":58,"electoral":0,"id":"51183"}],"final":"1918"}}},"abbr":"DE"},"Minnesota":{"name":"Minnesota","electoral":10,"fix":{"Lac Qui Parle":"Lac qui Parle"},"precincts":{"total":4130,"reporting":4130},"races":{"President":{"":{"votes":[{"votes":1573140,"electoral":10,"id":"1918"},{"votes":1275353,"electoral":0,"id":"1701"},{"votes":30154,"electoral":0,"id":"3850"},{"votes":9176,"electoral":0,"id":"11527"},{"votes":6787,"electoral":0,"id":"59208"},{"votes":5210,"electoral":0,"id":"12619"},{"votes":790,"electoral":0,"id":"51183"}],"final":"1918"}}},"abbr":"MN"},"Illinois":{"name":"Illinois","electoral":21,"fix":{"JoDaviess":"Jo Daviess","DeWitt":"De Witt","LaSalle":"La Salle"},"precincts":{"total":11585,"reporting":11537},"races":{"President":{"":{"votes":[{"votes":3293340,"electoral":21,"id":"1918"},{"votes":1975801,"electoral":0,"id":"1701"},{"votes":30417,"electoral":0,"id":"3850"},{"votes":19061,"electoral":0,"id":"11527"},{"votes":11629,"electoral":0,"id":"12619"},{"votes":8106,"electoral":0,"id":"59208"},{"votes":1223,"electoral":0,"id":"59207"}],"final":"1918"}}},"abbr":"IL"},"Arkansas":{"name":"Arkansas","electoral":6,"fix":{"Saint Francis":"St. Francis"},"precincts":{"total":2588,"reporting":2588},"races":{"President":{"":{"votes":[{"votes":632672,"electoral":6,"id":"1701"},{"votes":418049,"electoral":0,"id":"1918"},{"votes":12808,"electoral":0,"id":"3850"},{"votes":4707,"electoral":0,"id":"11527"},{"votes":4000,"electoral":0,"id":"59208"},{"votes":3433,"electoral":0,"id":"12619"},{"votes":1089,"electoral":0,"id":"7623"}],"final":"1701"}}},"abbr":"AR"},"New Mexico":{"name":"New Mexico","electoral":5,"fix":{"DeBaca":"De Baca"},"precincts":{"total":1498,"reporting":1498},"races":{"President":{"":{"votes":[{"votes":454291,"electoral":5,"id":"1918"},{"votes":334298,"electoral":0,"id":"1701"},{"votes":5059,"electoral":0,"id":"3850"},{"votes":2325,"electoral":0,"id":"11527"},{"votes":1537,"electoral":0,"id":"59208"},{"votes":1525,"electoral":0,"id":"12619"}],"final":"1918"}}},"abbr":"NM"},"Indiana":{"name":"Indiana","precincts":{"total":5230,"reporting":5223},"electoral":11,"races":{"President":{"":{"votes":[{"votes":1367264,"electoral":11,"id":"1918"},{"votes":1341101,"electoral":0,"id":"1701"},{"votes":29186,"electoral":0,"id":"11527"}],"final":"1918"}}},"abbr":"IN"},"Maryland":{"name":"Maryland","precincts":{"total":1829,"reporting":1804},"electoral":10,"races":{"President":{"":{"votes":[{"votes":1409150,"electoral":10,"id":"1918"},{"votes":873320,"electoral":0,"id":"1701"},{"votes":13291,"electoral":0,"id":"3850"},{"votes":8903,"electoral":0,"id":"11527"},{"votes":4237,"electoral":0,"id":"12619"},{"votes":3415,"electoral":0,"id":"59208"}],"final":"1918"}}},"abbr":"MD"},"Louisiana":{"name":"Louisiana","electoral":9,"fix":{"DeSoto":"De Soto","Jeff Davis":"Jefferson Davis","LaSalle":"La Salle"},"precincts":{"total":3956,"reporting":3956},"races":{"President":{"":{"votes":[{"votes":1147603,"electoral":9,"id":"1701"},{"votes":780981,"electoral":0,"id":"1918"},{"votes":9353,"electoral":0,"id":"302"},{"votes":9184,"electoral":0,"id":"12619"},{"votes":6991,"electoral":0,"id":"3850"},{"votes":2579,"electoral":0,"id":"59208"},{"votes":739,"electoral":0,"id":"3486"},{"votes":354,"electoral":0,"id":"7623"},{"votes":275,"electoral":0,"id":"51331"}],"final":"1701"}}},"abbr":"LA"},"Idaho":{"name":"Idaho","precincts":{"total":954,"reporting":954},"electoral":4,"races":{"President":{"":{"votes":[{"votes":400989,"electoral":4,"id":"1701"},{"votes":235219,"electoral":0,"id":"1918"},{"votes":7096,"electoral":0,"id":"3850"},{"votes":4725,"electoral":0,"id":"59208"},{"votes":3649,"electoral":0,"id":"11527"}],"final":"1701"}}},"abbr":"ID"},"Wyoming":{"name":"Wyoming","precincts":{"total":490,"reporting":490},"electoral":3,"races":{"President":{"":{"votes":[{"votes":160639,"electoral":3,"id":"1701"},{"votes":80496,"electoral":0,"id":"1918"},{"votes":2465,"electoral":0,"id":"3850"},{"votes":1557,"electoral":0,"id":"11527"},{"votes":1172,"electoral":0,"id":"59208"}],"final":"1701"}}},"abbr":"WY"},"Tennessee":{"name":"Tennessee","precincts":{"total":2258,"reporting":2258},"electoral":11,"races":{"President":{"":{"votes":[{"votes":1487564,"electoral":11,"id":"1701"},{"votes":1093213,"electoral":0,"id":"1918"},{"votes":11656,"electoral":0,"id":"3850"},{"votes":8559,"electoral":0,"id":"11527"},{"votes":8185,"electoral":0,"id":"59208"},{"votes":2490,"electoral":0,"id":"12619"},{"votes":1327,"electoral":0,"id":"1243"},{"votes":1011,"electoral":0,"id":"51335"}],"final":"1701"}}},"abbr":"TN"},"Arizona":{"name":"Arizona","precincts":{"total":2239,"reporting":2224},"electoral":10,"races":{"President":{"":{"votes":[{"votes":1013979,"electoral":10,"id":"1701"},{"votes":852809,"electoral":0,"id":"1918"},{"votes":10411,"electoral":0,"id":"11527"},{"votes":9183,"electoral":0,"id":"3850"},{"votes":2786,"electoral":0,"id":"12619"}],"final":"1701"}}},"abbr":"AZ"},"Iowa":{"name":"Iowa","precincts":{"total":1873,"reporting":1873},"electoral":7,"races":{"President":{"":{"votes":[{"votes":818240,"electoral":7,"id":"1918"},{"votes":677508,"electoral":0,"id":"1701"},{"votes":7992,"electoral":0,"id":"3850"},{"votes":4619,"electoral":0,"id":"11527"},{"votes":4427,"electoral":0,"id":"59208"},{"votes":1500,"electoral":0,"id":"12619"},{"votes":662,"electoral":0,"id":"3486"},{"votes":504,"electoral":0,"id":"1243"},{"votes":363,"electoral":0,"id":"7623"}],"final":"1918"}}},"abbr":"IA"},"Michigan":{"name":"Michigan","precincts":{"total":5763,"reporting":5763},"electoral":17,"races":{"President":{"":{"votes":[{"votes":2867680,"electoral":17,"id":"1918"},{"votes":2044405,"electoral":0,"id":"1701"},{"votes":33356,"electoral":0,"id":"3850"},{"votes":23962,"electoral":0,"id":"11527"},{"votes":14973,"electoral":0,"id":"59208"},{"votes":9123,"electoral":0,"id":"12619"}],"final":"1918"}}},"abbr":"MI"},"Kansas":{"name":"Kansas","electoral":6,"precincts":{"total":3298,"reporting":3298},"races":{"President":{"":{"votes":[{"votes":685541,"electoral":6,"id":"1701"},{"votes":499979,"electoral":0,"id":"1918"},{"votes":10242,"electoral":0,"id":"3850"},{"votes":6564,"electoral":0,"id":"11527"},{"votes":4051,"electoral":0,"id":"59208"}],"final":"1701"}}},"abbr":"KS","votesby":"district"},"Utah":{"name":"Utah","precincts":{"total":2245,"reporting":2245},"electoral":5,"races":{"President":{"":{"votes":[{"votes":555497,"electoral":5,"id":"1701"},{"votes":301771,"electoral":0,"id":"1918"},{"votes":11131,"electoral":0,"id":"59208"},{"votes":7644,"electoral":0,"id":"3850"},{"votes":6461,"electoral":0,"id":"11527"},{"votes":908,"electoral":0,"id":"12619"},{"votes":246,"electoral":0,"id":"7623"}],"final":"1701"}}},"abbr":"UT"},"Virginia":{"name":"Virginia","electoral":13,"fix":{},"precincts":{"total":2487,"reporting":2474},"races":{"President":{"":{"votes":[{"votes":1792502,"electoral":13,"id":"1918"},{"votes":1637338,"electoral":0,"id":"1701"},{"votes":10814,"electoral":0,"id":"3850"},{"votes":10568,"electoral":0,"id":"11527"},{"votes":7185,"electoral":0,"id":"59208"},{"votes":2306,"electoral":0,"id":"12619"}],"final":"1918"}}},"abbr":"VA"},"Oregon":{"name":"Oregon","precincts":{"total":1000,"reporting":738},"electoral":7,"races":{"President":{"":{"votes":[{"votes":818973,"electoral":7,"id":"1918"},{"votes":588191,"electoral":0,"id":"1701"},{"votes":14508,"electoral":0,"id":"3850"},{"votes":5939,"electoral":0,"id":"59208"},{"votes":5866,"electoral":0,"id":"11527"},{"votes":3480,"electoral":0,"id":"12619"}],"final":"1918"}}},"abbr":"OR"},"Connecticut":{"name":"Connecticut","electoral":7,"precincts":{"total":759,"reporting":745},"races":{"President":{"":{"votes":[{"votes":943819,"electoral":7,"id":"1918"},{"votes":606268,"electoral":0,"id":"1701"},{"votes":17665,"electoral":0,"id":"3850"}],"final":"1918"}}},"abbr":"CT","votesby":"town"},"Montana":{"name":"Montana","electoral":3,"fix":{"Lewis & Clark":"Lewis and Clark"},"precincts":{"total":863,"reporting":863},"races":{"President":{"":{"votes":[{"votes":241816,"electoral":3,"id":"1701"},{"votes":229725,"electoral":0,"id":"1918"},{"votes":10499,"electoral":0,"id":"302"},{"votes":3649,"electoral":0,"id":"3850"},{"votes":1341,"electoral":0,"id":"11527"}],"final":"1701"}}},"abbr":"MT"},"California":{"name":"California","precincts":{"total":25429,"reporting":24702},"electoral":55,"races":{"President":{"":{"votes":[{"votes":6219123,"electoral":55,"id":"1918"},{"votes":3777314,"electoral":0,"id":"1701"},{"votes":79672,"electoral":0,"id":"3850"},{"votes":50336,"electoral":0,"id":"11527"},{"votes":30023,"electoral":0,"id":"3635"},{"votes":28045,"electoral":0,"id":"12619"}],"final":"1918"}}},"abbr":"CA"},"Massachusetts":{"name":"Massachusetts","electoral":12,"fix":{"Barnstable":"Barnstable Town","Manchester":"Manchester-by-the-Sea"},"precincts":{"total":2168,"reporting":2168},"races":{"President":{"":{"votes":[{"votes":1891083,"electoral":12,"id":"1918"},{"votes":1104284,"electoral":0,"id":"1701"},{"votes":28520,"electoral":0,"id":"3850"},{"votes":12996,"electoral":0,"id":"11527"},{"votes":6528,"electoral":0,"id":"12619"},{"votes":5024,"electoral":0,"id":"59208"}],"final":"1918"}}},"abbr":"MA","votesby":"town"},"West Virginia":{"name":"West Virginia","precincts":{"total":1887,"reporting":1887},"electoral":5,"races":{"President":{"":{"votes":[{"votes":394278,"electoral":5,"id":"1701"},{"votes":301438,"electoral":0,"id":"1918"},{"votes":7173,"electoral":0,"id":"3850"},{"votes":2458,"electoral":0,"id":"59208"},{"votes":2355,"electoral":0,"id":"12619"}],"final":"1701"}}},"abbr":"WV"},"South Carolina":{"name":"South Carolina","precincts":{"total":2291,"reporting":2290},"electoral":8,"races":{"President":{"":{"votes":[{"votes":1015632,"electoral":8,"id":"1701"},{"votes":848497,"electoral":0,"id":"1918"},{"votes":7198,"electoral":0,"id":"11527"},{"votes":6608,"electoral":0,"id":"59208"},{"votes":4976,"electoral":0,"id":"3850"},{"votes":4420,"electoral":0,"id":"12619"}],"final":"1701"}}},"abbr":"SC"},"New Hampshire":{"name":"New Hampshire","electoral":4,"fix":{"":"Atkinson and Gilmanton Academy"},"precincts":{"total":301,"reporting":288},"races":{"President":{"":{"votes":[{"votes":371784,"electoral":4,"id":"1918"},{"votes":307161,"electoral":0,"id":"1701"},{"votes":3298,"electoral":0,"id":"3850"},{"votes":2069,"electoral":0,"id":"11527"},{"votes":486,"electoral":0,"id":"59722"}],"final":"1918"}}},"abbr":"NH","votesby":"town"},"Wisconsin":{"name":"Wisconsin","precincts":{"total":3621,"reporting":3621},"electoral":10,"races":{"President":{"":{"votes":[{"votes":1670474,"electoral":10,"id":"1918"},{"votes":1258181,"electoral":0,"id":"1701"},{"votes":17402,"electoral":0,"id":"3850"},{"votes":8795,"electoral":0,"id":"11527"},{"votes":5022,"electoral":0,"id":"59208"},{"votes":4234,"electoral":0,"id":"12619"},{"votes":770,"electoral":0,"id":"59886"},{"votes":539,"electoral":0,"id":"1243"},{"votes":236,"electoral":0,"id":"7623"}],"final":"1918"}}},"abbr":"WI"},"Vermont":{"name":"Vermont","electoral":3,"precincts":{"total":260,"reporting":252},"races":{"President":{"":{"votes":[{"votes":201999,"electoral":3,"id":"1918"},{"votes":95422,"electoral":0,"id":"1701"},{"votes":2989,"electoral":0,"id":"3850"},{"votes":964,"electoral":0,"id":"11527"},{"votes":496,"electoral":0,"id":"59208"},{"votes":194,"electoral":0,"id":"1243"},{"votes":139,"electoral":0,"id":"51183"},{"votes":134,"electoral":0,"id":"7623"}],"final":"1918"}}},"abbr":"VT","votesby":"town"},"Georgia":{"name":"Georgia","precincts":{"total":3303,"reporting":3272},"electoral":15,"races":{"President":{"":{"votes":[{"votes":2022409,"electoral":15,"id":"1701"},{"votes":1811198,"electoral":0,"id":"1918"},{"votes":28420,"electoral":0,"id":"11527"}],"final":"1701"}}},"abbr":"GA"},"North Dakota":{"name":"North Dakota","precincts":{"total":528,"reporting":528},"electoral":3,"races":{"President":{"":{"votes":[{"votes":168523,"electoral":3,"id":"1701"},{"votes":141113,"electoral":0,"id":"1918"},{"votes":4234,"electoral":0,"id":"3850"},{"votes":1064,"electoral":0,"id":"11527"},{"votes":1053,"electoral":0,"id":"59208"}],"final":"1701"}}},"abbr":"ND"},"Pennsylvania":{"name":"Pennsylvania","precincts":{"total":9284,"reporting":9253},"electoral":21,"races":{"President":{"":{"votes":[{"votes":3185991,"electoral":21,"id":"1918"},{"votes":2585480,"electoral":0,"id":"1701"},{"votes":41499,"electoral":0,"id":"3850"},{"votes":19917,"electoral":0,"id":"11527"}],"final":"1918"}}},"abbr":"PA"},"Florida":{"name":"Florida","precincts":{"total":7005,"reporting":6992},"electoral":27,"races":{"President":{"":{"votes":[{"votes":4103638,"electoral":27,"id":"1918"},{"votes":3908736,"electoral":0,"id":"1701"},{"votes":27154,"electoral":0,"id":"3850"},{"votes":16587,"electoral":0,"id":"11527"},{"votes":7673,"electoral":0,"id":"59208"},{"votes":2758,"electoral":0,"id":"12619"},{"votes":2430,"electoral":0,"id":"3635"},{"votes":1462,"electoral":0,"id":"7623"},{"votes":774,"electoral":0,"id":"51335"},{"votes":520,"electoral":0,"id":"3486"},{"votes":404,"electoral":0,"id":"59660"},{"votes":386,"electoral":0,"id":"1243"},{"votes":282,"electoral":0,"id":"51331"}],"final":"1918"}}},"abbr":"FL"},"Alaska":{"name":"Alaska","precincts":{"total":438,"reporting":435},"electoral":3,"races":{"President":{"":{"votes":[{"votes":136348,"electoral":3,"id":"1701"},{"votes":80340,"electoral":0,"id":"1918"},{"votes":2677,"electoral":0,"id":"3850"},{"votes":1223,"electoral":0,"id":"59208"},{"votes":1090,"electoral":0,"id":"11527"}],"final":"1701"}}},"abbr":"AK"},"Kentucky":{"name":"Kentucky","electoral":8,"fix":{"LaRue":"Larue"},"precincts":{"total":3541,"reporting":3541},"races":{"President":{"":{"votes":[{"votes":1050599,"electoral":8,"id":"1701"},{"votes":751515,"electoral":0,"id":"1918"},{"votes":15402,"electoral":0,"id":"3850"},{"votes":5960,"electoral":0,"id":"11527"},{"votes":4621,"electoral":0,"id":"59208"}],"final":"1701"}}},"abbr":"KY"},"Hawaii":{"name":"Hawaii","precincts":{"total":338,"reporting":338},"electoral":4,"races":{"President":{"":{"votes":[{"votes":298621,"electoral":4,"id":"1918"},{"votes":110848,"electoral":0,"id":"1701"},{"votes":3461,"electoral":0,"id":"3850"},{"votes":1226,"electoral":0,"id":"11527"},{"votes":945,"electoral":0,"id":"59208"},{"votes":894,"electoral":0,"id":"12619"}],"final":"1918"}}},"abbr":"HI"},"Nebraska":{"name":"Nebraska","precincts":{"total":1708,"reporting":1707},"electoral":5,"races":{"President":{"":{"votes":[{"votes":439421,"electoral":4,"id":"1701"},{"votes":315913,"electoral":0,"id":"1918"},{"votes":5212,"electoral":0,"id":"3850"},{"votes":2902,"electoral":0,"id":"59208"},{"votes":2626,"electoral":0,"id":"11527"},{"votes":982,"electoral":0,"id":"12619"}],"final":"1701"}}},"abbr":"NE"},"Missouri":{"name":"Missouri","electoral":11,"fix":{"LaClede":"Laclede"},"precincts":{"total":3533,"reporting":3533},"races":{"President":{"":{"votes":[{"votes":1442613,"electoral":0,"id":"1701"},{"votes":1436745,"electoral":0,"id":"1918"},{"votes":17769,"electoral":0,"id":"3850"},{"votes":11355,"electoral":0,"id":"11527"},{"votes":8181,"electoral":0,"id":"59208"}]}}},"abbr":"MO"},"Ohio":{"name":"Ohio","precincts":{"total":11156,"reporting":10962},"electoral":20,"races":{"President":{"":{"votes":[{"votes":2673958,"electoral":20,"id":"1918"},{"votes":2469544,"electoral":0,"id":"1701"},{"votes":39001,"electoral":0,"id":"3850"},{"votes":18239,"electoral":0,"id":"11527"},{"votes":12607,"electoral":0,"id":"59208"},{"votes":7792,"electoral":0,"id":"12619"},{"votes":3677,"electoral":0,"id":"56224"},{"votes":2586,"electoral":0,"id":"1243"}],"final":"1918"}}},"abbr":"OH"},"Alabama":{"name":"Alabama","precincts":{"total":2843,"reporting":2837},"electoral":9,"races":{"President":{"":{"votes":[{"votes":1263741,"electoral":9,"id":"1701"},{"votes":811510,"electoral":0,"id":"1918"},{"votes":6609,"electoral":0,"id":"3850"},{"votes":4983,"electoral":0,"id":"11527"},{"votes":4300,"electoral":0,"id":"59208"}],"final":"1701"}}},"abbr":"AL"},"New York":{"name":"New York","electoral":31,"fix":{"Brooklyn":"Kings","Staten Island":"Richmond","Saint Lawrence":"St. Lawrence","Manhattan":"New York"},"precincts":{"total":16300,"reporting":16201},"races":{"President":{"":{"votes":[{"votes":4357360,"electoral":31,"id":"1918"},{"votes":2573368,"electoral":0,"id":"1701"},{"votes":37975,"electoral":0,"id":"3850"},{"votes":22520,"electoral":0,"id":"11527"},{"votes":12015,"electoral":0,"id":"12619"},{"votes":5694,"electoral":0,"id":"51183"},{"votes":2294,"electoral":0,"id":"7623"}],"final":"1918"}}},"abbr":"NY"},"South Dakota":{"name":"South Dakota","precincts":{"total":799,"reporting":799},"electoral":3,"races":{"President":{"":{"votes":[{"votes":203015,"electoral":3,"id":"1701"},{"votes":170883,"electoral":0,"id":"1918"},{"votes":4267,"electoral":0,"id":"3850"},{"votes":1895,"electoral":0,"id":"59208"},{"votes":1835,"electoral":0,"id":"11527"}],"final":"1701"}}},"abbr":"SD"},"Colorado":{"name":"Colorado","precincts":{"total":3215,"reporting":2962},"electoral":9,"races":{"President":{"":{"votes":[{"votes":1110668,"electoral":9,"id":"1918"},{"votes":968508,"electoral":0,"id":"1701"},{"votes":11626,"electoral":0,"id":"3850"},{"votes":9415,"electoral":0,"id":"11527"},{"votes":5454,"electoral":0,"id":"59208"},{"votes":2656,"electoral":0,"id":"3635"},{"votes":2405,"electoral":0,"id":"12619"},{"votes":745,"electoral":0,"id":"57761"},{"votes":526,"electoral":0,"id":"51335"},{"votes":281,"electoral":0,"id":"59660"},{"votes":280,"electoral":0,"id":"59659"},{"votes":200,"electoral":0,"id":"1243"},{"votes":142,"electoral":0,"id":"7623"},{"votes":130,"electoral":0,"id":"3486"},{"votes":98,"electoral":0,"id":"59661"},{"votes":74,"electoral":0,"id":"51331"}],"final":"1918"}}},"abbr":"CO"},"New Jersey":{"name":"New Jersey","precincts":{"total":6296,"reporting":6265},"electoral":15,"races":{"President":{"":{"votes":[{"votes":2073934,"electoral":15,"id":"1918"},{"votes":1540907,"electoral":0,"id":"1701"},{"votes":20254,"electoral":0,"id":"3850"},{"votes":8017,"electoral":0,"id":"11527"},{"votes":4724,"electoral":0,"id":"59208"},{"votes":3459,"electoral":0,"id":"12619"},{"votes":715,"electoral":0,"id":"7623"},{"votes":657,"electoral":0,"id":"1243"},{"votes":603,"electoral":0,"id":"59593"},{"votes":503,"electoral":0,"id":"51183"}],"final":"1918"}}},"abbr":"NJ"},"Washington":{"name":"Washington","precincts":{"total":6719,"reporting":4481},"electoral":11,"races":{"President":{"":{"votes":[{"votes":1117960,"electoral":11,"id":"1918"},{"votes":783932,"electoral":0,"id":"1701"},{"votes":17220,"electoral":0,"id":"3850"},{"votes":7154,"electoral":0,"id":"11527"},{"votes":5483,"electoral":0,"id":"59208"},{"votes":2206,"electoral":0,"id":"12619"},{"votes":410,"electoral":0,"id":"7623"},{"votes":381,"electoral":0,"id":"3486"}],"final":"1918"}}},"abbr":"WA"},"North Carolina":{"name":"North Carolina","precincts":{"total":2962,"reporting":2962},"electoral":15,"races":{"President":{"":{"votes":[{"votes":2123334,"electoral":0,"id":"1918"},{"votes":2109281,"electoral":0,"id":"1701"},{"votes":25421,"electoral":0,"id":"11527"}]}}},"abbr":"NC"},"District of Columbia":{"name":"District of Columbia","precincts":{"total":143,"reporting":143},"electoral":3,"races":{"President":{"":{"votes":[{"votes":210403,"electoral":3,"id":"1918"},{"votes":14821,"electoral":0,"id":"1701"},{"votes":851,"electoral":0,"id":"3850"},{"votes":498,"electoral":0,"id":"12619"}],"final":"1918"}}},"abbr":"DC"},"Texas":{"name":"Texas","electoral":34,"fix":{"De Witt":"DeWitt","La Vaca":"Lavaca"},"precincts":{"total":8466,"reporting":8466},"races":{"President":{"":{"votes":[{"votes":4467748,"electoral":34,"id":"1701"},{"votes":3521164,"electoral":0,"id":"1918"},{"votes":56398,"electoral":0,"id":"11527"}],"final":"1701"}}},"abbr":"TX"},"Nevada":{"name":"Nevada","precincts":{"total":2015,"reporting":2015},"electoral":5,"races":{"President":{"":{"votes":[{"votes":531884,"electoral":5,"id":"1918"},{"votes":411988,"electoral":0,"id":"1701"},{"votes":6251,"electoral":0,"id":"100013"},{"votes":6140,"electoral":0,"id":"3850"},{"votes":4258,"electoral":0,"id":"11527"},{"votes":3197,"electoral":0,"id":"59208"},{"votes":1408,"electoral":0,"id":"12619"}],"final":"1918"}}},"abbr":"NV"},"Maine":{"name":"Maine","electoral":4,"fix":{},"precincts":{"total":613,"reporting":579},"races":{"President":{"":{"votes":[{"votes":395464,"electoral":4,"id":"1918"},{"votes":276186,"electoral":0,"id":"1701"},{"votes":10124,"electoral":0,"id":"3850"},{"votes":2709,"electoral":0,"id":"12619"}],"final":"1918"}}},"abbr":"ME"},"Rhode Island":{"name":"Rhode Island","precincts":{"total":541,"reporting":532},"electoral":4,"races":{"President":{"":{"votes":[{"votes":275028,"electoral":4,"id":"1918"},{"votes":152197,"electoral":0,"id":"1701"},{"votes":4402,"electoral":0,"id":"3850"},{"votes":1313,"electoral":0,"id":"11527"},{"votes":707,"electoral":0,"id":"12619"},{"votes":626,"electoral":0,"id":"59208"},{"votes":138,"electoral":0,"id":"7623"}],"final":"1918"}}},"abbr":"RI"}},"totals":{"races":{"President":{"":{"votes":[{"votes":64101234,"electoral":349,"id":"1918"},{"votes":56528155,"electoral":162,"id":"1701"},{"votes":661017,"electoral":0,"id":"3850"},{"votes":490595,"electoral":0,"id":"11527"},{"votes":175771,"electoral":0,"id":"59208"},{"votes":142697,"electoral":0,"id":"12619"},{"votes":35109,"electoral":0,"id":"3635"},{"votes":19852,"electoral":0,"id":"302"},{"votes":7583,"electoral":0,"id":"7623"},{"votes":7184,"electoral":0,"id":"51183"},{"votes":6393,"electoral":0,"id":"1243"},{"votes":6251,"electoral":0,"id":"100013"},{"votes":3677,"electoral":0,"id":"56224"},{"votes":2432,"electoral":0,"id":"3486"},{"votes":2311,"electoral":0,"id":"51335"},{"votes":1223,"electoral":0,"id":"59207"},{"votes":770,"electoral":0,"id":"59886"},{"votes":745,"electoral":0,"id":"57761"},{"votes":685,"electoral":0,"id":"59660"},{"votes":631,"electoral":0,"id":"51331"},{"votes":603,"electoral":0,"id":"59593"},{"votes":486,"electoral":0,"id":"59722"},{"votes":470,"electoral":0,"id":"28726"},{"votes":280,"electoral":0,"id":"59659"},{"votes":98,"electoral":0,"id":"59661"}],"precincts":{"total":0,"reporting":0}}}},"electoral":538}};
		var options = {
			recordsField: 'locals',
			locationMode: L.LocationModes.STATE,
			codeField: 'abbr',
			displayOptions: {
				'electoral': {
					displayName: 'Electoral Votes',
					color: colorFunction1,
					fillColor: fillColorFunction1
				}
			},
			layerOptions: {
				fillOpacity: 0.5,
				opacity: 1,
				weight: 1
			},
			tooltipOptions: {
				iconSize: new L.Point(80,55),
				iconAnchor: new L.Point(-5,55)
			},
			setHighlight: function (layerStyle) {
				layerStyle.gradient = true;
				layerStyle.dropShadow = true;
				layerStyle.weight *= 2;
				return layerStyle;
			},

			unsetHighlight: function (layerStyle) {
				layerStyle.gradient = false;
				layerStyle.dropShadow = false;
				layerStyle.weight /= 2;
				return layerStyle;
			}
		};

		var electionLayer = new L.ChoroplethDataLayer(electionData,options);

		map.addLayer(electionLayer);

		$('#legend').append(electionLayer.getLegend({
			numSegments: 20,
			width: 80,
			className: 'well'
		}));

		// Remove the US results
		delete data[0];

		var currentElectionOptions = {
			recordsField: null,
			locationMode: L.LocationModes.STATE,
			codeField: 'state',
			chartOptions: {
				'estimates[choice=Romney].value': {
					color: 'hsl(0,100%,25%)',
					fillColor: 'hsl(0,70%,60%)',
					maxValue: 1,
					maxHeight: 20,
					displayName: 'Romney',
					displayText: function (value) {
						return value.toFixed(2);
					}
				},
				'estimates[choice=Obama].value': {
					color: 'hsl(240,100%,25%)',
					fillColor: 'hsl(240,70%,60%)',
					maxValue: 1,
					maxHeight: 20,
					displayName: 'Obama',
					displayText: function (value) {
						return value.toFixed(2);
					}
				},
				'estimates[choice=Other].value': {
					color: 'hsl(240,5%,75%)',
					fillColor: 'hsl(240,5%,75%)',
					maxValue: 1,
					maxHeight: 20,
					displayName: 'Other',
					displayText: function (value) {
						return value.toFixed(2);
					}
				}
			},
			layerOptions: {
				fillOpacity: 0.9,
				opacity: 1,
				weight: 0.5,
				radius: 10,
				width: 5,
				barThickness: 5
			},
			// Use displayOptions to dynamically size the radius and barThickness according to the number of
			// polling results
			displayOptions: {
				'poll_count': {
					radius: new L.LinearFunction(new L.Point(0, 10), new L.Point(1000, 100)),
					barThickness: new L.LinearFunction(new L.Point(0, 4), new L.Point(1000, 80))
				}
			},
			tooltipOptions: {
				iconSize: new L.Point(80,55),
				iconAnchor: new L.Point(-5,55)
			},
			onEachRecord: function (layer,record) {
				var $html = $(L.HTMLUtils.buildTable(record));

				layer.bindPopup($html.wrap('<div/>').parent().html(),{
					minWidth: 400,
					maxWidth: 400
				});
			}
		};

		var pollingResultsLayer = new L.PieChartDataLayer(data,currentElectionOptions);

		map.addLayer(pollingResultsLayer);

		var legend = pollingResultsLayer.getLegend({
			className: 'well'
		});

		$('#legend').append(legend);
	};
	
	// Loading local data for now, since HuffPo's API seems to be broken from a jQuery/JSONP
	// standpoint
	loadData(pollsterData);
	
	// Huffington Post updated their Pollster API, and JSONP doesn't seem to work correctly
	// Commented out for now
	/*
	$.ajax({
		url: 'http://elections.huffingtonpost.com/pollster/api/charts.jsonp',
		data: {
			callback: 'pollsterCallback',
			topic: '2012-president'
		},
		type: 'GET',
		jsonpCallback: 'pollsterCallback',
		cache: true,
		async: false,
		crossDomain: true,
		dataType: 'jsonp',
		error: function (jqXHR, textStatus, errorThrown) {
			console.log('Error');
			console.log(jqXHR.responseText);
		},
		success: function (data, textStatus, jqXHR) {
			loadData(data);
		}
	});
	*/
});
