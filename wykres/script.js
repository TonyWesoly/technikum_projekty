var liczba_kolumn=50;

function rysuj_wykres_1(losowe_liczby)
{
	//losowanie do tablicy
	var max_wielkosc=0;
	var kolumny="";
	// var wysokosc_diva = document.getElementById("wykres").style.height;

	for (var i = 0; i < liczba_kolumn; i++) {
		if(losowe_liczby[i]>max_wielkosc)
			max_wielkosc=losowe_liczby[i];
	}

	for (var i = 0; i < liczba_kolumn; i++) {

		var wysokosc_kolumny=Math.floor(500*(losowe_liczby[i]/max_wielkosc));
		kolumny+='<div class="kolumna" style="height:'+wysokosc_kolumny+'px;"></div>';
	}
	kolumny+='<div style="clear:both;"></div>'
		document.getElementById("wykres").innerHTML=kolumny;

}

function getValues()
{
	var losowe_liczby=new Array(liczba_kolumn);
	for (var i = 0; i < losowe_liczby.length; i++) {
		losowe_liczby[i]=0;
	}

	var ilosc_liczb = document.getElementById("ilosc_liczb").value;

	for (var i = 0; i < ilosc_liczb; i++) {
		var vartosc=Math.floor(Math.random() * liczba_kolumn);
		losowe_liczby[vartosc]++;
	}


	return losowe_liczby;
}

function rysuj_wykres_2(losowe_liczby)
{
	  google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      	var wartosci_do_vizualizacji=new Array(liczba_kolumn+1);
		for (var i = 0; i < wartosci_do_vizualizacji.length; i++) {
		  wartosci_do_vizualizacji[i] = new Array(2);
		}


      	wartosci_do_vizualizacji[0]=["kolumny","punkty"];
      	for (var i = 1; i < liczba_kolumn+1; i++) {
      		wartosci_do_vizualizacji[i][0]=i;
      		wartosci_do_vizualizacji[i][1]=losowe_liczby[i-1];
      	}

      function drawChart() {
        var data = google.visualization.arrayToDataTable(
        // [
        //   ['Year', 'Sales', 'Expenses'],
        //   ['2013',  1000,      400],
        //   ['2014',  1170,      460],
        //   ['2015',  660,       1120],
        //   ['2016',  1030,      540]
        // ]
        wartosci_do_vizualizacji
        );

        var options = {
          title: 'Wykres losowe liczby',
          hAxis: {title: 'kolumny',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0},
          colors: ['#22BB33']
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
}

function rysuj_wykres()
{
	var losowe_liczby = getValues();
	rysuj_wykres_1(losowe_liczby);
	rysuj_wykres_2(losowe_liczby);
}		