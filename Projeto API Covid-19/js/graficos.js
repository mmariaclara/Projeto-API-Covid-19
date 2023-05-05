// --- MAPA --- //
google.charts.load('current', { 'packages': ['geochart'], });
google.charts.setOnLoadCallback(desenharMapa);

function desenharMapa() {
    let data = google.visualization.arrayToDataTable(dados_mapa);

    let options = {
        colorAxis: { colors: ['orange', 'red', 'Purple'] },
        backgroundColor: 'lightblue'
    };
    let chart = new google.visualization.GeoChart(document.getElementById('mapa'));
    chart.draw(data, options);
}

// --- GRÁFICO PIZZA --- //
google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(desenharGráficoDePizza);

      function desenharGráficoDePizza() {

        let data = google.visualization.arrayToDataTable(dados_pizza);

        let options = {
          is3D: true
        };

        let chart = new google.visualization.PieChart(document.getElementById('pizza'));

        chart.draw(data, options);
      }
    